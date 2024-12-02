import React, { useState, useEffect } from "react";

// Component hiển thị tổng đơn hàng
function TotalOrdersTable({ listOrders }) {
  const [totalAmount, setTotalAmount] = useState(0); // Biến để lưu tổng tiền
  const [filteredOrders, setFilteredOrders] = useState([]); // Biến lưu các đơn hàng đã lọc

  useEffect(() => {
    // Lọc các đơn hàng có order_status._id !== '6724f9c943ad843da1d31150'
    const filtered = listOrders.filter(
      (order) =>
        order.order_status &&
        order.order_status._id !== "6724f9c943ad843da1d31150"
    );

    setFilteredOrders(filtered);

    // Tính tổng tiền cho các đơn hàng đã lọc
    const total = filtered.reduce((sum, order) => sum + order.order_total, 0);
    setTotalAmount(total);
  }, [listOrders]);

  return (
    <div className="col-md-12">
      <div className="tile">
        <div>
          <h3 className="tile-title">TỔNG ĐƠN HÀNG</h3>
        </div>
        <div className="tile-body">
          <table className="table table-hover table-bordered" id="sampleTable">
            <thead>
              <tr>
                <th>ID đơn hàng</th>
                <th>Khách hàng</th>
                <th>Đơn hàng</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                // Mảng các sản phẩm trong đơn hàng
                const productNames = order.products.slice(0, 1); // Chỉ lấy 1 sản phẩm đầu tiên
                const productDisplay = productNames
                  .map((product) => `${product.name} - ${product.quantity} cái`)
                  .join(" | "); // Kết nối các tên sản phẩm với định dạng yêu cầu

                const totalQuantity = order.products.reduce(
                  (sum, product) => sum + product.quantity,
                  0
                );

                const hasMoreProducts = order.products.length > 1;
                const displayNames = hasMoreProducts
                  ? `${productDisplay} và ${
                      order.products.length - 1
                    } sản phẩm khác...`
                  : productDisplay;

                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.order_address.name}</td>
                    <td>{displayNames}</td>
                    <td>{totalQuantity} sản phẩm</td>
                    <td>
                      {new Intl.NumberFormat().format(order.order_total)} đ
                    </td>
                  </tr>
                );
              })}

              <tr>
                <th colSpan={4}>Tổng cộng:</th>
                <td>{new Intl.NumberFormat().format(totalAmount)} đ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TotalOrdersTable;
