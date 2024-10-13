// lib/CookieManager.js
// Đặt cookie
export const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

// Lấy cookie theo tên
export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Xóa cookie theo tên
export const eraseCookie = (name) => {
  document.cookie = name + "=; Max-Age=-99999999; path=/;";
};

// Lấy tất cả cookies dưới dạng một đối tượng
export const getAllCookies = () => {
  const cookies = {};
  const allCookies = document.cookie.split(";");
  allCookies.forEach((cookie) => {
    const [name, value] = cookie.split("=").map((c) => c.trim());
    if (name) {
      cookies[name] = value;
    }
  });
  return cookies;
};

// Kiểm tra xem cookie có tồn tại không
export const hasCookie = (name) => {
  return document.cookie.includes(`${name}=`);
};

// Xóa tất cả cookies
export const clearAllCookies = () => {
  const cookies = getAllCookies();
  for (let name in cookies) {
    eraseCookie(name);
  }
};
