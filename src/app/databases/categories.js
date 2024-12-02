// Lấy URL API từ biến môi trường
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

// Tạo danh mục mới
const insertCategory = async (categoryData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về dữ liệu danh mục vừa tạo
  } catch (error) {
    console.error("Lỗi khi tạo danh mục:", error);
    throw error;
  }
};

// Lấy tất cả danh mục
const getAllCategories = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về danh sách danh mục
  } catch (error) {
    console.error("Lỗi khi lấy tất cả danh mục:", error);
    throw error;
  }
};

// Lấy danh mục theo ID
const getCategoryById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về danh mục theo ID
  } catch (error) {
    console.error("Lỗi khi lấy danh mục theo ID:", error);
    throw error;
  }
};

// Cập nhật danh mục
const updateCategory = async (id, categoryData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về danh mục đã cập nhật
  } catch (error) {
    console.error("Lỗi khi cập nhật danh mục:", error);
    throw error;
  }
};

// Xóa danh mục
const deleteCategory = async (id) => {
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
    console.error("Lỗi khi xóa danh mục:", error);
    throw error;
  }
};

export {
  insertCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
