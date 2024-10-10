"use client";
import { getCookie } from "@/app/lib/CookieManager";
import { useForm } from "react-hook-form";
import { parseJwt, update } from "@/app/databases/users";
import { useState } from "react";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Profile() {
  // Lấy token từ cookie
  const token = getCookie("LOGIN_INFO");

  // Biến lưu thông tin người dùng từ token
  let payload = {
    _id: "",
    name: "",
    email: "",
    phone: "",
    image: "",
  };

  if (token) {
    try {
      // Giải mã payload từ JWT
      payload = parseJwt(token);
      console.log(payload);
    } catch (error) {
      console.error("Lỗi giải mã token:", error);
    }
  } else {
    console.error("Không tìm thấy token.");
    // Có thể thêm logic chuyển hướng hoặc thông báo lỗi nếu cần
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // State để lưu tệp hình ảnh
  const [imageFile, setImageFile] = useState(null);

  const onImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      // Kiểm tra kích thước tệp (1MB = 1048576 bytes)
      if (file.size > 1048576) {
        console.error("Kích thước tệp phải nhỏ hơn 1MB.");
        return;
      }

      // Kiểm tra định dạng tệp
      const validImageTypes = ["image/jpeg", "image/png"];
      if (!validImageTypes.includes(file.type)) {
        console.error("Định dạng tệp không hợp lệ. Chỉ hỗ trợ JPEG và PNG.");
        return;
      }

      setImageFile(file); // Lưu tệp hình ảnh hợp lệ
      setValue("image", file); // Cập nhật giá trị hình ảnh trong form
    }
  };

  const onSubmit = async (data) => {
    console.log(data);

    const id = payload._id;
    if (!id) {
      console.error("ID không hợp lệ.");
      return;
    }

    // Tạo đối tượng FormData
    const formData = new FormData();
    formData.append("name", data.name);
    if (imageFile) {
      formData.append("image", imageFile); // Thêm hình ảnh vào FormData nếu có
    }

    try {
      const result = await update(id, formData); // Gửi FormData
      console.log("Cập nhật thành công:", result);
      // Có thể thêm thông báo thành công cho người dùng
    } catch (error) {
      console.error("Lỗi trong quá trình cập nhật:", error);
      // Có thể hiển thị thông báo lỗi cho người dùng
    }
  };

  return (
    <div className="container shadow-lg px-5 py-3 bg-light">
      <div className="border-bottom mb-3">
        <div className="fs-5">Hồ Sơ Của Tôi</div>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <form className="row" onSubmit={handleSubmit(onSubmit)}>
        <div className="col text-center">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <th scope="row" className="text-end">
                  Tên
                </th>
                <td className="text-end">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    id="name"
                    {...register("name", {
                      required: "Tên không được để trống",
                    })}
                    defaultValue={payload.name || "Thành Đô"}
                  />
                  {errors.name && (
                    <div className="invalid-feedback text-start">
                      {errors.name.message}
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-end">
                  Email
                </th>
                <td className="text-start">
                  <p>{payload.email || "ch********@gmail.com"}</p>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-end">
                  Số điện thoại
                </th>
                <td className="text-start">
                  <p>{payload.phone || "*********48"}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="btn btn-success px-4 py-2">
            Lưu
          </button>
        </div>
        <div className="col-4">
          <div className="text-center border-start h-auto">
            <div>
              <img
                src={
                  `${apiUrl}/img/${payload.image}` || "/images/profile-pic.png"
                } // Hiển thị hình ảnh người dùng nếu có
                alt="Profile Picture"
                width={100}
                height={100}
                className="rounded-circle"
              />
              <p>Dung lượng file tối đa 1 MB. Định dạng: JPEG, PNG</p>
              <button
                type="button"
                className="btn btn-outline-secondary position-relative"
              >
                <input
                  className="position-absolute w-100 h-100 opacity-0"
                  type="file"
                  accept="image/*" // Chỉ chấp nhận hình ảnh
                  onChange={onImageChange} // Gọi hàm xử lý khi thay đổi
                />
                Chọn Ảnh
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
