import { useState, useEffect, useRef } from "react";
import QuantityControl from "./QuantityControl";
import { useRouter } from "next/navigation";
import { removeProductFromCart } from "@/api/cart";
import { useUser } from "@/context/UserContext";

const SpareRow = ({ data, onRemove }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleRowClick = () => {
    router.push(`/dashboard/spare/${data.Spare.serial_number}`);
  };

  const handleRemoveProduct = async () => {
    setLoading(true);

    try {
      const response = await removeProductFromCart(data.Spare.id, user.id);

      onRemove(data.Spare.id);
      
    } catch (error) {
      console.error("Errore nel rimuovere il prodotto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center border-b border-[#001c38] bg-[#022a52] cursor-pointer"
      >
        <div onClick={handleRowClick} className="border border-[#001c38] p-3 flex flex-col justify-center min-h-[60px]" style={{ height: "-webkit-fill-available" }}> 
          <p className="text-white text-[18px] font-semibold truncate">{data.Spare.name}</p>
        </div>
        <div className="border border-[#001c38] p-3 text-center text-white justify-center flex flex-col items-center gap-2" style={{ height: "-webkit-fill-available" }}>
          <p className="text-[18px] text-white">{data.Spare.serial_number}</p>
        </div>
        <div className="border border-[#001c38] p-3 flex items-center justify-center cursor-pointer" onClick={() => setIsOpen(true)} style={{ height: "-webkit-fill-available" }}>
          <div className="flex gap-4">
          {data.Spare.company}
          </div>
        </div>
        <div
          className={`border border-[#001c38] p-3 flex items-center justify-center`}
          style={{ height: "-webkit-fill-available" }}
        >
          <QuantityControl quantity={data.quantity} />
        </div>
        <div
          className={`border border-[#001c38] p-3 flex items-center justify-center gap-4`}
          style={{ height: "-webkit-fill-available" }}
          onClick={handleRemoveProduct}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" width={"18px"} height={"18px"} viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
        </div>
      </div>

    </div>
  );
};

export default SpareRow;
