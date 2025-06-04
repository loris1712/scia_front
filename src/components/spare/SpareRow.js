import { useState, useEffect, useRef } from "react";
import NotesModal from "./NotesModal";
import { useRouter } from "next/navigation";
import ElementIcon from "@/components/ElementIcon";
import Image from "next/image";
import { addProduct } from "@/api/cart";
import { useUser } from "@/context/UserContext";
import CartAdded from "@/components/spare/element/CartAdded";

const SpareRow = ({ data }) => {


  const [isOpen, setIsOpen] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const router = useRouter();
  const { user } = useUser();

  const handleRowClick = () => {
    router.push(`/dashboard/spare/${data.Serial_number}`);
  };

  const handleAddToCart = async () => {
        if (!data) return;
    
        try {
          console.log(data)
          const response = await addProduct(data.ID, user.id, "1", "in_attesa");
          setCartAdded(true);
        } catch (error) {
          console.error("Errore nell'aggiungere il prodotto al carrello:", error);
        }
  };

  return (
    <div>
      <div
        className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center border-b border-[#001c38] bg-[#022a52] cursor-pointer"
      >
        <div onClick={handleRowClick} className="border border-[#001c38] p-3 flex flex-col justify-center min-h-[60px]" style={{ height: "-webkit-fill-available" }}> 
          <p className="text-white text-[18px] font-semibold truncate">{data.Part_name}</p>
          <p className="text-white/60 text-[16px] truncate">
            <ElementIcon elementId={data.element_model_id} /> {data.eswbs} {data.system_description}
          </p>
        </div>
        <div onClick={handleRowClick} className="border border-[#001c38] p-3 text-center text-white justify-center flex flex-col items-center gap-2" style={{ height: "-webkit-fill-available" }}>
          <p className="text-[18px] text-white">
            {data.quantity}
          </p>
        </div>
        <div
          className="border border-[#001c38] p-3 cursor-pointer justify-center flex flex-col items-center gap-2"
          onClick={() => setIsOpen(true)}
          style={{ height: "-webkit-fill-available" }}
        >
          {data.locations?.length > 0 ? (
            data.locations.map((loc, index) => {
              const warehouse = data.warehouses.find(w => w.id.toString() === loc.warehouse.toString());

              return (
                <div key={index} className="flex items-center justify-center gap-2">
                  {warehouse?.icon_url ? (
                    <>
                      <Image
                        src={warehouse.icon_url}
                        alt="Position Icon"
                        width={20}
                        height={20}
                        className="inline-block opacity-60"
                      />
                      <span className="text-white/80">{warehouse.name}</span>
                      <span className="text-white/60 text-[12px]">
                        &nbsp;({loc.location})
                      </span>
                    </>
                  ) : (
                    <div>No Icon Available</div>
                  )}
                </div>
              );
            })
          ) : (
            <div>No locations available</div>
          )}
        </div>

        <div
          className={`border border-[#001c38] p-3 text-center justify-center flex flex-col items-center gap-2`}
          style={{ height: "-webkit-fill-available" }}
        >
          <p>
          {data.Serial_number}
          </p>

          <p className="text-white/60 text-[16px] text-sm truncate">
            {data.company}
          </p>
          
        </div>
        <div
          className={`border border-[#001c38] p-3 flex items-center justify-center gap-4`}
          style={{ height: "-webkit-fill-available" }}
        >
          <div onClick={handleAddToCart}>
            <svg width="16px" height="16px" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
          </div>

        
          {/*<div className="rounded-full bg-[#789fd6] p-1">
            <svg width="16px" height="16px" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z"/></svg>
          </div>*/}
          
        </div>
      </div>

      <NotesModal isOpen={isOpen} onClose={() => setIsOpen(false)} data={data} />

        {cartAdded && (
          <CartAdded onClose={() => setCartAdded(false)} />
        )}
    </div>
  );
};

export default SpareRow;
