"use client";

// File upload component for documents and annexes
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload, FileText } from "lucide-react";
import { toast } from "sonner";
import { uploadFile } from "./services";

export function FileUpload({
  files = [],
  onFilesChange,
  maxFiles = 5,
  label = "Archivos",
  accept = ".pdf",
  folder = "documents",
}) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (selectedFiles) => {
    if (files.length + selectedFiles.length > maxFiles) {
      toast.error(`Máximo ${maxFiles} archivos permitidos`);
      return;
    }

    setUploading(true);
    const newFiles = [];

    try {
      for (const file of selectedFiles) {
        if (file.type !== "application/pdf") {
          toast.error("Solo se permiten archivos PDF");
          continue;
        }

        const timestamp = Date.now();
        const fileName = `${folder}/${timestamp}_${file.name}`;
        const url = await uploadFile(file, fileName);

        newFiles.push({
          name: file.name,
          url,
          path: fileName,
          size: file.size,
        });
      }

      onFilesChange([...files, ...newFiles]);
      if (newFiles.length > 0) {
        toast.success(
          `${newFiles.length} archivo${newFiles.length > 1 ? "s" : ""} subido${
            newFiles.length > 1 ? "s" : ""
          } correctamente`
        );
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Error al subir archivos");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileSelect(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFileSelect(selectedFiles);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-foreground">{label}</label>

      <Card
        className="border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Arrastra archivos PDF aquí o haz clic para seleccionar
          </p>
          <p className="text-xs text-muted-foreground">
            Máximo {maxFiles} archivos
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={accept}
            onChange={handleFileInput}
            className="hidden"
          />
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {uploading && (
        <div className="text-center text-sm text-muted-foreground">
          Subiendo archivos...
        </div>
      )}
    </div>
  );
}

export default FileUpload;
