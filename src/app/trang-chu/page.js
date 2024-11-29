"use client"; // Câu lệnh đặc biệt của Next.js, yêu cầu mã được thực thi ở phía client.

import "@/app/san-pham/style.css"; // Import file CSS để sử dụng style tùy chỉnh.
import { useEffect, useState } from "react"; // Import hook React để quản lý trạng thái và side-effects.
import ProductCard from "../components/productCard"; // Component hiển thị thông tin chi tiết của sản phẩm.
import { getAllProducts } from "../databases/products"; // Hàm lấy danh sách sản phẩm từ database.
import { getAllCategories } from "../databases/categories"; // Hàm lấy danh sách danh mục từ database.
import { getAllOrders } from "../databases/order"; // Hàm lấy danh sách đơn hàng từ database.
import Link from "next/link"; // Component của Next.js để tạo liên kết.
import { ToastContainer } from "react-toastify"; // Component hiển thị thông báo dạng toast.

export default function HomePage() {
  // Khai báo state để quản lý dữ liệu
  const [products, setProducts] = useState([]); // Danh sách sản phẩm.
  const [categories, setCategories] = useState([]); // Danh sách danh mục.
  const [orders, setOrders] = useState([]); // Danh sách đơn hàng.
  const [bestSellingProducts, setBestSellingProducts] = useState([]); // Danh sách sản phẩm bán chạy.

  // Hàm gọi API để lấy danh sách sản phẩm.
  const fetchProducts = async () => {
    const result = await getAllProducts();
    setProducts(result); // Cập nhật danh sách sản phẩm.
    console.log("this is fetchProducts: ", result);
  };

  // Hàm gọi API để lấy danh sách danh mục.
  const fetchCategories = async () => {
    const result = await getAllCategories();
    setCategories(result); // Cập nhật danh sách danh mục.
  };

  // Hàm gọi API để lấy danh sách đơn hàng.
  const fetchOrders = async () => {
    const result = await getAllOrders();
    setOrders(result); // Cập nhật danh sách đơn hàng.
    console.log("this is fetchOrders: ", result);

    // Tìm các sản phẩm bán chạy từ đơn hàng.
    const bestSeller = getTopPurchasedProducts(result);
    console.log("this is bestSeller: ", bestSeller);
  };

  // Hàm tính toán sản phẩm bán chạy dựa trên số lượng đã bán.
  function getTopPurchasedProducts(orders, limit = 4) {
    const productCounts = {};

    orders.forEach((order) => {
      // Bỏ qua đơn hàng có trạng thái không hợp lệ.
      if (
        order.order_status &&
        order.order_status._id !== "6724f9c943ad843da1d31150"
      ) {
        order.products.forEach((product) => {
          const productId = product._id;
          const quantity = product.quantity;

          // Tính tổng số lượng sản phẩm được mua.
          if (!productCounts[productId]) {
            productCounts[productId] = 0;
          }
          productCounts[productId] += quantity;
        });
      }
    });

    // Sắp xếp sản phẩm theo số lượng mua, lấy tối đa `limit` sản phẩm.
    const sortedProducts = Object.entries(productCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);

    return sortedProducts.map(([productId]) => productId);
  }

  // Side-effect đầu tiên: Gọi API lấy dữ liệu khi component được tải.
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchOrders();
  }, []);

  // Side-effect thứ hai: Tính toán sản phẩm bán chạy khi có dữ liệu mới.
  useEffect(() => {
    if (products.length > 0 && orders.length > 0) {
      const bestSellerIds = getTopPurchasedProducts(orders);

      // Lọc và sắp xếp các sản phẩm bán chạy.
      const bestSelling = products.filter((product) =>
        bestSellerIds.includes(product._id)
      );
      const sortedBestSelling = bestSelling.sort(
        (a, b) => bestSellerIds.indexOf(a._id) - bestSellerIds.indexOf(b._id)
      );

      setBestSellingProducts(sortedBestSelling);
    }
  }, [products, orders]);

  console.log(bestSellingProducts);

  // Lấy 4 sản phẩm mới nhất.
  const latestProducts = products
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
    return (
      <>
        {/* Thành phần hiển thị thông báo (toasts) */}
        <ToastContainer></ToastContainer>
  
        {/* Carousel (Băng chuyền ảnh quảng cáo) */}
        <div
          className="carousel slide mt-0"
          data-bs-ride="carousel"
          id="carouselExampleInterval"
        >
          <div className="carousel-inner">
            {/* Ảnh đầu tiên của băng chuyền */}
            <div className="carousel-item active" data-bs-interval="10000">
              <img
                alt="First slide"
                className="d-block w-100"
                src="/images/slider_1.jpg"
              />
            </div>
            {/* Ảnh thứ hai */}
            <div className="carousel-item" data-bs-interval="2000">
              <img
                alt="Second slide"
                className="d-block w-100"
                src="/images/slider_2.jpg"
              />
            </div>
            {/* Ảnh thứ ba */}
            <div className="carousel-item">
              <img
                alt="Third slide"
                className="d-block w-100"
                src="/images/slider_3.jpg"
              />
            </div>
          </div>
  
          {/* Nút điều hướng về ảnh trước đó */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
  
          {/* Nút điều hướng tới ảnh tiếp theo */}
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
  
        {/* Danh mục sản phẩm */}
        <div className="container mt-5">
          <div className="row product-category">
            {categories.map((category, index) => {
              // Tìm sản phẩm đầu tiên thuộc danh mục hiện tại
              const productInCategory = products.find(
                (product) => product.category._id === category._id
              );
  
              // Đường dẫn hình ảnh của danh mục hoặc hình mặc định
              const imageSrc =
                productInCategory &&
                productInCategory.items[0].image.mediaFilePath
                  ? productInCategory.items[0].image.mediaFilePath
                  : `/images/dm_${index + 1}.jpg`;
  
              return (
                <div className="col-md-3" key={category._id}>
                  {/* Liên kết tới trang danh mục */}
                  <Link
                    href={`/danh-muc/${category._id}`}
                    className="card text-bg-dark"
                  >
                    <img
                      alt={category.name}
                      className="card-img"
                      src={imageSrc} // Hình ảnh của danh mục
                    />
                    <div className="card-img-overlay">
                      <h5 className="card-title">{category.name}</h5>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
  
        {/* Sản phẩm nổi bật */}
        <div className="container mt-5 text-start">
          <h3 className="product-title">Sản Phẩm Nổi Bật</h3>
  
          <div className="row featured-products">
            {products.length === 0 ? (
              // Hiển thị các placeholder khi chưa tải sản phẩm
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="col-3" key={index}>
                    <div className="card" aria-hidden="true">
                      <img src="" className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title placeholder-glow">
                          <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-7"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-6"></span>
                          <span className="placeholder col-8"></span>
                        </p>
                        <a
                          className="btn btn-primary disabled placeholder col-6"
                          aria-disabled="true"
                        ></a>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              // Hiển thị danh sách sản phẩm nổi bật
              latestProducts.map((product) => (
                <ProductCard col={3} key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
  
        {/* Sản phẩm bán chạy */}
        <div className="container mt-5 text-start">
          <h3 className="product-title">Sản Phẩm Bán Chạy</h3>
          <div className="row featured-products">
            {bestSellingProducts.length === 0 ? (
              <p>Hiện chưa có sản phẩm bán chạy.</p>
            ) : (
              // Hiển thị danh sách sản phẩm bán chạy
              bestSellingProducts.map((product) => (
                <ProductCard col={3} key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
  
        {/* Sản phẩm xem nhiều */}
        <div className="container mt-5 text-start">
          <h3 className="product-title">Sản Phẩm Xem Nhiều</h3>
          <div className="row featured-products">
            {products.length === 0 ? (
              // Hiển thị placeholder khi chưa tải sản phẩm
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="col-3" key={index}>
                    <div className="card" aria-hidden="true">
                      <img src="" className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title placeholder-glow">
                          <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-7"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-6"></span>
                          <span className="placeholder col-8"></span>
                        </p>
                        <a
                          className="btn btn-primary disabled placeholder col-6"
                          aria-disabled="true"
                        ></a>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              // Hiển thị danh sách sản phẩm được xem nhiều nhất
              products
                .sort((a, b) => b.views - a.views) // Sắp xếp sản phẩm theo lượt xem giảm dần
                .slice(0, 4) // Lấy 4 sản phẩm đầu tiên
                .map((product) => (
                  <ProductCard col={3} key={product._id} product={product} />
                ))
            )}
          </div>
        </div>
      </>
    );
