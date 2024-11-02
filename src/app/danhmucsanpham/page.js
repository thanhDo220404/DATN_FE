"use client";

import React, { useState, useEffect } from 'react';

export default function ProductCategoryPage() {
  const categories = [
    { id: 1, name: "ÁO THUN" },
    { id: 2, name: "QUẦN SHORT" },
    { id: 3, name: "QUẦN JEAN" },
    { id: 4, name: "QUẦN TÂY" },
    { id: 5, name: "ÁO KHOÁC" },
    { id: 6, name: "ÁO POLO" },
    { id: 7, name: "ÁO SƠ MI" },
    { id: 8, name: "ÁO VEST" },
    { id: 9, name: "PHỤ KIỆN" }
  ];

  const allProducts = [
    { id: 1, name: "Sản phẩm 1", price: 250000, originalPrice: 300000, image: "/images/sp1.jpg", categoryId: 1, createdAt: new Date(2024, 9, 1) },
    { id: 2, name: "Sản phẩm 2", price: 180000, originalPrice: 220000, image: "/images/sp2.jpg", categoryId: 2, createdAt: new Date(2024, 9, 2) },
    { id: 3, name: "Sản phẩm 3", price: 350000, originalPrice: 400000, image: "/images/sp3.jpg", categoryId: 3, createdAt: new Date(2024, 9, 3) },
    { id: 4, name: "Sản phẩm 4", price: 120000, originalPrice: 150000, image: "/images/sp4.jpg", categoryId: 4, createdAt: new Date(2024, 9, 4) },
    { id: 5, name: "Sản phẩm 5", price: 280000, originalPrice: 320000, image: "/images/sp5.jpg", categoryId: 5, createdAt: new Date(2024, 9, 5) },
    { id: 6, name: "Sản phẩm 6", price: 200000, originalPrice: 240000, image: "/images/sp6.jpg", categoryId: 6, createdAt: new Date(2024, 9, 6) },
    { id: 7, name: "Sản phẩm 7", price: 400000, originalPrice: 450000, image: "/images/sp7.jpg", categoryId: 7, createdAt: new Date(2024, 9, 7) },
    { id: 8, name: "Sản phẩm 8", price: 150000, originalPrice: 180000, image: "/images/sp8.jpg", categoryId: 8, createdAt: new Date(2024, 9, 8) },
    { id: 9, name: "Sản phẩm 9", price: 100000, originalPrice: 130000, image: "/images/sp9.jpg", categoryId: 9, createdAt: new Date(2024, 9, 9) }
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState(allProducts);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    let filteredProducts = selectedCategory
      ? allProducts.filter(product => product.categoryId === selectedCategory)
      : allProducts;

    switch (sortOption) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => b.createdAt - a.createdAt);
        break;
      default:
        break;
    }

    setProducts(filteredProducts);
  }, [selectedCategory, sortOption]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Danh Mục Sản Phẩm</h1>

      <div className="mb-4 d-flex flex-wrap justify-content-center">
        <button 
          className={`btn rounded-pill ${!selectedCategory ? 'btn-dark' : 'btn-outline-dark'} me-2 mb-2 px-4 py-2`}
          onClick={() => handleCategoryChange(null)}
        >
          Tất cả
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            className={`btn rounded-pill ${selectedCategory === category.id ? 'btn-dark' : 'btn-outline-dark'} me-2 mb-2 px-4 py-2`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <select className="form-select rounded-pill" value={sortOption} onChange={handleSortChange}>
            <option value="">Lọc theo</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="newest">Mới nhất</option>
          </select>
        </div>
        <div>
          <span>{products.length} sản phẩm</span>
        </div>
      </div>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top rounded-top-4"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between text-center">
                <h5 className="card-title text-truncate">{product.name}</h5>
                <p className="card-text text-success fw-bold">
                  {product.price.toLocaleString('vi-VN')}đ{' '}
                  <small className="text-muted"><del>{product.originalPrice.toLocaleString('vi-VN')}đ</del></small>
                </p>
                <p className="card-text">
                  <small className="text-muted">Danh mục: {categories.find(c => c.id === product.categoryId).name}</small>
                </p>
                <div className="d-flex justify-content-center gap-2 mt-3">
                  <button className="btn btn-warning rounded-pill px-3">MUA NGAY</button>
                  <button className="btn btn-outline-secondary rounded-pill px-3">
                    XEM CHI TIẾT
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
