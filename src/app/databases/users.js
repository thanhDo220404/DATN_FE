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

export { login, register };
