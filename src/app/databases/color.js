// Lấy URL API từ biến môi trường
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

// Tạo màu sắc mới
const insertColor = async (colorData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(colorData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về dữ liệu màu sắc vừa tạo
  } catch (error) {
    console.error("Lỗi khi tạo màu sắc:", error);
    throw error;
  }
};

// Lấy tất cả màu sắc
const getAllColors = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về danh sách màu sắc
  } catch (error) {
    console.error("Lỗi khi lấy tất cả màu sắc:", error);
    throw error;
  }
};

// Lấy màu sắc theo ID
const getColorById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về màu sắc theo ID
  } catch (error) {
    console.error("Lỗi khi lấy màu sắc theo ID:", error);
    throw error;
  }
};

// Cập nhật màu sắc
const updateColor = async (id, colorData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(colorData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về màu sắc đã cập nhật
  } catch (error) {
    console.error("Lỗi khi cập nhật màu sắc:", error);
    throw error;
  }
};

// Xóa màu sắc
const deleteColor = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về thông báo xóa thành công
  } catch (error) {
    console.error("Lỗi khi xóa màu sắc:", error);
    throw error;
  }
};
export { insertColor, getAllColors, getColorById, updateColor, deleteColor };
