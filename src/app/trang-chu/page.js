"use client";
import "@/app/san-pham/style.css";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import { getAllProducts } from "../databases/products";
import { getAllCategories } from "../databases/categories";
import { getAllOrders } from "../databases/order";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);

  useEffect(() => {
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/6762e22349e2fd8dfef9e0a4/1ifd46nam";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []); // Chỉ chạy một lần sau khi component được mount

  const fetchProducts = async () => {
    const result = await getAllProducts();
    setProducts(result);
    console.log("this is fetchProducts: ", result);
  };
  const fetchCategories = async () => {
    const result = await getAllCategories();
    setCategories(result);
  };
  const fetchOrders = async () => {
    const result = await getAllOrders();
    setOrders(result);
    console.log("this is fetchOrders: ", result);
    const bestSeller = getTopPurchasedProducts(result);
    console.log("this is bestSeller: ", bestSeller);
  };
  function getTopPurchasedProducts(orders, limit = 4) {
    const productCounts = {};

    orders.forEach((order) => {
      // Kiểm tra nếu order_status._id khác '6724f9c943ad843da1d31150' tức đơn hàng "bị hủy"
      if (
        order.order_status &&
        order.order_status._id !== "6724f9c943ad843da1d31150"
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
      .slice(0, limit); // Giới hạn số lượng theo limit

    // Trả về danh sách chứa cả productId và productCount
    return sortedProducts.map(([productId, count]) => ({
      productId,
      count,
    }));
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchOrders();
  }, []);
  // Effect hook to calculate best-selling products once products and orders are fetched
  useEffect(() => {
    if (products.length > 0 && orders.length > 0) {
      const bestSellers = getTopPurchasedProducts(orders); // Gồm cả productId và count
      const bestSellerIds = bestSellers.map((seller) => seller.productId); // Chỉ lấy productId

      // Lọc các sản phẩm bán chạy từ mảng products
      const bestSelling = products.filter((product) =>
        bestSellerIds.includes(product._id)
      );

      // Sắp xếp bestSelling theo thứ tự giống bestSellerIds
      const sortedBestSelling = bestSelling.sort((a, b) => {
        return bestSellerIds.indexOf(a._id) - bestSellerIds.indexOf(b._id);
      });

      setBestSellingProducts(sortedBestSelling);
    }
  }, [products, orders]); // Re-run this when either products or orders changes

  console.log(bestSellingProducts);

  const latestProducts = products
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <>
      <ToastContainer></ToastContainer>
      {/* Carousel */}
      <div
        className="carousel slide mt-0"
        data-bs-ride="carousel"
        id="carouselExampleInterval"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              alt="First slide"
              className="d-block w-100"
              src="/images/slider_1.jpg"
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              alt="Second slide"
              className="d-block w-100"
              src="/images/slider_2.jpg"
            />
          </div>
          <div className="carousel-item">
            <img
              alt="Third slide"
              className="d-block w-100"
              src="/images/slider_3.jpg"
            />
          </div>
        </div>
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

      {/* Product Categories */}
      <div className="container mt-5">
        <div className="row product-category">
          {categories.slice(0, 4).map((category, index) => {
            // Tìm sản phẩm đầu tiên có category._id trùng với category._id hiện tại
            const productInCategory = products.find(
              (product) => product.category._id === category._id
            );
            // Đặt đường dẫn hình ảnh nếu tìm thấy sản phẩm, nếu không sẽ là hình mặc định
            const imageSrc =
              productInCategory &&
              productInCategory.items[0].image.mediaFilePath
                ? productInCategory.items[0].image.mediaFilePath
                : `/images/dm_${index + 1}.jpg`;

            return (
              <div className="col-md-3" key={category._id}>
                <Link
                  href={`/danh-muc/${category._id}`}
                  className="card text-bg-dark"
                >
                  <img
                    alt={category.name}
                    className="card-img"
                    src={imageSrc} // Hiển thị hình ảnh lấy được
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

      {/* Featured Products */}
      <div className="container mt-5 text-start">
        <h3 className="product-title">Sản Phẩm Mới</h3>

        <div className="row featured-products">
          {products.length === 0 ? (
            // Hiển thị 3 placeholder khi không có sản phẩm
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
            // Hiển thị danh sách sản phẩm khi đã tải
            latestProducts.map((product) => (
              <ProductCard col={3} key={product._id} product={product} />
            ))
          )}
        </div>
      </div>

      {/* Product Highlight */}
      {/* <div className="container mt-5">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">
                  Vòng Cổ Bạc Nữ Đính Đá CZ Hình Bông Hoa Hướng Dương
                </h5>
                <p className="card-text">
                  399.000đ <del>499.000đ</del>
                </p>
                <p className="card-text">
                  Chịu trách nhiệm đảm bảo sản phẩm đạt tiêu chuẩn chất lượng.
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning btn-custom">
                    MUA NGAY
                  </button>
                  <button className="btn btn-outline-secondary btn-custom">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <img
                alt="Vòng Cổ Bạc Nữ Đính Đá"
                className="img-fluid rounded-start"
                src="/images/sp_the.png"
              />
            </div>
          </div>
        </div>
      </div> */}

      {/* Best Selling Products */}
      <div className="container mt-5 text-start">
        <h3 className="product-title">Sản Phẩm Bán Chạy</h3>
        <div className="row featured-products">
          {bestSellingProducts.length === 0 ? (
            <p>Hiện chưa có sản phẩm bán chạy.</p>
          ) : (
            bestSellingProducts.map((product) => (
              <ProductCard col={3} key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
      <div className="container mt-5 text-start">
        <h3 className="product-title">Sản Phẩm Xem Nhiều</h3>

        <div className="row featured-products">
          {products.length === 0 ? (
            // Hiển thị 4 placeholder khi không có sản phẩm
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
            // Hiển thị danh sách sản phẩm có view cao nhất
            products
              .sort((a, b) => b.view - a.view) // Sắp xếp sản phẩm theo lượt xem từ cao đến thấp
              .slice(0, 4) // Lấy 4 sản phẩm đầu tiên
              .map((product) => (
                <ProductCard col={3} key={product._id} product={product} />
              ))
          )}
        </div>
      </div>
    </>
  );
}
