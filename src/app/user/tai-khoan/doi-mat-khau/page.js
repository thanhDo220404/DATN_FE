"use client";
import { useEffect, useState } from "react";
import { getUserById, parseJwt, updatePassword } from "@/app/databases/users";
import { getCookie } from "@/app/lib/CookieManager";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs"; // Đảm bảo đã cài thư viện này

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const token = getCookie("LOGIN_INFO");
  const payload = parseJwt(token);

  const [user, setUser] = useState(null); // State để lưu thông tin người dùng
  const [errorMessage, setErrorMessage] = useState(""); // State để lưu thông báo lỗi
  const [successMessage, setSuccessMessage] = useState(""); // State để lưu thông báo thành công

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById(payload._id); // Gọi hàm lấy người dùng
      setUser(userData.User); // Cập nhật state với thông tin người dùng
    };

    fetchUser();
  }, [payload._id]);

  const onSubmit = async (data) => {
    const { oldPassword, newPassword: pass } = data;
    setErrorMessage(""); // Reset thông báo lỗi mỗi lần submit
    setSuccessMessage(""); // Reset thông báo thành công mỗi lần submit

    if (user && user.pass) {
      if (bcrypt.compareSync(oldPassword, user.pass)) {
        // Mật khẩu cũ đúng, gọi hàm cập nhật mật khẩu mới
        try {
          const result = await updatePassword(user._id, pass);
          console.log("Cập nhật mật khẩu thành công:", result);
          setSuccessMessage("Đổi mật khẩu thành công!"); // Cập nhật thông báo thành công
          reset();
        } catch (error) {
          console.error("Lỗi cập nhật mật khẩu:", error);
          setErrorMessage("Có lỗi xảy ra khi cập nhật mật khẩu."); // Cập nhật thông báo lỗi
        }
      } else {
        // Mật khẩu cũ không đúng, cập nhật thông báo lỗi
        setErrorMessage("Mật khẩu cũ không đúng.");
      }
    } else {
      setErrorMessage(
        "Không tìm thấy thông tin người dùng hoặc mật khẩu không được xác định."
      );
    }
  };

  return (
    <div className="container shadow-lg px-5 py-3 bg-light">
      <h3>Đổi mật khẩu</h3>
      {errorMessage && (
        <div className="alert alert-danger">{errorMessage}</div>
      )}{" "}
      {/* Hiển thị thông báo lỗi */}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}{" "}
      {/* Hiển thị thông báo thành công */}
      <form className="w-50" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="oldPassword" className="form-label">
            Mật khẩu cũ
          </label>
          <input
            type="password"
            className={`form-control ${errors.oldPassword ? "is-invalid" : ""}`}
            id="oldPassword"
            {...register("oldPassword", {
              required: "Vui lòng nhập mật khẩu cũ",
            })}
          />
          {errors.oldPassword && (
            <div className="invalid-feedback">{errors.oldPassword.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            Mật khẩu mới
          </label>
          <input
            type="password"
            className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
            id="newPassword"
            {...register("newPassword", {
              required: "Vui lòng nhập mật khẩu mới",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
            })}
          />
          {errors.newPassword && (
            <div className="invalid-feedback">{errors.newPassword.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-success px-4 py-2">
          Lưu Mật Khẩu Mới
        </button>
      </form>
    </div>
  );
}
