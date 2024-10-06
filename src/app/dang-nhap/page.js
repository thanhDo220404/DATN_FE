"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import bcrypt from "bcryptjs"; // Thêm bcrypt để so sánh mật khẩu
import { setCookie } from "../lib/CookieManager"; // Import CookieManager
import { useState } from "react"; // Import useState

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Hàm kiểm tra email tồn tại và đã xác thực
const checkEmailExists = (data, email) => {
  const user = data.Users.find((user) => user.email === email);
  if (!user) return "Email không tồn tại";
  if (!user.isVerified) return "Tài khoản chưa xác thực email";
  return true;
};

// Hàm đăng nhập API
const login = async (data) => {
  try {
    // Gửi yêu cầu POST tới API đăng nhập
    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // Kiểm tra kết quả trả về
    if (!response.ok) {
      throw new Error(result.message || "Lỗi đăng nhập");
    }
    return result;
  } catch (error) {
    throw new Error(error.message || "Lỗi kết nối tới server");
  }
};

export default function Login() {
  const { data, isLoading, error } = useSWR(`${apiUrl}/users`, fetcher, {
    refreshInterval: 6000,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false); // State for loading spinner

  if (error)
    return <div className="text-center text-danger">Lỗi load dữ liệu.</div>;
  if (isLoading)
    return (
      <div className="text-center text-success py-5">
        <div className="spinner-border"></div>
        <br />
        Đang tải...
      </div>
    );

  const onSubmit = async (formData) => {
    try {
      // Kiểm tra email trước
      const emailCheckResult = checkEmailExists(data, formData.email);
      if (emailCheckResult !== true) {
        setError("email", { type: "manual", message: emailCheckResult });
        return;
      }

      // Lấy thông tin người dùng
      const user = data.Users.find((user) => user.email === formData.email);

      // Kiểm tra mật khẩu
      const checkpass = bcrypt.compareSync(formData.pass, user.pass);
      if (!checkpass) {
        setError("pass", {
          type: "manual",
          message: "Mật khẩu không chính xác",
        });
        return;
      }

      // Gọi API đăng nhập
      setIsLoadingSubmit(true); // Start loading
      const result = await login(formData);
      setCookie("token", result.User.token, 1); // Lưu token với thời gian sống 1 ngày

      console.log("Đăng nhập thành công:", result);
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoadingSubmit(false); // Stop loading
    }
  };

  return (
    <div className="row m-auto w-75 text-center position-relative my-5">
      <div className="col border border-dark p-5">
        <h1>Đăng nhập</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="floatingEmail"
              placeholder="name@example.com"
              {...register("email", {
                required: "Email không được bỏ trống",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email không hợp lệ",
                },
              })}
            />
            <label htmlFor="floatingEmail">Email</label>
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>

          {/* Mật khẩu */}
          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${errors.pass ? "is-invalid" : ""}`}
              id="floatingPassword"
              placeholder="Mật khẩu"
              {...register("pass", {
                required: "Mật khẩu không được bỏ trống",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
              })}
            />
            <label htmlFor="floatingPassword">Mật khẩu</label>
            {errors.pass && (
              <span className="text-danger">{errors.pass.message}</span>
            )}
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-100 py-3 rounded mb-3"
            style={{ backgroundColor: "#FFE08B", color: "#324B4D" }}
          >
            Đăng nhập
          </button>

          {/* Hiển thị trạng thái đang tải */}
          {isLoadingSubmit && (
            <div className="text-center text-success py-2">
              <div className="spinner-border"></div>
              <span> Đang đăng nhập...</span>
            </div>
          )}

          <div className="row">
            <div className="col text-start">
              <input
                width="20px"
                type="checkbox"
                className="form-check-input text-danger border border-success"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Nhớ mật khẩu
              </label>
            </div>
            <div className="col text-end">
              <Link
                href="/user/quen-mat-khau"
                className="text-primary text-decoration-underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>
        </form>

        {/* Liên kết tới trang đăng nhập */}
        <div className="row mb-3">
          <div className="col">
            <hr />
          </div>
          <div className="col-auto text-secondary">hoặc</div>
          <div className="col">
            <hr />
          </div>
        </div>
        <Link
          type="submit"
          href="/dang-ky"
          className="w-100 py-3 rounded mb-3 border"
        >
          Tôi chưa có tài khoản
        </Link>
      </div>
      <div className="col border border-dark d-none d-md-flex">
        <img src="/images/logo4x.png" alt="Logo" className="w-50 m-auto" />
      </div>
    </div>
  );
}
