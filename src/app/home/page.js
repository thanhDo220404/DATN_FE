import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../globals.css";

export default function Home() {
  return (
    <>
      {/* slide */}
      <div
        className="carousel slide"
        data-bs-ride="carousel"
        id="carouselExampleInterval"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              alt="First slide"
              className="d-block w-100"
              src="./images/slider_1.jpg"
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              alt="Second slide"
              className="d-block w-100"
              src="./images/slider_2.jpg"
            />
          </div>
          <div className="carousel-item">
            <img
              alt="Third slide"
              className="d-block w-100"
              src="./images/slider_3.jpg"
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

      {/* product-category */}
      <div className="container mt-5">
        <div className="row product-category">
          <div className="col-md-3">
            <div className="card text-bg-dark">
              <img alt="T-Shirt" className="card-img" src="./images/dm_1.jpg" />
              <div className="card-img-overlay">
                <h5 className="card-title">T-SHIRT</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-bg-dark">
              <img alt="Pants" className="card-img" src="./images/dm_2.jpg" />
              <div className="card-img-overlay">
                <h5 className="card-title">PANTS</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-bg-dark">
              <img alt="Hoodie" className="card-img" src="./images/dm_3.jpg" />
              <div className="card-img-overlay">
                <h5 className="card-title">HOODIE</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-bg-dark">
              <img
                alt="Sport"
                className="card-img"
                src="./images/dm_4.jpg"
              />
              <div className="card-img-overlay">
                <h5 className="card-title">SPORT</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* featured-products */}
      <div className="container mt-5">
        <h3 className="product-title">Sản Phẩm Nổi Bật</h3>
        <div className="row featured-products">
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 1"
                className="card-img-top"
                src="./images/sp1.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  249.000đ <del>349.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 2"
                className="card-img-top"
                src="./images/sp2.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  199.000đ <del>299.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 3"
                className="card-img-top"
                src="./images/sp3.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  199.000đ <del>299.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 4"
                className="card-img-top"
                src="./images/sp4.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  199.000đ <del>299.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ----------- */}
        <div className="row featured-products">
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 1"
                className="card-img-top"
                src="./images/sp5.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  249.000đ <del>349.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 2"
                className="card-img-top"
                src="./images/sp6.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  199.000đ <del>299.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 3"
                className="card-img-top"
                src="./images/sp7.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  199.000đ <del>299.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 4"
                className="card-img-top"
                src="./images/sp8.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  199.000đ <del>299.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thẻ Sản Phẩm */}
      <div className="container mt-5">
        <div className="cardt mb-3">
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
                src="./images/sp_the.png"
              />
            </div>
          </div>
        </div>
      </div>

       {/* sell-products */}
       <div className="container mt-5">
        <h3 className="product-title">Sản Phẩm Bán Chạy</h3>
        <div className="row featured-products">
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 1"
                className="card-img-top"
                src="./images/sp9.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  249.000đ <del>349.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 2"
                className="card-img-top"
                src="./images/sp8.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  199.000đ <del>299.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 3"
                className="card-img-top"
                src="./images/sp7.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  199.000đ <del>299.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 4"
                className="card-img-top"
                src="./images/sp6.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  199.000đ <del>299.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ----------- */}
        <div className="row featured-products">
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 1"
                className="card-img-top"
                src="./images/sp5.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  249.000đ <del>349.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 2"
                className="card-img-top"
                src="./images/sp4.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  199.000đ <del>299.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 3"
                className="card-img-top"
                src="./images/sp3.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  199.000đ <del>299.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img
                alt="Product 4"
                className="card-img-top"
                src="./images/sp2.jpg"
              />
              <div className="card-body">
                <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                <p className="card-text">
                  199.000đ <del>299.000đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="/bootstrap/js/bootstrap.bundle.js"></script>
    </>
  );
}
