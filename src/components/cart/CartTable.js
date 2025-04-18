import { useState, useEffect } from "react";
import CartRow from "./CartRow";
import { getCart } from "@/api/cart";
import { useUser } from "@/context/UserContext";

const CartTable = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const shipId = 1;
  const { user } = useUser();

  const getCartData = async () => {
    try {
      setLoading(true);
      const cartItems = await getCart(shipId, user?.id);

      setCartData(cartItems);
    } catch (err) {
      setError("Errore nel recupero dei task");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProduct = (spareId) => {
    setCartData(cartItems.filter(item => item.Spare.id !== spareId));
  };

  useEffect(() => {
    if (user) getCartData();
  }, [shipId, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full mx-auto rounded-lg shadow-md">
      <div className="items-center flex mb-2">
        <h2 className="text-white text-2xl font-semibold flex items-center gap-2 py-2 ">
          Carrello
        </h2>
      </div>

      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] text-black/70 bg-white rounded-t-lg font-semibold">
        <p className="border border-[#022a52] p-3">Denominazione</p>
        <p className="border border-[#022a52] p-3 text-center">Part Number</p>
        <p className="border border-[#022a52] p-3 text-center">Fornitore</p>
        <p className="border border-[#022a52] p-3 text-center flex items-center" style={{justifyContent: "center"}}>
          Quantitá
        </p>
        <p className="border border-[#022a52] p-3 text-center">Azioni</p>
      </div>

      {cartData.map((product) => (
        <CartRow key={product.id} data={product} onRemove={handleRemoveProduct} />
      ))}

    </div>
  );
};

export default CartTable;
