"use client";

import { useState } from "react";
import { uploadFile } from "@/api/admin/files";
import { Loader2, Upload, X } from "lucide-react";

export default function FileUploadModal({ projectId, userId, onClose, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const uploaded = await uploadFile(projectId, userId, formData);
      onUploadSuccess();
    } catch (err) {
      console.error("Errore upload file:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl relative">
        
        {/* 🔹 Header */}
        <div className="flex justify-between items-center border-b px-5 py-3">
          <h3 className="text-lg font-semibold text-gray-700">Carica File</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={20} />
          </button>
        </div>

        {/* 🔹 Drag & Drop Zone */}
        <div
          className={`m-5 p-6 border-2 border-dashed rounded-lg text-center transition 
            ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          {!file ? (
            <>
              <Upload className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-500 text-sm">Trascina un file qui o</p>

              <label className="cursor-pointer mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                Seleziona file
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-gray-700 font-medium">{file.name}</p>
              <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          )}
        </div>

        {/* 🔹 Footer buttons */}
        <div className="px-5 py-4 flex justify-end gap-3 border-t">
          <button
            className="px-4 py-2 cursor-pointer rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={onClose}
          >
            Annulla
          </button>

          <button
            disabled={!file || uploading}
            className={`px-4 cursor-pointer py-2 rounded-md text-white flex items-center gap-2
              ${uploading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}
            `}
            onClick={handleUpload}
          >
            {uploading && <Loader2 size={16} className="animate-spin" />}
            {uploading ? "Caricamento..." : "Carica"}
          </button>
        </div>
      </div>
    </div>
  );
}
