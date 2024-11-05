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

  const fetchOrder = async (id) => {
    const result = await getOrderById(id);
    setOrder(result);
    setSelectedStatus(result.order_status._id); // Set trạng thái hiện tại
    console.log(result);
  };

  const fetchOrderStatus = async () => {
    const result = await getOrderStatuses();
    setOrderStatus(result);
    console.log(result);
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
                    <option key={status._id} value={status._id}>
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
