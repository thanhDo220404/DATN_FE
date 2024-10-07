import React from 'react';

export default function ProductCategoryPage() {
  // Dữ liệu sản phẩm mô phỏng
  const products = Array(12).fill(null).map((_, index) => ({
    id: index + 1,
    name: `Sản phẩm ${index + 1}`,
    price: 199000,
    originalPrice: 299000,
    image: `/images/sp${(index % 8) + 1}.jpg`,
  }));

  return (
    <div className="container mt-5">
      {/* Tiêu đề Danh mục */}
      <h1 className="mb-4">Tên Danh Mục</h1>

      {/* Bộ lọc và Sắp xếp */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <select className="form-select">
            <option>Lọc theo</option>
            <option>Giá: Thấp đến Cao</option>
            <option>Giá: Cao đến Thấp</option>
            <option>Mới nhất</option>
          </select>
        </div>
        <div>
          <span>{products.length} sản phẩm</span>
        </div>
      </div>

      {/* Lưới Sản phẩm */}
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  {product.price.toLocaleString()}đ{' '}
                  <del>{product.originalPrice.toLocaleString()}đ</del>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    XEM CHI TIẾT
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <nav aria-label="Điều hướng trang" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Trước</a>
          </li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Sau</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}