"use client";
import { getOrderById } from "@/app/databases/order";
import { getOrderStatuses } from "@/app/databases/order_status";
import { updateOrderStatus } from "@/app/databases/order"; // Import hàm updateOrderStatus
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import thư viện toast

export default function OrderDetails({ params }) {
  const { id } = params;
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedStatusToDisabled, setSelectedStatusToDisabled] =
    useState(null);

  const fetchOrder = async (id) => {
    const result = await getOrderById(id);
    setOrder(result);
    setSelectedStatus(result.order_status._id); // Set trạng thái hiện tại
    setSelectedStatusToDisabled(result.order_status._id);
  };

  const fetchOrderStatus = async () => {
    const result = await getOrderStatuses();
    setOrderStatus(result);
  };

  useEffect(() => {
    fetchOrder(id);
    fetchOrderStatus();
  }, [id]);

  const handleUpdateStatus = async () => {
    try {
      await updateOrderStatus(order._id, selectedStatus);
      toast.success("Cập nhật trạng thái đơn hàng thành công!"); // Hiển thị thông báo thành công
      fetchOrder(id); // Tải lại đơn hàng để cập nhật trạng thái hiển thị
    } catch (error) {
      console.error("Error updating order status:", error.message);
      toast.error("Cập nhật trạng thái đơn hàng thất bại!"); // Hiển thị thông báo lỗi
    }
  };

  const disabledStatuses = [];

  switch (selectedStatusToDisabled) {
    case "6724f9c943ad843da1d31150": // Đã hủy
      disabledStatuses.push(
        "6724f9c943ad843da1d3114f", // Đã giao hàng
        "6724f9c943ad843da1d3114c", // Chưa xác nhận
        "6724f9c943ad843da1d3114d", // Đã xác nhận
        "6724f9c943ad843da1d3114e" // Đang giao hàng)
      );
      break;

    case "6724f9c943ad843da1d3114f": // Đã giao hàng
      // Vô hiệu hóa tất cả các trạng thái còn lại
      disabledStatuses.push(
        "6724f9c943ad843da1d31150", // Đã hủy
        "6724f9c943ad843da1d3114c", // Chưa xác nhận
        "6724f9c943ad843da1d3114d", // Đã xác nhận
        "6724f9c943ad843da1d3114e" // Đang giao hàng
      );
      break;

    case "6724f9c943ad843da1d3114d": // Đã xác nhận
      // Vô hiệu hóa Chưa xác nhận
      disabledStatuses.push("6724f9c943ad843da1d3114c"); // Chưa xác nhận
      break;

    case "6724f9c943ad843da1d3114e": // Đang giao hàng
      // Vô hiệu hóa Đã hủy, Đã xác nhận, Chưa xác nhận
      disabledStatuses.push(
        "6724f9c943ad843da1d31150", // Đã hủy
        "6724f9c943ad843da1d3114d", // Đã xác nhận
        "6724f9c943ad843da1d3114c" // Chưa xác nhận
      );
      break;

    default:
      break;
  }

  if (!order) {
    return <div>Loading...</div>;
  }

  const {
    products,
    order_total,
    payment_type,
    order_address,
    shipping_method,
  } = order;

  const totalProductValue = products.reduce((total, product) => {
    return (
      total +
      product.items.price *
        product.quantity *
        (1 - product.items.discount / 100)
    );
  }, 0);

  return (
    <div className="container-fluid py-4">
      <ToastContainer />
      <div className="row g-4">
        {/* Phần bên trái - Tổng quan đơn hàng */}
        <div className="col-3 m-auto p-2 alert-success text-success">
          <div className="d-flex align-items-center">
            <div className="bg-success p-3 me-2">
              <i className="bi bi-cart-fill"></i>
            </div>
            <div className="fs-5">
              Ngày đặt
              <small className="d-block">
                {new Intl.DateTimeFormat("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(order.createdAt))}
              </small>
            </div>
          </div>
        </div>

        <div className="col-3 m-auto p-2 alert-info text-info">
          <div className="d-flex align-items-center">
            <div className="bg-info p-3 me-2 ">
              <i class="bi bi-person-fill"></i>
            </div>
            <div className="fs-5">
              Tên
              <small className="d-block">{order.order_address.name}</small>
            </div>
          </div>
        </div>
        <div className="col-3 m-auto p-2 alert-danger text-danger">
          <div className="d-flex align-items-center">
            <div className="bg-danger p-3 me-2">
              <i class="bi bi-telephone-fill"></i>
            </div>
            <div className="fs-5">
              Số điện thoại
              <small className="d-block">{order.order_address.phone}</small>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Tổng quan đơn hàng</h5>

              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" style={{ width: "15%" }}>
                        <div className="d-flex align-items-center">
                          HÌNH ẢNH<i className="bi bi-arrow-down-up ms-1"></i>
                        </div>
                      </th>
                      <th scope="col" style={{ width: "40%" }}>
                        <div className="d-flex align-items-center">
                          TÊN SẢN PHẨM
                          <i className="bi bi-arrow-down-up ms-1"></i>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="text-center"
                        style={{ width: "20%" }}
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          SỐ LƯỢNG<i className="bi bi-arrow-down-up ms-1"></i>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="text-end"
                        style={{ width: "25%" }}
                      >
                        <div className="d-flex align-items-center justify-content-end">
                          GIÁ<i className="bi bi-arrow-down-up ms-1"></i>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.items.variations._id}>
                        <td>
                          <img
                            src={product.items.image.mediaFilePath}
                            alt={product.name}
                            className="img-fluid rounded"
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>
                          <div className="fw-medium">{product.name}</div>
                          <div className="text-primary small">
                            {product.category.categoryName}
                          </div>
                          <div className="text-primary small">
                            {product.items.color.colorName} -{" "}
                            {product.items.variations.size.sizeName}
                          </div>
                        </td>
                        <td className="text-center">{product.quantity}</td>
                        <td className="text-end">
                          {(
                            product.items.price *
                            (1 - product.items.discount / 100)
                          ).toLocaleString()}{" "}
                          đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-top pt-3 mt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Tổng giá trị sản phẩm:</span>
                  <span className="fw-medium" style={{ minWidth: "100px" }}>
                    {totalProductValue.toLocaleString()} đ
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Giá vận chuyển:</span>
                  <span className="fw-medium" style={{ minWidth: "100px" }}>
                    {shipping_method.price.toLocaleString()} đ
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tổng giá trị đơn hàng:</span>
                  <span className="fw-medium" style={{ minWidth: "100px" }}>
                    {order_total.toLocaleString()} đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phần bên phải - Trạng thái đơn hàng */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Trạng thái đơn hàng</h5>

              <div className="mb-3">
                <label className="form-label">Mã đơn hàng</label>
                <input
                  type="text"
                  className="form-control bg-light"
                  value={order._id}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Trạng thái đơn hàng</label>
                <select
                  className="form-select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {orderStatus.map((status) => (
                    <option
                      key={status._id}
                      value={status._id}
                      disabled={disabledStatuses.includes(status._id)}
                    >
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Hình thức thanh toán</label>
                <input
                  type="text"
                  className="form-control bg-light"
                  value={payment_type.name}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Địa chỉ giao hàng</label>
                <textarea
                  className="form-control bg-light"
                  rows="4"
                  value={`${order_address.name}, ${order_address.specific_address}, ${order_address.address.district.ward.prefix} ${order_address.address.district.ward.name}, ${order_address.address.district.name}, ${order_address.address.name}`}
                  readOnly
                />
              </div>

              <button className="btn btn-primary" onClick={handleUpdateStatus}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
