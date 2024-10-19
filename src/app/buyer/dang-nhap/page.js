"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import bcrypt from "bcryptjs";
import { setCookie, getCookie } from "../../lib/CookieManager"; // Import CookieManager
import { useState, useEffect } from "react"; // Import useEffect
import { login } from "@/app/databases/users"; // Import the login function

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Hàm kiểm tra email tồn tại và đã xác thực
const checkEmailExists = (data, email) => {
  const user = data.Users.find((user) => user.email === email);
  if (!user) return "Email không tồn tại";
  if (!user.isVerified) return "Tài khoản chưa xác thực email";
  return true;
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
    reset,
  } = useForm();

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false); // State for loading spinner

  // useEffect để kiểm tra cookie LOGIN_INFO
  useEffect(() => {
    const token = getCookie("LOGIN_INFO");
    if (token) {
      console.log("Người dùng đã đăng nhập, điều hướng về trang trước đó...");
      if (window.history.length > 1) {
        window.history.back(); // Nếu có lịch sử điều hướng, quay lại trang trước
      } else {
        window.location.href = "/"; // Nếu không có lịch sử, quay về trang chủ
      }
    }
  }, []);

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
      const emailCheckResult = checkEmailExists(data, formData.email);
      if (emailCheckResult !== true) {
        setError("email", { type: "manual", message: emailCheckResult });
        return;
      }

      const user = data.Users.find((user) => user.email === formData.email);
      const checkpass = bcrypt.compareSync(formData.pass, user.pass);
      if (!checkpass) {
        setError("pass", {
          type: "manual",
          message: "Mật khẩu không chính xác",
        });
        return;
      }

      setIsLoadingSubmit(true); // Start loading
      const result = await login(formData); // Call login function from users.js
      setCookie("LOGIN_INFO", result.User.token, 1); // Lưu token với thời gian sống 1 ngày
      reset(); // Xóa input
      console.log("Đăng nhập thành công");
      window.location.reload();
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoadingSubmit(false); // Stop loading
    }
  };

  return (
    <div className="container row m-auto text-center position-relative my-5 p-sm-5">
      <div className="col border border-dark p-sm-5 p-3">
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
                href="/buyer/quen-mat-khau"
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
          href="/buyer/dang-ky"
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
