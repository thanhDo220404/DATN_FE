"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { getCookie } from "@/app/lib/CookieManager";
import { parseJwt } from "@/app/databases/users";
import {
  deleteById,
  getAllByUserId,
  insert,
  updateById,
} from "@/app/databases/address";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function UserAddress() {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [userAddresses, setUserAddresses] = useState([]); // State để lưu danh sách địa chỉ

  const [addressId, setAddressId] = useState(null);

  const {
    register: registerInsert,
    handleSubmit: handleSubmitInsert,
    formState: { errors: errorsInsert },
    setValue: setValueInsert,
    reset: resetInsert,
    watch: watchInsert,
  } = useForm();
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    formState: { errors: errorsUpdate },
    setValue: setValueUpdate,
    reset: resetUpdate,
    watch: watchUpdate,
  } = useForm();
  const selectedCity = watchInsert("province") || watchUpdate("provinceUpdate");
  const selectedDistrict =
    watchInsert("district") || watchUpdate("districtUpdate");
  // Tạo useEffect để theo dõi khi giá trị province hoặc district thay đổi
  useEffect(() => {
    // Kiểm tra và cập nhật districts nếu province thay đổi
    const newDistricts =
      cities.find((location) => location.id === selectedCity)?.districts || [];
    setDistricts(newDistricts); // Cập nhật giá trị districts

    // Sau khi cập nhật districts, tiếp tục cập nhật wards nếu district thay đổi
    const newWards =
      newDistricts.find((district) => district.id === selectedDistrict)
        ?.wards || [];
    setWards(newWards); // Cập nhật giá trị wards
  }, [selectedCity, selectedDistrict]); // Chạy lại khi selectedCity hoặc selectedDistrict thay đổi

  const handleDeleteClick = (addressId) => {
    setAddressId(addressId);
  };
  const handleDeleteConfirm = async () => {
    if (addressId) {
      try {
        await deleteById(addressId);
        await fetchUserAddresses(userId); // Cập nhật lại danh sách địa chỉ
        setAddressId(null); // Reset địa chỉ đang xóa

        // Đóng modal xóa
        const modal = document.getElementById("deleteUserAddress");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
      } catch (error) {
        console.error("Lỗi khi xóa địa chỉ:", error);
        // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi cho người dùng)
      }
    }
  };

  const handleUpdate = async (address) => {
    setValueUpdate("_id", address._id);
    setValueUpdate("nameUpdate", address.name);
    setValueUpdate("phoneUpdate", address.phone);
    setValueUpdate("provinceUpdate", address.address.id);
    setValueUpdate("districtUpdate", address.address.district.id);
    setValueUpdate("wardUpdate", address.address.district.ward.id);
    setValueUpdate("specific_addressUpdate", address.specific_address);
    setValueUpdate("is_defaultUpdate", address.is_default);

    const is_defaultElement = document.getElementById("is_defaultUpdate");
    if (address.is_default === true) {
      is_defaultElement.disabled = true;
      is_defaultElement.checked = true;
    } else {
      is_defaultElement.disabled = false;
      is_defaultElement.checked = false;
    }
  };

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const token = getCookie("LOGIN_INFO");
    if (token) {
      const payload = parseJwt(token);
      setUserId(payload._id);
    }
    fetchCities();
  }, []);

  const fetchUserAddresses = async (userId) => {
    if (userId) {
      try {
        const userAddresses = await getAllByUserId(userId);
        setUserAddresses(userAddresses);
      } catch (error) {
        console.error("Không thể lấy địa chỉ:", error);
      }
    }
  };
  useEffect(() => {
    fetchUserAddresses(userId);
  }, [userId]); // Gọi lại khi userId thay đổi

  // Hàm onSubmit đã được cập nhật
  const onSubmit = async (formData) => {
    // Các ID từ formData
    const provinceId = formData.province;
    const districtId = formData.district;
    const wardId = formData.ward;

    // Bước 1: Tìm tỉnh/thành phố trong cities
    const selectedProvince = cities.find((city) => city.id === provinceId);
    if (!selectedProvince) {
      console.error("Không tìm thấy tỉnh/thành phố");
    }

    // Bước 2: Tìm quận/huyện trong selectedProvince.districts
    const selectedDistrict = selectedProvince.districts.find(
      (district) => district.id === districtId
    );
    if (!selectedDistrict) {
      console.error("Không tìm thấy quận/huyện");
    }

    // Bước 3: Tìm phường/xã trong selectedDistrict.wards
    const selectedWard = selectedDistrict.wards.find(
      (ward) => ward.id === wardId
    );
    if (!selectedWard) {
      console.error("Không tìm thấy phường/xã");
    }

    // Bước 4: Tạo đối tượng JSON với cấu trúc mong muốn
    const addressJson = {
      id: selectedProvince.id,
      name: selectedProvince.name,
      district: {
        id: selectedDistrict.id,
        name: selectedDistrict.name,
        ward: {
          id: selectedWard.id,
          name: selectedWard.name,
          prefix: selectedWard.prefix,
        },
      },
    };
    const data = {
      name: formData.name,
      userId: userId,
      phone: formData.phone,
      address: addressJson,
      specific_address: formData.specific_address,
      is_default: formData.is_default || false,
    };

    try {
      const result = await insert(data);
      console.log(result);
      resetInsert(); // Đặt lại form
      await fetchUserAddresses(userId); // Làm mới danh sách địa chỉ

      // Đóng modal
      const modal = document.getElementById("newUserAddress");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    } catch (error) {
      console.error("Lỗi khi tạo địa chỉ:", error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi cho người dùng)
    }
  };
  const onSubmitUpdate = async (formData) => {
    // Các ID từ formData
    const provinceId = formData.provinceUpdate;
    const districtId = formData.districtUpdate;
    const wardId = formData.wardUpdate;

    // Bước 1: Tìm tỉnh/thành phố trong cities
    const selectedProvince = cities.find((city) => city.id === provinceId);
    if (!selectedProvince) {
      console.error("Không tìm thấy tỉnh/thành phố");
    }

    // Bước 2: Tìm quận/huyện trong selectedProvince.districts
    const selectedDistrict = selectedProvince.districts.find(
      (district) => district.id === districtId
    );
    if (!selectedDistrict) {
      console.error("Không tìm thấy quận/huyện");
    }

    // Bước 3: Tìm phường/xã trong selectedDistrict.wards
    const selectedWard = selectedDistrict.wards.find(
      (ward) => ward.id === wardId
    );
    if (!selectedWard) {
      console.error("Không tìm thấy phường/xã");
    }

    // Bước 4: Tạo đối tượng JSON với cấu trúc mong muốn
    const addressJson = {
      id: selectedProvince.id,
      name: selectedProvince.name,
      district: {
        id: selectedDistrict.id,
        name: selectedDistrict.name,
        ward: {
          id: selectedWard.id,
          name: selectedWard.name,
          prefix: selectedWard.prefix,
        },
      },
    };
    const data = {
      name: formData.nameUpdate,
      userId: userId,
      phone: formData.phoneUpdate,
      address: addressJson,
      specific_address: formData.specific_addressUpdate,
      is_default: formData.is_defaultUpdate || false,
    };
    console.log(data);
    try {
      const result = await updateById(formData._id, data);
      console.log(result);
      resetUpdate(); // Đặt lại form
      await fetchUserAddresses(userId); // Làm mới danh sách địa chỉ

      // Đóng modal
      const modal = document.getElementById("updateUserAddress");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    } catch (error) {
      console.error("Lỗi khi cập nhật địa chỉ:", error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi cho người dùng)
    }
  };
  const setIsDefault = async (addressId, body) => {
    try {
      const result = await updateById(addressId, {
        ...body,
        is_default: true, // Đặt địa chỉ này làm mặc định
      });
      console.log("Địa chỉ đã được cập nhật thành công:", result);
      await fetchUserAddresses(userId); // Làm mới danh sách địa chỉ

      // Có thể thêm logic để cập nhật state nếu cần
    } catch (error) {
      console.error("Lỗi khi đặt địa chỉ làm mặc định:", error);
    }
  };
  // Gọi API để lấy dữ liệu Tỉnh, Quận, Huyện, Xã
  const fetchCities = async () => {
    try {
      const response = await fetch(`${apiUrl}/administrative_units`);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching administrative units:", error);
    }
  };

  // const updateAddress = (newValues) => {
  //   setAddress((prevAddress) => ({
  //     ...prevAddress,
  //     ...newValues,
  //   }));
  // };

  // const handleProvinceChange = (e) => {
  //   const provinceId = e.target.value;
  //   const selectedProvinceData = cities.find(
  //     (province) => province.id === provinceId
  //   );

  //   if (selectedProvinceData) {
  //     updateAddress({
  //       id: selectedProvinceData.id,
  //       name: selectedProvinceData.name,
  //     });

  //     // setDistricts(selectedProvinceData.districts);
  //     setWards([]);
  //     setValueInsert("address", selectedProvinceData.name);
  //     if (isUpdating) {
  //       setValueUpdate("addressUpdate", selectedProvinceData.name);
  //     }
  //   }
  // };

  // const handleDistrictChange = (e) => {
  //   const districtId = e.target.value;
  //   const selectedDistrictData = districts.find(
  //     (district) => district.id === districtId
  //   );

  //   if (selectedDistrictData) {
  //     updateAddress({
  //       district: {
  //         id: selectedDistrictData.id,
  //         name: selectedDistrictData.name,
  //       },
  //     });

  //     // setWards(selectedDistrictData.wards);
  //     const addressStr = `${address.name} - ${selectedDistrictData.name}`;
  //     setValueInsert("address", addressStr);
  //     if (isUpdating) {
  //       setValueUpdate("addressUpdate", addressStr);
  //     }
  //   }
  // };

  // const handleWardChange = (e) => {
  //   const wardId = e.target.value;
  //   const selectedWardData = wards.find((ward) => ward.id === wardId);

  //   if (selectedWardData) {
  //     updateAddress({
  //       district: {
  //         ...address.district,
  //         ward: {
  //           id: selectedWardData.id,
  //           name: selectedWardData.name,
  //           prefix: selectedWardData.prefix,
  //         },
  //       },
  //     });

  //     const addressStr = `${address.name} - ${address.district.name} - ${selectedWardData.prefix} ${selectedWardData.name}`;
  //     setValueInsert("address", addressStr);
  //     setValueInsert(
  //       "addressJson",
  //       JSON.stringify({
  //         id: address.id,
  //         name: address.name,
  //         district: {
  //           id: address.district.id,
  //           name: address.district.name,
  //           ward: {
  //             id: selectedWardData.id,
  //             name: selectedWardData.name,
  //             prefix: selectedWardData.prefix,
  //           },
  //         },
  //       })
  //     ); // Cập nhật addressJson với thông tin đầy đủ
  //     if (isUpdating) {
  //       setValueUpdate("addressUpdate", addressStr);
  //       setValueUpdate(
  //         "addressJsonUpdate",
  //         JSON.stringify({
  //           id: address.id,
  //           name: address.name,
  //           district: {
  //             id: address.district.id,
  //             name: address.district.name,
  //             ward: {
  //               id: selectedWardData.id,
  //               name: selectedWardData.name,
  //               prefix: selectedWardData.prefix,
  //             },
  //           },
  //         })
  //       );
  //     }
  //   }
  // };

  return (
    <>
      <div className="shadow-lg bg-light">
        <div>
          <div className="d-flex justify-content-between border-bottom border-dark-subtle px-3 py-3">
            <div className="fs-5">Địa chỉ của tôi</div>
            <div>
              <div
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#newUserAddress"
              >
                Thêm địa chỉ mới
              </div>
            </div>
          </div>
          <div className="px-3 py-3">
            <div className="fs-5">Địa chỉ</div>
            {userAddresses.length ? (
              userAddresses.map((address, index) => (
                <div
                  className="py-3 border-bottom border-dark-subtle"
                  key={index}
                >
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <span className="fs-5">{address.name}</span> |{" "}
                        <span>{address.phone}</span>
                      </div>
                      <div>
                        {/* Ẩn nút "Xóa" nếu is_default là true */}
                        <>
                          <button
                            className="text-primary p-1"
                            data-bs-toggle="modal"
                            data-bs-target="#updateUserAddress"
                            onClick={() => handleUpdate(address)}
                          >
                            Cập nhật
                          </button>
                          {!address.is_default && (
                            <button
                              className="text-primary p-1"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteUserAddress"
                              onClick={() => handleDeleteClick(address._id)}
                            >
                              Xóa
                            </button>
                          )}
                        </>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <div>{address.specific_address}</div>
                        <div>{`${address.address.name} - ${address.address.district.name} - ${address.address.district.ward.prefix} ${address.address.district.ward.name}`}</div>
                      </div>
                      <div>
                        <button
                          className="btn btn-outline-secondary"
                          disabled={address.is_default} // Vô hiệu hóa nút nếu là địa chỉ mặc định
                          onClick={() => {
                            setIsDefault(address._id, {
                              userId: address.userId,
                            });
                          }}
                        >
                          Đặt làm mặc định
                        </button>
                      </div>
                    </div>
                    {/* Hiển thị "Mặc định" nếu is_default là true */}
                    {address.is_default && (
                      <span className="border border-primary p-1 text-primary">
                        Mặc định
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-3">Không có địa chỉ nào.</div>
            )}
          </div>
        </div>
      </div>

      {/* insert */}
      <div
        className="modal fade"
        id="newUserAddress"
        tabIndex="-1"
        aria-labelledby="newUserAddressLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form
            className="modal-content"
            onSubmit={handleSubmitInsert(onSubmit)}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="insertUserAddress">
                Địa chỉ mới
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${
                        errorsInsert.name ? "is-invalid" : ""
                      }`}
                      id="name"
                      placeholder="Họ và tên"
                      {...registerInsert("name", {
                        required: "Vui lòng nhập họ và tên",
                      })}
                    />
                    <label htmlFor="name">Họ và tên</label>
                    {errorsInsert.name && (
                      <div className="invalid-feedback">
                        {errorsInsert.name.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${
                        errorsInsert.phone ? "is-invalid" : ""
                      }`}
                      id="phone"
                      placeholder="Số điện thoại"
                      {...registerInsert("phone", {
                        required: "Vui lòng nhập số điện thoại",
                        pattern: {
                          value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                          message: "Số điện thoại không hợp lệ",
                        },
                      })}
                    />
                    <label htmlFor="phone">Số điện thoại</label>
                    {errorsInsert.phone && (
                      <div className="invalid-feedback">
                        {errorsInsert.phone.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Select Tỉnh */}
              <div className="form-floating mb-3 w-100">
                <select
                  className={`form-control ${
                    errorsInsert.province ? "is-invalid" : ""
                  }`}
                  {...registerInsert("province", {
                    required: "Vui lòng chọn tỉnh", // Kiểm tra yêu cầu
                  })}
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {cities.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="province">Tỉnh/Thành phố</label>
                {errorsInsert.province && (
                  <div className="invalid-feedback">
                    {errorsInsert.province.message}{" "}
                    {/* Hiển thị thông báo lỗi */}
                  </div>
                )}
              </div>

              {/* Select Quận */}
              <div className="form-floating mb-3 w-100">
                <select
                  className={`form-control ${
                    errorsInsert.district ? "is-invalid" : ""
                  }`}
                  {...registerInsert("district", {
                    required: "Vui lòng chọn quận/huyện", // Kiểm tra yêu cầu
                  })}
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="district">Quận/Huyện</label>
                {errorsInsert.district && (
                  <div className="invalid-feedback">
                    {errorsInsert.district.message}{" "}
                    {/* Hiển thị thông báo lỗi */}
                  </div>
                )}
              </div>

              {/* Select Phường/Xã */}
              <div className="form-floating mb-3 w-100">
                <select
                  className={`form-control ${
                    errorsInsert.ward ? "is-invalid" : ""
                  }`}
                  {...registerInsert("ward", {
                    required: "Vui lòng chọn phường/xã", // Kiểm tra yêu cầu
                  })}
                >
                  <option value="">Chọn Phường/Xã</option>
                  {wards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.prefix} {ward.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="ward">Phường/Xã</label>
                {errorsInsert.ward && (
                  <div className="invalid-feedback">
                    {errorsInsert.ward.message} {/* Hiển thị thông báo lỗi */}
                  </div>
                )}
              </div>

              <div className="form-floating w-100 mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    errorsInsert.specific_address ? "is-invalid" : ""
                  }`}
                  id="specific_address"
                  placeholder="Địa chỉ cụ thể"
                  {...registerInsert("specific_address", {
                    required: "Vui lòng nhập địa chỉ cụ thể",
                  })}
                />
                <label htmlFor="specific_address">Địa chỉ cụ thể</label>
                {errorsInsert.specific_address && (
                  <div className="invalid-feedback">
                    {errorsInsert.specific_address.message}
                  </div>
                )}
              </div>

              {/* Checkbox is_default */}
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="is_default"
                  {...registerInsert("is_default")}
                />
                <label className="form-check-label" htmlFor="is_default">
                  Đặt làm địa chỉ mặc định
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button type="submit" className="btn btn-success">
                Lưu địa chỉ
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <!-- Delete --> */}
      <div
        className="modal fade"
        id="deleteUserAddress"
        tabIndex="-1"
        aria-labelledby="deleteUserAddressLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content p-3">
            <div className="modal-body">Bạn có chắc muốn xóa địa chỉ này?</div>
            <div className="modal-footer text-uppercase">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Trở lại
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* update */}
      <div
        className="modal fade"
        id="updateUserAddress"
        tabIndex="-1"
        aria-labelledby="updateUserAddressLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form
            className="modal-content"
            onSubmit={handleSubmitUpdate(onSubmitUpdate)}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateUserAddress">
                Chỉnh sửa địa chỉ
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${
                        errorsUpdate.nameUpdate ? "is-invalid" : ""
                      }`}
                      id="nameUpdate"
                      placeholder="Họ và tên"
                      {...registerUpdate("nameUpdate", {
                        required: "Vui lòng nhập họ và tên",
                      })}
                    />
                    <label htmlFor="nameUpdate">Họ và tên</label>
                    {errorsUpdate.nameUpdate && (
                      <div className="invalid-feedback">
                        {errorsUpdate.nameUpdate.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${
                        errorsUpdate.phoneUpdate ? "is-invalid" : ""
                      }`}
                      id="phoneUpdate"
                      placeholder="Số điện thoại"
                      {...registerUpdate("phoneUpdate", {
                        required: "Vui lòng nhập số điện thoại",
                        pattern: {
                          value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                          message: "Số điện thoại không hợp lệ",
                        },
                      })}
                    />
                    <label htmlFor="phoneUpdate">Số điện thoại</label>
                    {errorsUpdate.phoneUpdate && (
                      <div className="invalid-feedback">
                        {errorsUpdate.phoneUpdate.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Select Tỉnh */}
              <div className="form-floating mb-3 w-100">
                <select
                  className={`form-control ${
                    errorsUpdate.provinceUpdate ? "is-invalid" : ""
                  }`}
                  {...registerUpdate("provinceUpdate", {
                    required: "Vui lòng chọn Tỉnh/Thành phố",
                  })}
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {cities.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="provinceUpdate">Tỉnh/Thành phố</label>
                {errorsUpdate.provinceUpdate && (
                  <div className="invalid-feedback">
                    {errorsUpdate.provinceUpdate.message}
                  </div>
                )}
              </div>

              {/* Select Quận */}
              <div className="form-floating mb-3 w-100">
                <select
                  className={`form-control ${
                    errorsUpdate.districtUpdate ? "is-invalid" : ""
                  }`}
                  {...registerUpdate("districtUpdate", {
                    required: "Vui lòng chọn Quận/Huyện",
                  })}
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="districtUpdate">Quận/Huyện</label>
                {errorsUpdate.districtUpdate && (
                  <div className="invalid-feedback">
                    {errorsUpdate.districtUpdate.message}
                  </div>
                )}
              </div>

              {/* Select Phường */}
              <div className="form-floating mb-3 w-100">
                <select
                  className={`form-control ${
                    errorsUpdate.wardUpdate ? "is-invalid" : ""
                  }`}
                  {...registerUpdate("wardUpdate", {
                    required: "Vui lòng chọn Phường/Xã",
                  })}
                >
                  <option value="">Chọn Phường/Xã</option>
                  {wards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.prefix} {ward.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="wardUpdate">Phường/Xã</label>
                {errorsUpdate.wardUpdate && (
                  <div className="invalid-feedback">
                    {errorsUpdate.wardUpdate.message}
                  </div>
                )}
              </div>

              <div className="form-floating w-100 mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    errorsUpdate.specific_addressUpdate ? "is-invalid" : ""
                  }`}
                  id="specific_addressUpdate"
                  placeholder="Địa chỉ cụ thể"
                  {...registerUpdate("specific_addressUpdate", {
                    required: "Vui lòng nhập địa chỉ cụ thể",
                  })}
                />
                <label htmlFor="specific_addressUpdate">Địa chỉ cụ thể</label>
                {errorsUpdate.specific_addressUpdate && (
                  <div className="invalid-feedback">
                    {errorsUpdate.specific_addressUpdate.message}
                  </div>
                )}
              </div>

              {/* Checkbox is_default */}
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="is_defaultUpdate"
                  {...registerUpdate("is_defaultUpdate")}
                />
                <label className="form-check-label" htmlFor="is_defaultUpdate">
                  Đặt làm địa chỉ mặc định
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button type="submit" className="btn btn-success">
                Lưu địa chỉ
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
