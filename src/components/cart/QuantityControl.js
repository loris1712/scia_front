import { useState } from "react";

const QuantityControl = ({quantity}) => {
  const [quantityProduct, setQuantityProduct] = useState(quantity);

  const decreaseQuantity = () => {
    if (quantityProduct > 1) {
        setQuantityProduct(quantityProduct - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantityProduct(quantityProduct + 1);
  };

  return (
    <div
      className="border border-[#001c38] flex items-center justify-center"
      style={{ height: "-webkit-fill-available" }}
    >
      <button
        onClick={decreaseQuantity}
        className="bg-[#000000] opacity-20 text-white font-bold px-4 py-2"
      >
        -
      </button>

      <div className="px-4 py-2 bg-[#ffffff20] text-white">{quantityProduct}</div>

      <button
        onClick={increaseQuantity}
        className="bg-[#000000] opacity-20 text-white font-bold px-4 py-2"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
