export async function removeFromCartApi(cartItemId: string) {
    const response = await fetch("/api/removecart", {
      method: "POST",
      body: JSON.stringify({ cartItemId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return response.json();
  }
  
// This function will be used to fetch cart items
export async function fetchCartItems() {
  try {
    const response = await fetch("/api/cartItem");
    if (!response.ok) {
      throw new Error("Failed to fetch cart items");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
}

export const updateCartCoun = async (): Promise<number> => {
  try {
    const response = await fetch("/api/cartcount", {
      method: "POST",
    });
    const data = await response.json();
    return data.count || 0; // Return count or 0 as fallback
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return 0;
  }
};

export const updateCartCount = async () => {
  try {
    const response = await fetch('/api/cartcount', {
      method: 'POST',
    });
    
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error("Failed to update cart count", error);
    return 0;
  }
};
  export async function increaseQuantityApi(cartItemId: string) {
    const response = await fetch("/api/increasecart", {
      method: "POST",
      body: JSON.stringify({ cartItemId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return response.json();
  }
  
  export  async function decreaseQuantityApi(cartItemId: string) {
    const response = await fetch("/api/decreasecart", {
      method: "POST",
      body: JSON.stringify({ cartItemId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return response.json();
  }