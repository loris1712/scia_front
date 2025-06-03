"use client";
import { useState } from "react";

const EditModal = ({ isOpen, onClose, handleSave }) => {
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = (value) => {
    if (value === "clear") {
      setInputValue("");
    } else if (value === "." && inputValue.includes(".")) {
      return;
    } else {
      setInputValue((prev) => (prev.length < 6 ? prev + value : prev));
    }
  };

  const handleSaveClick = () => {
    if (inputValue.trim() !== "") {
      handleSave(parseFloat(inputValue));
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000087]">
      <div className="bg-[#022a52] w-90 p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl text-white text-center">Inserisci valore</h2>
        <button className="text-white text-xl cursor-pointer ml-auto" onClick={onClose}>
            <svg fill="white" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </button>
      </div>
        
        {/* Display del valore inserito */}
        <div className="flex items-center mb-4">
            <p className="text-2xl text-white">
                h
            </p>
            <p
            className={`ml-auto text-2xl px-4 py-2 rounded ${
              inputValue ? "text-white" : "text-white opacity-60"
            }`}
          >
            {inputValue || "0.00"}
          </p>
        </div>

        {/* Tastiera numerica */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "clear"].map((value, index) => (
            <button
              key={index}
              className="w-full h-14 flex items-center justify-center text-xl font-semibold rounded-lg bg-[#0000002b] hover:bg-blue-500 transition text-white"
              onClick={() => handleButtonClick(value)}
            >
              {value === "clear" ? "⌫" : value}
            </button>
          ))}
        </div>

        {/* Pulsanti di azione */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSaveClick}
            className="w-full bg-[#789fd6] px-4 py-4 text-white rounded cursor-pointer"
          >
            Conferma
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
