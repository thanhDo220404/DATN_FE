// VoucherManagement.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import {
  deleteVoucher,
  getAllVouchers,
  insertVoucher,
  updateVoucher,
} from "@/app/databases/voucher";

const Vouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [error, setError] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState(null); // Dùng chung cho edit và delete

  const {
    register: registerInsert,
    handleSubmit: handleSubmitInsert,
    reset: resetInsert,
    formState: { errors: errorsInsert },
  } = useForm({
    defaultValues: {
      code: "",
      discountType: "percentage",
      discountValue: 0,
      expiryDate: "",
      minOrderValue: 0,
      maxDiscountAmount: 0,
    },
  });
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    setValue: setValueUpdate,
    reset: resetUpdate,
    formState: { errors: errorsUpdate },
  } = useForm();

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const result = await getAllVouchers();
      setVouchers(result);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      setError("Không thể tải danh sách voucher.");
    }
  };

  const addVoucher = async (data) => {
    try {
      await insertVoucher(data);
      fetchVouchers();
      toast.success("Thêm voucher thành công!");
      resetInsert();
      setError("");
      // Close modal
      const modal = document.getElementById("addVoucherModal");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    } catch (error) {
      console.error("Error adding voucher:", error);
      setError("Có lỗi xảy ra khi thêm voucher.");
    }
  };

  const handleUpdate = (voucher) => {
    setSelectedVoucher(voucher);

    // Gán dữ liệu voucher vào form chỉnh sửa
    Object.keys(voucher).forEach((key) => {
      setValueUpdate(key, voucher[key]);
    });
  };

  const updateVoucherData = async (data) => {
    try {
      if (!selectedVoucher) return;

      await updateVoucher(selectedVoucher._id, data);
      toast.success("Cập nhật voucher thành công!");
      // Hiển thị modal chỉnh sửa
      const modal = document.getElementById("updateVoucherModal");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
      fetchVouchers();
      resetUpdate();
      setSelectedVoucher(null);
    } catch (error) {
      console.error("Error updating voucher:", error);
      toast.error("Có lỗi xảy ra khi cập nhật voucher.");
    }
  };

  const handleDelete = (voucher) => {
    setSelectedVoucher(voucher);
  };

  const confirmDeleteVoucher = async () => {
    try {
      if (!selectedVoucher) return;

      await deleteVoucher(selectedVoucher._id);
      toast.success("Xóa voucher thành công!");
      const modal = document.getElementById("confirmDeleteModal");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
      fetchVouchers();
      setSelectedVoucher(null);
    } catch (error) {
      console.error("Error deleting voucher:", error);
      toast.error("Có lỗi xảy ra khi xóa voucher.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid px-4">
        <h1 className="mt-4">Quản Lý Voucher</h1>

        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <i className="fas fa-table me-1"></i>
            Danh Sách Voucher
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addVoucherModal"
            >
              Thêm Voucher
            </button>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Mã Voucher</th>
                  <th>Loại Giảm Giá</th>
                  <th>Giá Trị</th>
                  <th>Giá Trị Đơn Hàng Tối Thiểu</th>
                  <th>Giảm Giá Tối Đa</th>
                  <th>Hạn Sử Dụng</th>
                  <th>Trạng Thái</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher) => (
                  <tr key={voucher._id}>
                    <td>{voucher.code}</td>
                    <td>
                      {voucher.discountType === "percentage"
                        ? "Phần Trăm"
                        : "Cố Định"}
                    </td>
                    <td>
                      {voucher.discountType === "percentage"
                        ? `${voucher.discountValue}%`
                        : `${new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(voucher.discountValue)}`}
                    </td>
                    <td>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(voucher.minOrderValue)}
                    </td>
                    <td>
                      {voucher.maxDiscountAmount
                        ? new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(voucher.maxDiscountAmount)
                        : "Không giới hạn"}
                    </td>
                    <td>{new Date(voucher.expiryDate).toLocaleDateString()}</td>
                    <td>
                      {voucher.isActive ? "Hoạt Động" : "Không Hoạt Động"}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#updateVoucherModal"
                        onClick={() => handleUpdate(voucher)}
                      >
                        Chỉnh Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#confirmDeleteModal"
                        onClick={() => handleDelete(voucher)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Thêm Voucher Modal */}
      <div
        className="modal fade"
        id="addVoucherModal"
        tabIndex="-1"
        aria-labelledby="addVoucherModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form
            className="modal-content"
            onSubmit={handleSubmitInsert(addVoucher)}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="addVoucherModalLabel">
                Thêm Voucher Mới
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="voucherCode" className="form-label">
                  Mã Voucher
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="voucherCode"
                  {...registerInsert("code", {
                    required: "Vui lòng nhập mã voucher.",
                  })}
                  placeholder="Nhập mã voucher"
                />
                {errorsInsert.code && (
                  <span className="text-danger">
                    {errorsInsert.code.message}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="discountType" className="form-label">
                  Loại Giảm Giá
                </label>
                <select
                  className="form-select"
                  id="discountType"
                  {...registerInsert("discountType")}
                >
                  <option value="percentage">Giảm giá theo %</option>
                  <option value="fixed">Giảm giá cố định</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="discountValue" className="form-label">
                  Giá Trị Giảm Giá
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="discountValue"
                  {...registerInsert("discountValue", {
                    required: "Vui lòng nhập giá trị giảm giá.",
                    min: {
                      value: 0,
                      message: "Giá trị phải lớn hơn hoặc bằng 0.",
                    },
                  })}
                  placeholder="Nhập giá trị giảm giá"
                />
                {errorsInsert.discountValue && (
                  <span className="text-danger">
                    {errorsInsert.discountValue.message}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="minOrderValue" className="form-label">
                  Giá Trị Đơn Hàng Tối Thiểu
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="minOrderValue"
                  {...registerInsert("minOrderValue", {
                    required: "Vui lòng nhập giá trị đơn hàng tối thiểu.",
                    min: {
                      value: 0,
                      message: "Giá trị phải lớn hơn hoặc bằng 0.",
                    },
                  })}
                  placeholder="Nhập giá trị đơn hàng tối thiểu"
                />
                {errorsInsert.minOrderValue && (
                  <span className="text-danger">
                    {errorsInsert.minOrderValue.message}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="maxDiscountAmount" className="form-label">
                  Giảm Giá Tối Đa
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="maxDiscountAmount"
                  {...registerInsert("maxDiscountAmount", {
                    min: {
                      value: 0,
                      message: "Giá trị phải lớn hơn hoặc bằng 0.",
                    },
                  })}
                  placeholder="Nhập số tiền giảm giá tối đa"
                />
                {errorsInsert.maxDiscountAmount && (
                  <span className="text-danger">
                    {errorsInsert.maxDiscountAmount.message}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="expiryDate" className="form-label">
                  Hạn Sử Dụng
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="expiryDate"
                  {...registerInsert("expiryDate", {
                    required: "Vui lòng nhập ngày hết hạn.",
                  })}
                />
                {errorsInsert.expiryDate && (
                  <span className="text-danger">
                    {errorsInsert.expiryDate.message}
                  </span>
                )}
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
              <button type="submit" className="btn btn-primary">
                Thêm Mới
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Modal Chỉnh Sửa Voucher */}
      <div
        className="modal fade"
        id="updateVoucherModal"
        tabIndex="-1"
        aria-labelledby="updateVoucherLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form
            className="modal-content"
            onSubmit={handleSubmitUpdate(updateVoucherData)}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="updateVoucherLabel">
                Chỉnh Sửa Voucher
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="updateCode" className="form-label">
                  Mã Voucher
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errorsUpdate.code ? "is-invalid" : ""
                  }`}
                  id="updateCode"
                  {...registerUpdate("code", {
                    required: "Mã voucher không được để trống.",
                  })}
                />
                {errorsUpdate.code && (
                  <span className="text-danger">
                    {errorsUpdate.code.message}
                  </span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="updateDiscountType" className="form-label">
                  Loại Giảm Giá
                </label>
                <select
                  className="form-select"
                  id="updateDiscountType"
                  {...registerUpdate("discountType")}
                >
                  <option value="percentage">Giảm giá theo %</option>
                  <option value="fixed">Giảm giá cố định</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="updateDiscountValue" className="form-label">
                  Giá Trị Giảm Giá
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="updateDiscountValue"
                  {...registerUpdate("discountValue", {
                    required: "Vui lòng nhập giá trị giảm giá.",
                    min: {
                      value: 0,
                      message: "Giá trị phải lớn hơn hoặc bằng 0.",
                    },
                  })}
                />
                {errorsUpdate.discountValue && (
                  <span className="text-danger">
                    {errorsUpdate.discountValue.message}
                  </span>
                )}
              </div>

              {/* Thêm trường giá trị đơn hàng tối thiểu */}
              <div className="mb-3">
                <label htmlFor="updateMinOrderValue" className="form-label">
                  Giá Trị Đơn Hàng Tối Thiểu
                </label>
                <input
                  type="number"
                  className={`form-control ${
                    errorsUpdate.minOrderValue ? "is-invalid" : ""
                  }`}
                  id="updateMinOrderValue"
                  {...registerUpdate("minOrderValue", {
                    required: "Vui lòng nhập giá trị đơn hàng tối thiểu.",
                    min: {
                      value: 0,
                      message: "Giá trị phải lớn hơn hoặc bằng 0.",
                    },
                  })}
                />
                {errorsUpdate.minOrderValue && (
                  <span className="text-danger">
                    {errorsUpdate.minOrderValue.message}
                  </span>
                )}
              </div>

              {/* Thêm trường giảm giá tối đa */}
              <div className="mb-3">
                <label htmlFor="updateMaxDiscountAmount" className="form-label">
                  Giảm Giá Tối Đa
                </label>
                <input
                  type="number"
                  className={`form-control ${
                    errorsUpdate.maxDiscountAmount ? "is-invalid" : ""
                  }`}
                  id="updateMaxDiscountAmount"
                  {...registerUpdate("maxDiscountAmount", {
                    min: {
                      value: 0,
                      message: "Giảm giá tối đa phải lớn hơn hoặc bằng 0.",
                    },
                  })}
                />
                {errorsUpdate.maxDiscountAmount && (
                  <span className="text-danger">
                    {errorsUpdate.maxDiscountAmount.message}
                  </span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="updateExpiryDate" className="form-label">
                  Hạn Sử Dụng
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="updateExpiryDate"
                  {...registerUpdate("expiryDate", {
                    required: "Vui lòng nhập ngày hết hạn.",
                  })}
                />
                {errorsUpdate.expiryDate && (
                  <span className="text-danger">
                    {errorsUpdate.expiryDate.message}
                  </span>
                )}
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
              <button type="submit" className="btn btn-primary">
                Cập Nhật
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Xác Nhận Xóa */}
      <div className="modal fade" id="confirmDeleteModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Xác Nhận Xóa</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              Bạn có chắc chắn muốn xóa voucher "{selectedVoucher?.code || ""}"
              không?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDeleteVoucher}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vouchers;
