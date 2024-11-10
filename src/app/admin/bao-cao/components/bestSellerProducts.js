import React, { useEffect, useState } from "react";

function ListBestSellerProducts({ listOrders, products }) {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    // Lấy danh sách sản phẩm bán chạy nhất từ danh sách đơn hàng
    const topProductIds = getTopPurchasedProducts(listOrders);

    const topProductsInfo = topProductIds
      .map((productId) => {
        return products.find((product) => product._id === productId);
      })
      .filter(Boolean); // loại bỏ các sản phẩm không tìm thấy

    setTopProducts(topProductsInfo);
  }, [listOrders, products]);

  return (
    <div className="col-md-12">
      <div className="tile">
        <div>
          <h3 className="tile-title">SẢN PHẨM BÁN CHẠY</h3>
        </div>
        <div className="tile-body">
          <table className="table table-hover table-bordered" id="sampleTable">
            <thead>
              <tr>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Giá tiền</th>
                <th>Danh mục</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>
                    {new Intl.NumberFormat().format(product.items[0].price)} đ
                  </td>
                  <td>{product.category.categoryName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Hàm lấy các sản phẩm bán chạy nhất
function getTopPurchasedProducts(orders, limit = 4) {
  const productCounts = {};

  orders.forEach((order) => {
    // Kiểm tra nếu order_status._id là '6724f9c943ad843da1d3114f'
    if (
      order.order_status &&
      order.order_status._id === "6724f9c943ad843da1d3114f"
    ) {
      order.products.forEach((product) => {
        const productId = product._id;
        const quantity = product.quantity;

        if (!productCounts[productId]) {
          productCounts[productId] = 0;
        }

        productCounts[productId] += quantity;
      });
    }
  });

  const sortedProducts = Object.entries(productCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);

  return sortedProducts.map(([productId]) => productId);
}

export default ListBestSellerProducts;
