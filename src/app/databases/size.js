// Lấy URL API từ biến môi trường
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

// Tạo kích thước mới
const insertSize = async (sizeData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sizeData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về dữ liệu kích thước vừa tạo
  } catch (error) {
    console.error("Lỗi khi tạo kích thước:", error);
    throw error;
  }
};

// Lấy tất cả kích thước
const getAllSizes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về danh sách kích thước
  } catch (error) {
    console.error("Lỗi khi lấy tất cả kích thước:", error);
    throw error;
  }
};

// Lấy kích thước theo ID
const getSizeById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về kích thước theo ID
  } catch (error) {
    console.error("Lỗi khi lấy kích thước theo ID:", error);
    throw error;
  }
};

// Cập nhật kích thước
const updateSize = async (id, sizeData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sizeData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về kích thước đã cập nhật
  } catch (error) {
    console.error("Lỗi khi cập nhật kích thước:", error);
    throw error;
  }
};

// Xóa kích thước
const deleteSize = async (id) => {
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
    console.error("Lỗi khi xóa kích thước:", error);
    throw error;
  }
};

export { insertSize, getAllSizes, getSizeById, updateSize, deleteSize };
