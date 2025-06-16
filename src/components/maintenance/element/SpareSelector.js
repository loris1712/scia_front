// components/maintenance/SpareImageSelector.jsx
"use client";

import { useState } from "react";
import Image from "next/image";

const SpareImageSelector = ({ images, onSelectChange }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleToggleImage = (src) => {
    const updated = selectedImages.includes(src)
      ? selectedImages.filter((img) => img !== src)
      : [...selectedImages, src];

    setSelectedImages(updated);
    onSelectChange?.(updated);
  };

  return (
    <div className="flex overflow-x-auto gap-4 py-2 custom-carousel">
      {images.map((src, index) => (
        <div
          key={index}
          className={`w-20 h-20 relative cursor-pointer rounded-lg overflow-hidden ${
            selectedImages.includes(src) ? "border-4 border-[#789fd6]" : ""
          }`}
          onClick={() => handleToggleImage(src)}
          style={{ flex: "none" }}
        >
          <Image src={src} alt={`Spare ${index + 1}`} layout="fill" objectFit="cover" />
        </div>
      ))}
    </div>
  );
};

export default SpareImageSelector;
