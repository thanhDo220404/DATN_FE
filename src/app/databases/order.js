const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`; // Địa chỉ API cho đơn hàng

// 1. Tạo đơn hàng mới
export const createOrder = async (orderData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Error creating order");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};

// 2. Lấy tất cả đơn hàng
export const getAllOrders = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error fetching orders");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

// 3. Lấy đơn hàng theo ID
export const getOrderById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Order not found");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch order by ID:", error);
    throw error;
  }
};

// 4. Cập nhật đơn hàng
export const updateOrder = async (id, updateData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error("Error updating order");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update order:", error);
    throw error;
  }
};

// 5. Xóa đơn hàng
export const deleteOrder = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error deleting order");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to delete order:", error);
    throw error;
  }
};
// 6. Lấy tất cả đơn hàng theo userId
export const getOrdersByUserId = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`);

    if (!response.ok) {
      throw new Error("Error fetching orders for user");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch orders by user ID:", error);
    throw error;
  }
};
// 7. Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (orderId, orderStatusId) => {
  try {
    const response = await fetch(`${API_URL}/status/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderStatusId }),
    });

    if (!response.ok) {
      throw new Error("Error updating order status");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update order status:", error);
    throw error;
  }
};

export const createPaymentUrl = async (paymentData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/create_payment_url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create payment URL");
    }

    // API này trả về URL redirect, bạn có thể xử lý tiếp theo.
    const paymentUrl = await response.json(); // Giả sử API trả về JSON với URL.
    window.location.href = paymentUrl; // Chuyển hướng người dùng tới URL thanh toán.
  } catch (error) {
    console.error("Error while creating payment URL:", error);
    throw error;
  }
};

export const refundTransaction = async (orderId, transDate, amount) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/refund`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId, // Mã giao dịch
          transDate, // Ngày giao dịch (định dạng `YYYYMMDDHHmmss`)
          amount, // Số tiền hoàn
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu refund:", error);
    throw error; // Quăng lỗi nếu cần xử lý ở nơi gọi hàm
  }
};
