import { setCookie } from "../lib/CookieManager";

// lib/users.js
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Hàm đăng nhập API
const login = async (data) => {
  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Lỗi đăng nhập");
    }
    return result;
  } catch (error) {
    throw new Error(error.message || "Lỗi kết nối tới server");
  }
};

// Hàm đăng ký API
const register = async (data) => {
  try {
    const response = await fetch(`${apiUrl}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Lỗi đăng ký");
    }
    return result;
  } catch (error) {
    throw new Error(error.message || "Lỗi kết nối tới server");
  }
};
const update = async (id, formData) => {
  try {
    const response = await fetch(`http://localhost:2204/users/update/${id}`, {
      method: "POST",
      body: formData, // Gửi formData trực tiếp
    });

    // Kiểm tra xem phản hồi có thành công hay không
    if (!response.ok) {
      const errorData = await response.json(); // Lấy dữ liệu lỗi từ phản hồi
      throw new Error(
        errorData.message || "Có lỗi xảy ra trong quá trình cập nhật."
      );
    }

    const result = await response.json(); // Lấy kết quả phản hồi
    // Cập nhật lại cookie với dữ liệu mới
    setCookie("LOGIN_INFO", JSON.stringify(result.userNew.token), 1);
    return result; // Trả về kết quả để xử lý tiếp
  } catch (error) {
    console.error("Lỗi cập nhật người dùng:", error);
    // Có thể xử lý thêm ở đây, như hiển thị thông báo cho người dùng
  }
};

// app/databases/users.js
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
};

const getUserById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Kiểm tra phản hồi từ API
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Có lỗi xảy ra khi lấy thông tin người dùng."
      );
    }

    return await response.json(); // Lấy dữ liệu người dùng từ phản hồi
  } catch (error) {
    console.error("Lỗi lấy thông tin người dùng:", error);
    throw error; // Ném lỗi để xử lý ngoài hàm
  }
};
const updatePassword = async (id, newPassword) => {
  try {
    const response = await fetch(`http://localhost:2204/users/update/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pass: newPassword }), // Gửi mật khẩu mới dưới dạng JSON
    });

    // Kiểm tra xem phản hồi có thành công hay không
    if (!response.ok) {
      const errorData = await response.json(); // Lấy dữ liệu lỗi từ phản hồi
      throw new Error(
        errorData.message || "Có lỗi xảy ra trong quá trình cập nhật."
      );
    }

    const result = await response.json(); // Lấy kết quả phản hồi
    // Cập nhật lại cookie với dữ liệu mới nếu cần
    await setCookie("LOGIN_INFO", JSON.stringify(result.userNew.token), 1);
    return result; // Trả về kết quả để xử lý tiếp
  } catch (error) {
    console.error("Lỗi cập nhật mật khẩu:", error);
    // Có thể xử lý thêm ở đây, như hiển thị thông báo cho người dùng
  }
};
// Hàm lấy danh sách tất cả người dùng
const getAllUsers = async () => {
  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Kiểm tra phản hồi từ API
    if (!response) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Có lỗi xảy ra khi lấy danh sách người dùng."
      );
    }

    return await response.json(); // Trả về dữ liệu danh sách người dùng
  } catch (error) {
    console.error("Lỗi lấy danh sách người dùng:", error);
    throw error; // Ném lỗi để xử lý ngoài hàm
  }
};

export {
  getAllUsers,
  login,
  register,
  update,
  parseJwt,
  getUserById,
  updatePassword,
};
