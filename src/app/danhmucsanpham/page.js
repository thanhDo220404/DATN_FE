"use client";

import React, { useState, useEffect } from 'react';

export default function ProductCategoryPage() {
  const categories = [
    { id: 1, name: "ÁO THUN - T SHIRT" },
    { id: 2, name: "QUẦN - PANTS" },
    { id: 3, name: "ÁO KHOÁC - HOODIE" },
    { id: 4, name: "PHỤ KIỆN - ACCESSORY" }
  ];

  const allProducts = [
    { id: 1, name: "Sản phẩm 1", price: 250000, originalPrice: 300000, image: "/images/sp1.jpg", categoryId: 1, createdAt: new Date(2024, 9, 1) },
    { id: 2, name: "Sản phẩm 2", price: 180000, originalPrice: 220000, image: "/images/sp2.jpg", categoryId: 2, createdAt: new Date(2024, 9, 2) },
    { id: 3, name: "Sản phẩm 3", price: 350000, originalPrice: 400000, image: "/images/sp3.jpg", categoryId: 3, createdAt: new Date(2024, 9, 3) },
    { id: 4, name: "Sản phẩm 4", price: 120000, originalPrice: 150000, image: "/images/sp4.jpg", categoryId: 4, createdAt: new Date(2024, 9, 4) },
    { id: 5, name: "Sản phẩm 5", price: 280000, originalPrice: 320000, image: "/images/sp5.jpg", categoryId: 1, createdAt: new Date(2024, 9, 5) },
    { id: 6, name: "Sản phẩm 6", price: 200000, originalPrice: 240000, image: "/images/sp6.jpg", categoryId: 2, createdAt: new Date(2024, 9, 6) },
    { id: 7, name: "Sản phẩm 7", price: 400000, originalPrice: 450000, image: "/images/sp7.jpg", categoryId: 3, createdAt: new Date(2024, 9, 7) },
    { id: 8, name: "Sản phẩm 8", price: 150000, originalPrice: 180000, image: "/images/sp8.jpg", categoryId: 4, createdAt: new Date(2024, 9, 8) },
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
      <h1 className="mb-4">Danh Mục Sản Phẩm</h1>

      <div className="mb-4">
        <button 
          className={`btn ${!selectedCategory ? 'btn-primary' : 'btn-outline-primary'} me-2`}
          onClick={() => handleCategoryChange(null)}
        >
          Tất cả
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline-primary'} me-2`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <select className="form-select" value={sortOption} onChange={handleSortChange}>
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
                <p className="card-text">
                  Danh mục: {categories.find(c => c.id === product.categoryId).name}
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