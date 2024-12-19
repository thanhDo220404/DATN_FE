// Lấy URL API từ biến môi trường
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/vouchers`;

// Tạo voucher mới
const insertVoucher = async (voucherData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voucherData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về dữ liệu voucher vừa tạo
  } catch (error) {
    console.error("Lỗi khi tạo voucher:", error);
    throw error;
  }
};

// Lấy tất cả voucher
const getAllVouchers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về danh sách voucher
  } catch (error) {
    console.error("Lỗi khi lấy tất cả voucher:", error);
    throw error;
  }
};

// Lấy voucher theo ID
const getVoucherById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về voucher theo ID
  } catch (error) {
    console.error("Lỗi khi lấy voucher theo ID:", error);
    throw error;
  }
};

// Cập nhật voucher
const updateVoucher = async (id, voucherData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voucherData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về voucher đã cập nhật
  } catch (error) {
    console.error("Lỗi khi cập nhật voucher:", error);
    throw error;
  }
};

// Xóa voucher
const deleteVoucher = async (id) => {
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
    console.error("Lỗi khi xóa voucher:", error);
    throw error;
  }
};

export {
  insertVoucher,
  getAllVouchers,
  getVoucherById,
  updateVoucher,
  deleteVoucher,
};
