// Lấy URL API từ biến môi trường
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/shipping_methods`;

// Lấy tất cả phương thức giao hàng
const getAllShippingMethods = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về danh sách phương thức giao hàng
  } catch (error) {
    console.error("Lỗi khi lấy tất cả phương thức giao hàng:", error);
    throw error;
  }
};

export { getAllShippingMethods };
