"use client";
import { getAllByUserId } from "@/app/databases/address";
import { getOrdersByUserId } from "@/app/databases/order";
import { getUserById } from "@/app/databases/users";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ({ params }) {
  const { id } = params;
  const [user, setUser] = useState({});
  const [userAddress, setUserAddress] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  const fetchUser = async (id) => {
    const result = await getUserById(id);
    setUser(result.User);
  };

  const fetchUserAddress = async (id) => {
    const result = await getAllByUserId(id);
    setUserAddress(result);
  };

  const fetchUserOrders = async (id) => {
    const result = await getOrdersByUserId(id);
    console.log(result);
    setUserOrders(result);
  };

  useEffect(() => {
    fetchUser(id);
    fetchUserAddress(id);
    fetchUserOrders(id);
  }, [id]); // Ensure to refetch when 'id' changes

  // Tìm địa chỉ mặc định
  const defaultAddress = userAddress.find(
    (address) => address.is_default === true
  );
  const addressToDisplay = defaultAddress
    ? `${defaultAddress.specific_address}, ${defaultAddress.address.district.ward.prefix} ${defaultAddress.address.district.ward.name}, ${defaultAddress.address.district.name}, ${defaultAddress.address.name}`
    : "Chưa có địa chỉ Mặc định";

  return (
    <>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Chi tiết người dùng</b>
            </a>
          </li>
        </ul>
        <div id="clock" />
      </div>
      <div className="row">
        <div className="col-4">
          <div className="row">
            <div className="col-12">
              <div className="bg-white shadow p-3">
                <h4>Hồ sơ</h4>
                <div className="text-center">
                  <img
                    src={`http://localhost:2204/img/user/${user.image}`}
                    alt=""
                    className="w-25 rounded"
                  />
                  {/* <div className="mt-3">{user._id}</div> */}
                  <div className="mt-3">{user.name}</div>
                </div>
                <div className="text-start mt-3">
                  <div className="d-flex mb-3">
                    <i className="bi bi-phone me-3"></i>
                    {user.phone}
                  </div>
                  <div className="d-flex mb-3">
                    <i className="bi bi-envelope me-3"></i>
                    <span>{user.email}</span>
                  </div>
                  {/* <div className="d-flex mb-3">
                    <i className="bi bi-calendar me-3"></i>
                    <span>{addressToDisplay}</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="row bg-white shadow py-3">
            <h4>Địa chỉ của người dùng</h4>
            <div className="col-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>SĐT</th>
                    <th>Địa chỉ đầy đủ</th>
                  </tr>
                </thead>
                <tbody>
                  {userAddress.map((address, index) => (
                    <tr key={index}>
                      <td>{address.name}</td>
                      <td>{address.phone}</td>
                      <td>
                        {address.specific_address},{" "}
                        {address.address.district.ward.prefix}{" "}
                        {address.address.district.ward.name},{" "}
                        {address.address.district.name}, {address.address.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row bg-white shadow py-3 mt-3">
            <h4>Đơn hàng của người dùng</h4>
            <div className="col-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders.map((order, index) => {
                    // Lấy tên sản phẩm đầu tiên
                    const productName = order.products[0].name;

                    // Tính tổng số lượng sản phẩm
                    const totalQuantity = order.products.reduce(
                      (total, product) => total + product.quantity,
                      0
                    );

                    // Tính tổng số sản phẩm còn lại (sản phẩm khác ngoài sản phẩm đầu tiên)
                    const otherProductsCount = order.products.length - 1;

                    // Nếu có các sản phẩm khác thì hiển thị thêm
                    const displayText =
                      otherProductsCount > 0
                        ? `${productName} - ${order.products[0].quantity} cái và ${otherProductsCount} sản phẩm khác...`
                        : `${productName} - ${order.products[0].quantity} cái`;

                    const totalAmount = order.order_total;
                    const status = order.order_status;

                    return (
                      <tr key={index}>
                        <td>{displayText}</td>
                        <td>{totalQuantity}</td>
                        <td>{totalAmount.toLocaleString()} VNĐ</td>
                        <td>
                          <span
                            className={`badge ${
                              status.name === "Đã giao hàng"
                                ? "bg-success"
                                : status.name === "Chờ xử lý"
                                ? "bg-info"
                                : status.name === "Đang giao hàng"
                                ? "bg-warning"
                                : status.name === "Đã hủy"
                                ? "bg-danger"
                                : "bg-primary"
                            }`}
                          >
                            {status.name}
                          </span>
                        </td>
                        <td>
                          <Link href={`/admin/don-hang/sua/${order._id}`}>
                            <button
                              className="btn btn-primary btn-sm edit"
                              type="button"
                              title="Sửa"
                              id="show-emp"
                              style={{ width: "20px", margin: "5px" }}
                            >
                              <i className="bi bi-pencil" />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
