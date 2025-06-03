import React, { useState } from "react";
import { uploadProfileImage } from "@/api/profile";
import { useUser } from "@/context/UserContext";

const UploadProfileImage = ({ onImageUploadSuccess }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const { user } = useUser();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); 
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Seleziona un'immagine per caricare.");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("profileImage", image);
      formData.append("userId", user.id);


      const response = await uploadProfileImage(formData, user.id);

      if (response?.url) {
        onImageUploadSuccess(response.url);
        alert("Immagine caricata con successo!");
      } else {
        setError("Errore nel caricamento dell'immagine.");
      }
    } catch (err) {
      setError("Errore durante il caricamento. Riprova.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <input
          type="file"
          accept="image/*"
          className="w-full px-4 py-2 bg-[#ffffff10] text-white focus:outline-none mt-2 cursor-pointer"
          onChange={handleFileChange}
          disabled={loading}
        />
      </div>

      <button disabled={loading} className="rounded-md w-full bg-[#789fd6] p-3 mt-4 text-white font-semibold cursor-pointer" onClick={handleUpload}>
        {loading ? "Caricamento..." : "Carica Immagine"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UploadProfileImage;
