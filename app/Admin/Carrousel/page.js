"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Edit, Plus, Upload, Video, ImageIcon } from "lucide-react";
import { useBanners } from "@/hooks/useBanners";

export default function BannerAdmin() {
  const [editingBanner, setEditingBanner] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "", // Added video URL field
    mediaType: "image", // Added media type selector
    linkUrl: "",
    isActive: true,
  });
  const [image, setImage] = useState(null);

  const { banners, isLoading, saveBanner, deleteBanner, isUsingFirebase } =
    useBanners();

  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBanner) {
      saveBanner({ ...formData, id: editingBanner.id }, image);
      setEditingBanner(null);
    } else {
      saveBanner({ ...formData, id: Date.now().toString() }, image);
      setIsCreating(false);
    }
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      videoUrl: "", // Reset video URL
      mediaType: "image", // Reset media type
      linkUrl: "",
      isActive: true,
    });
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData(banner);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setEditingBanner(null);
    setIsCreating(false);
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      videoUrl: "", // Reset video URL
      mediaType: "image", // Reset media type
      linkUrl: "",
      isActive: true,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      // En producción, aquí subirías la imagen a un servicio como Vercel Blob
      const imageUrl = URL.createObjectURL(file);

      setImage(file);
      setFormData({ ...formData, imageShow: imageUrl, mediaType: "image" }); // Set media type to image
    }
  };

  const handleVideoUrlChange = (e) => {
    const videoUrl = e.target.value;
    setFormData({ ...formData, videoUrl, mediaType: "video" });
  };

  const renderMediaPreview = (banner) => {
    if (banner.mediaType === "video" && banner.videoUrl) {
      const videoId = getYouTubeVideoId(banner.videoUrl);
      if (videoId) {
        return (
          <div className="relative w-20 h-20 rounded-lg border-2 border-cyan-200 overflow-hidden">
            <img
              src={getYouTubeThumbnail(banner.videoUrl) || ""}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <Video className="w-6 h-6 text-white" />
            </div>
          </div>
        );
      }
    } else if (banner.imageUrl) {
      return (
        <img
          src={banner.imageUrl || ""}
          alt={banner.title}
          className="w-20 h-20 object-cover rounded-lg border-2 border-cyan-200"
        />
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-cyan-600">
          Administrar Banners
        </h1>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-pink-500 hover:bg-pink-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Banner
        </Button>
      </div>

      {(isCreating || editingBanner) && (
        <Card className="border-2 border-cyan-200">
          <CardHeader>
            <CardTitle className="text-cyan-600">
              {editingBanner ? "Editar Banner" : "Crear Nuevo Banner"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título (opcional)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Título del banner"
                  className="border-cyan-200 focus:border-cyan-400"
                />
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Descripción del banner"
                  className="border-cyan-200 focus:border-cyan-400"
                  rows={3}
                />
              </div>

              <div>
                <Label>Contenido del Banner</Label>
                <Tabs
                  value={formData.mediaType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, mediaType: value })
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="image"
                      className="flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Imagen
                    </TabsTrigger>
                    <TabsTrigger
                      value="video"
                      className="flex items-center gap-2"
                    >
                      <Video className="w-4 h-4" />
                      Video YouTube
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="image" className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("image-upload").click()
                        }
                        className="border-cyan-200 text-cyan-600 hover:bg-cyan-50"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Subir Imagen
                      </Button>
                      {formData.mediaType === "image" && formData.imageUrl && (
                        <img
                          src={formData.imageUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded-lg border-2 border-cyan-200"
                        />
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="video" className="space-y-4">
                    <div>
                      <Input
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={formData.videoUrl}
                        onChange={handleVideoUrlChange}
                        className="border-cyan-200 focus:border-cyan-400"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Pega la URL completa del video de YouTube
                      </p>
                      {formData.mediaType === "video" &&
                        formData.videoUrl &&
                        getYouTubeVideoId(formData.videoUrl) && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className="relative w-16 h-16 rounded-lg border-2 border-cyan-200 overflow-hidden">
                              <img
                                src={
                                  getYouTubeThumbnail(formData.videoUrl) || ""
                                }
                                alt="Video preview"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                <Video className="w-4 h-4 text-white" />
                              </div>
                            </div>
                            <span className="text-sm text-green-600">
                              ✓ Video válido
                            </span>
                          </div>
                        )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div>
                <Label htmlFor="link">Enlace (opcional)</Label>
                <Input
                  id="link"
                  value={formData.linkUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, linkUrl: e.target.value })
                  }
                  placeholder="/ruta-del-enlace"
                  className="border-cyan-200 focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
                <Label htmlFor="active">Banner activo</Label>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  {editingBanner ? "Actualizar" : "Crear"} Banner
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-gray-300 bg-transparent"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {banners.map((banner) => (
          <Card key={banner.id} className="border-l-4 border-l-cyan-400">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-cyan-700">
                      {banner.title || "Sin título"}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                        banner.mediaType === "video"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {banner.mediaType === "video" ? (
                        <>
                          <Video className="w-3 h-3" />
                          Video
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-3 h-3" />
                          Imagen
                        </>
                      )}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        banner.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {banner.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {banner.description}
                  </p>
                  {banner.linkUrl && (
                    <p className="text-cyan-600 text-sm">
                      Enlace: {banner.linkUrl}
                    </p>
                  )}
                </div>
                {renderMediaPreview(banner)}
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(banner)}
                    className="text-cyan-600 border-cyan-200 hover:bg-cyan-50"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();

                      if (confirm("¿Estás seguro de que quieres eliminar?")) {
                        deleteBanner(banner);
                      }
                    }}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
