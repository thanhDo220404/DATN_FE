const API_URL = process.env.NEXT_PUBLIC_API_URL + "/order_status";

export const getOrderStatuses = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch order statuses");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // re-throw error for further handling
  }
};

export const addOrderStatus = async (name) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error("Failed to add order status");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // re-throw error for further handling
  }
};

export const updateOrderStatus = async (id, name) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error("Failed to update order status");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // re-throw error for further handling
  }
};

export const deleteOrderStatus = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete order status");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // re-throw error for further handling
  }
};
