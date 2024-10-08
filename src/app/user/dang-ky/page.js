"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import Overlay from "../../components/overlay";
import Link from "next/link";
import { getCookie } from "@/app/lib/CookieManager";
import { register as RegisterUser } from "@/app/databases/users";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Alert = ({ message, countdown, onClose }) => (
  <div
    className="alert alert-light border border-success position-absolute shadow-lg"
    role="alert"
    style={{
      top: "20%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
    }}
  >
    <div className="m-auto">
      <h1 className="alert-heading text-success">
        <i className="bi bi-check-circle-fill"></i>
      </h1>
    </div>
    <p>{message}</p>
    <hr />
    <p className="my-3 fs-3 text-danger">
      Hãy kiểm tra email và xác nhận tài khoản
    </p>
    <p className="mb-0">Thời gian còn lại: {countdown} giây</p>
    <div className="position-absolute w-100 h-100 top-0 start-0">
      <div
        className="fs-4 ms-2 text-light position-absolute top-0 start-100"
        onClick={onClose}
      >
        <i className="bi bi-x-lg"></i>
      </div>
    </div>
  </div>
);

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { data, isLoading, error } = useSWR(`${apiUrl}/users`, fetcher, {
    refreshInterval: 6000,
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowAlert(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showAlert]);
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

  const checkEmailExists = async (email) => {
    return data.Users.some((user) => user.email === email)
      ? "Email đã tồn tại"
      : true;
  };

  const onSubmit = async (formData) => {
    setIsLoadingSubmit(true);
    try {
      const result = await RegisterUser(formData);
      setShowAlert(true);
      setCountdown(10);
      reset();
    } catch (error) {
      console.error("Error register:", error);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <div className="container row m-auto text-center position-relative my-5 p-sm-5">
      {/* Overlay làm mờ khi hiển thị Alert */}
      {showAlert && <Overlay />}
      <div className="col border border-dark p-sm-5 p-3">
        <h1>Đăng ký</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Tên */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="floatingName"
              placeholder="Tên"
              {...register("name", { required: "Tên không được bỏ trống" })}
            />
            <label htmlFor="floatingName">Tên</label>
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}
          </div>

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
                validate: checkEmailExists,
              })}
            />
            <label htmlFor="floatingEmail">Email</label>
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>

          {/* Số điện thoại */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              id="floatingPhoneNumber"
              placeholder="Số điện thoại"
              {...register("phone", {
                required: "Số điện thoại không được bỏ trống",
              })}
            />
            <label htmlFor="floatingPhoneNumber">Số điện thoại</label>
            {errors.phone && (
              <span className="text-danger">{errors.phone.message}</span>
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

          {/* Nút đăng ký */}
          <button
            type="submit"
            className="w-100 py-3 rounded mb-3"
            style={{ backgroundColor: "#FFE08B", color: "#324B4D" }}
          >
            Tạo tài khoản
          </button>

          {/* Hiển thị trạng thái đang tải */}
          {isLoadingSubmit && (
            <div className="text-center text-success py-2">
              <div className="spinner-border"></div>
              <span> Đang tạo tài khoản...</span>
            </div>
          )}
        </form>

        {/* Hiển thị thông báo thành công */}
        {showAlert && (
          <Alert
            message="Bạn đã đăng ký thành công tài khoản."
            countdown={countdown}
            onClose={() => setShowAlert(false)}
          />
        )}

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
          href="/user/dang-nhap"
          type="submit"
          className="w-100 py-3 rounded mb-3 border"
        >
          Tôi đã có tài khoản
        </Link>
      </div>
      <div className="col border border-dark d-none d-md-flex">
        <img src="/images/logo4x.png" alt="Logo" className="w-50 m-auto" />
      </div>
    </div>
  );
}
