"use client";

import { useState, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, Upload, FileIcon } from "lucide-react";
import { toast } from "sonner";
import { storage } from "@/firebase/firebaseClient";

export function FileUpload({
  onFilesChange,
  maxFiles = 5,
  maxSizePerFile = 200 * 1024 * 1024,
}) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);

    // Validate file count
    if (files.length + selectedFiles.length > maxFiles) {
      toast.error(`Máximo ${maxFiles} archivos permitidos`);
      return;
    }

    // Validate file types and sizes
    const validFiles = selectedFiles.filter((file) => {
      if (file.type !== "application/pdf") {
        toast.error(`${file.name} no es un archivo PDF válido`);
        return false;
      }

      if (file.size > maxSizePerFile) {
        toast.error(`${file.name} excede el tamaño máximo de 200MB`);
        return false;
      }

      return true;
    });

    if (validFiles.length > 0) {
      const newFiles = validFiles.map((file) => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        uploaded: false,
        url: null,
      }));

      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (fileId) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    const updatedFiles = files.filter((f) => f.id !== fileId);
    onFilesChange?.(updatedFiles.filter((f) => f.uploaded));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return [];

    setUploading(true);
    const uploadedFiles = [];

    try {
      for (const fileData of files) {
        if (fileData.uploaded) {
          uploadedFiles.push(fileData);
          continue;
        }

        setUploadProgress((prev) => ({ ...prev, [fileData.id]: 0 }));

        // Create unique filename
        const timestamp = Date.now();
        const fileName = `escritos/${timestamp}_${fileData.file.name}`;
        const storageRef = ref(storage, fileName);

        // Upload file
        const snapshot = await uploadBytes(storageRef, fileData.file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const uploadedFile = {
          ...fileData,
          uploaded: true,
          url: downloadURL,
          path: fileName,
        };

        uploadedFiles.push(uploadedFile);
        setUploadProgress((prev) => ({ ...prev, [fileData.id]: 100 }));
      }

      setFiles(uploadedFiles);
      onFilesChange?.(uploadedFiles);
      toast.success("Archivos subidos correctamente");

      return uploadedFiles;
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Error al subir archivos");
      return [];
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || files.length >= maxFiles}
        >
          <Upload className="h-4 w-4 mr-2" />
          Seleccionar PDFs
        </Button>
        <span className="text-sm text-muted-foreground">
          {files.length}/{maxFiles} archivos
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {files.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              {files.map((fileData) => (
                <div
                  key={fileData.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <FileIcon className="h-8 w-8 text-red-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {fileData.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(fileData.size)}
                      </p>
                      {uploadProgress[fileData.id] !== undefined &&
                        !fileData.uploaded && (
                          <Progress
                            value={uploadProgress[fileData.id]}
                            className="mt-1"
                          />
                        )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {fileData.uploaded && (
                      <Badge variant="secondary" className="text-green-600">
                        Subido
                      </Badge>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(fileData.id)}
                      disabled={uploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {files.some((f) => !f.uploaded) && (
              <Button
                type="button"
                onClick={uploadFiles}
                disabled={uploading}
                className="w-full mt-4"
              >
                {uploading ? "Subiendo..." : "Subir Archivos"}
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
