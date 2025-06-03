const BASE_URL = "http://localhost:4000";
//const BASE_URL = "http://52.59.162.108:4000";

export async function getCart(shipId, userId) {
  try {
    const res = await fetch(`${BASE_URL}/api/cart/getCart?ship_id=${shipId}&user_id=${userId}`);

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare il carrello`);
    }

    const data = await res.json();
    return data.cart || [];
  } catch (error) {
    console.error("Errore nel recupero del carrello:", error.message);
    return [];
  }
}

export async function getProduct(shipId) {
  try {
    const res = await fetch(`${BASE_URL}/api/cart/getProduct?ship_id=${shipId}`);

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile recuperare i prodotti`);
    }

    const data = await res.json();
    return data.spares || [];
  } catch (error) {
    console.error("Errore nel recupero dei prodotti:", error.message);
    return [];
  }
}

export async function addProduct(spare_id, user_id, quantity, status) {

  try {
    
    const res = await fetch(`${BASE_URL}/api/cart/addProduct`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spare_id, user_id, quantity, status }),
    });

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: Impossibile aggiungere il prodotto`);
    }

    const data = await res.json();
    return data.cartItem || null;
  } catch (error) {
    console.error("Errore durante l'aggiunta al carrello:", error.message);
    return null;
  }
}

export async function updateProductQuantity(id, quantity) {
  try {
    const res = await fetch(`${BASE_URL}/api/cart/updateProduct/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    if (!res.ok) throw new Error(`Errore HTTP ${res.status}`);

    const data = await res.json();
    return data.cartItem;

  } catch (error) {
    console.error("Errore nell'aggiornamento quantità:", error.message);
    return null;
  }
}

export async function removeProductFromCart(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/cart/removeProduct/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error(`Errore HTTP ${res.status}`);

    const data = await res.json();
    return data.message;

  } catch (error) {
    console.error("Errore nella rimozione del prodotto:", error.message);
    return null;
  }
}

