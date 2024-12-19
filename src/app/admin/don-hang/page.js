"use client";
import { getAllOrders, deleteOrder } from "@/app/databases/order"; // Ensure deleteOrder is exported
import { getOrderStatuses } from "@/app/databases/order_status";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

export default function Orders() {
  const [allOrders, setAllOrders] = useState([]); // All fetched orders
  const [filteredOrders, setFilteredOrders] = useState([]); // Orders after applying filters
  const [isLoading, setIsLoading] = useState(true);
  const [listOrderStatuses, setListOrderStatues] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null); // Selected status for filtering
  const [searchQuery, setSearchQuery] = useState(''); // Search query for Order ID
  const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order to delete

  // Fetch order statuses
  const fetchOrderStatues = async () => {
    try {
      const result = await getOrderStatuses();
      setListOrderStatues(result);
    } catch (error) {
      console.error("Error fetching order statuses:", error);
      toast.error("Đã xảy ra lỗi khi lấy trạng thái đơn hàng.");
    }
  };

  // Fetch orders with optional status filtering
  const fetchOrders = async (statusId = null) => {
    setIsLoading(true);
    try {
      const result = await getAllOrders();
      // Filter orders by status if statusId is provided
      const filteredByStatus = statusId
        ? result.filter((order) => order.order_status?._id === statusId)
        : result;
      setAllOrders(filteredByStatus); // Store the filtered list based on status
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setIsLoading(false);
      toast.error("Đã xảy ra lỗi khi lấy danh sách đơn hàng.");
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch all orders when component mounts
    fetchOrderStatues(); // Fetch all order statuses when component mounts
  }, []);

  // Handle status selection and fetch orders based on selected status
  const handleOrderStatus = (statusId) => {
    setSelectedStatus(statusId); // Update selected status
    fetchOrders(statusId); // Fetch orders based on selected status
  };

  // Handle changes in the search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // useEffect to handle filtering based on search query and selected status
  useEffect(() => {
    // If there's a search query, filter the allOrders list
    if (searchQuery.trim() !== '') {
      const filtered = allOrders.filter((order) =>
        order._id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      // If no search query, display allOrders
      setFilteredOrders(allOrders);
    }
  }, [searchQuery, allOrders]);

  // Handle delete button click
  const handleDelete = (order) => {
    setSelectedOrder(order); // Set the selected order for deletion
  };

  // Function to handle order deletion
  const onSubmitDelete = async () => {
    if (!selectedOrder) return;

    try {
      await deleteOrder(selectedOrder._id); // Call your delete API/function

      // Update the orders list by removing the deleted order
      setAllOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== selectedOrder._id)
      );
      setFilteredOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== selectedOrder._id)
      );

      toast.success('Đã xóa đơn hàng thành công.'); // Success notification

      // Close the modal
      const modal = document.getElementById("deleteOrder");
      const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();

      // Reset the selected order
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error('Xóa đơn hàng thất bại.'); // Error notification
    }
  };

  return (
    <>
      {/* ToastContainer to display notifications */}
      <ToastContainer />

      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách đơn hàng</b>
            </a>
          </li>
        </ul>
        <div id="clock" />
      </div>

      {/* Status Filter and Search Input */}
      <div className="bg-white position-sticky top-0 shadow-sm">
        <div className="d-flex justify-content-between fs-6">
          {/* Status Filter */}
          <div
            className={`p-3 flex-shrink-0 ${
              selectedStatus === null
                ? "border-primary border-bottom border-3"
                : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleOrderStatus(null)} // Show all orders
          >
            Tất cả
          </div>

          {/* Render status options */}
          {listOrderStatuses.map((status) => (
            <div
              key={status._id}
              className={`p-3 flex-grow-1 text-center ${
                selectedStatus === status._id
                  ? "border-bottom border-primary border-3"
                  : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleOrderStatus(status._id)} // Filter by selected status
            >
              {status.name}
            </div>
          ))}

          {/* Search Input for Order ID */}
          <div className="pt-2 pb-2 pr-2 flex-shrink-0">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm ID đơn hàng..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              {isLoading ? (
                <div className="text-center my-3">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered js-copytextarea align-middle">
                    <thead>
                      <tr>
                        <th>ID đơn hàng</th>
                        <th>Khách hàng</th>
                        <th>Địa chỉ</th>
                        <th>Đơn hàng</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Tình trạng</th>
                        <th>Tính năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                          <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.order_address.name}</td>
                            <td>
                              {order.order_address.specific_address},{" "}
                              {order.order_address.address?.district?.ward?.prefix},{" "}
                              {order.order_address.address?.district?.ward?.name},{" "}
                              {order.order_address.address?.district?.name},{" "}
                              {order.order_address.address?.name}
                            </td>
                            <td>
                              {order.products.slice(0, 1).map((product) => (
                                <div key={product._id}>
                                  {product.name} - {product.quantity} cái
                                </div>
                              ))}
                              {order.products.length > 1 && (
                                <span>
                                  và {order.products.length - 1} sản phẩm khác...
                                </span>
                              )}
                            </td>

                            <td>{order.products.length}</td>
                            <td>{order.order_total.toLocaleString()}đ</td>
                            <td>
                              <span
                                className={`badge ${
                                  order.order_status?.name === "Đã giao hàng"
                                    ? "bg-success"
                                    : order.order_status?.name === "Chờ xử lý"
                                    ? "bg-info"
                                    : order.order_status?.name === "Đang giao hàng"
                                    ? "bg-warning"
                                    : order.order_status?.name === "Đã hủy"
                                    ? "bg-danger"
                                    : "bg-primary"
                                }`}
                              >
                                {order.order_status?.name}
                              </span>
                            </td>
                            <td className="table-td-center">

                              <Link href={`/admin/don-hang/sua/${order._id}`}>
                                <button
                                  className="btn btn-warning btn-sm edit"
                                  type="button"
                                  title="Sửa"
                                  style={{ width: "20px", margin: "5px" }}
                                >
                                  <i className="bi bi-pencil" />
                                </button>
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center">
                            Không có đơn hàng nào.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal xác nhận xóa */}
      <div
        className="modal fade"
        id="deleteOrder"
        tabIndex="-1"
        aria-labelledby="deleteOrderLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="deleteOrderLabel">
                Xác nhận xóa
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Bạn có chắc chắn muốn xóa đơn hàng này không?</p>
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
                onClick={onSubmitDelete} // Ensure this function is defined
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}