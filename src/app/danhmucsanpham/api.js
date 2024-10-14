const express = require('express');
const app = express();
const port = 3000;

// Dữ liệu mẫu
const categories = [
  { id: 1, name: "ÁO THUN - T SHIRT" },
  { id: 2, name: "QUẦN - PANTS" },
  { id: 3, name: "ÁO KHOÁC - HOODIE" },
  { id: 4, name: "PHỤ KIỆN - ACCESSORY" }
];

const products = [
  { id: 1, name: "Sản phẩm 1", price: 250000, originalPrice: 300000, image: "/images/sp1.jpg", categoryId: 1, createdAt: "2024-10-01" },
  { id: 2, name: "Sản phẩm 2", price: 180000, originalPrice: 220000, image: "/images/sp2.jpg", categoryId: 2, createdAt: "2024-10-02" },
  { id: 3, name: "Sản phẩm 3", price: 350000, originalPrice: 400000, image: "/images/sp3.jpg", categoryId: 3, createdAt: "2024-10-03" },
  { id: 4, name: "Sản phẩm 4", price: 120000, originalPrice: 150000, image: "/images/sp4.jpg", categoryId: 4, createdAt: "2024-10-04" },
  { id: 5, name: "Sản phẩm 5", price: 280000, originalPrice: 320000, image: "/images/sp5.jpg", categoryId: 1, createdAt: "2024-10-05" },
  { id: 6, name: "Sản phẩm 6", price: 200000, originalPrice: 240000, image: "/images/sp6.jpg", categoryId: 2, createdAt: "2024-10-06" },
  { id: 7, name: "Sản phẩm 7", price: 400000, originalPrice: 450000, image: "/images/sp7.jpg", categoryId: 3, createdAt: "2024-10-07" },
  { id: 8, name: "Sản phẩm 8", price: 150000, originalPrice: 180000, image: "/images/sp8.jpg", categoryId: 4, createdAt: "2024-10-08" },
];

// Middleware để parse JSON body
app.use(express.json());

// GET /categories - Lấy tất cả danh mục
app.get('/categories', (req, res) => {
  res.json(categories);
});

// GET /products - Lấy tất cả sản phẩm với các tùy chọn lọc và sắp xếp
app.get('/products', (req, res) => {
  const { categoryId, sortBy } = req.query;
  let filteredProducts = [...products];

  // Lọc theo danh mục
  if (categoryId) {
    filteredProducts = filteredProducts.filter(product => product.categoryId === parseInt(categoryId));
  }

  // Sắp xếp
  if (sortBy) {
    switch (sortBy) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
  }

  res.json(filteredProducts);
});

// GET /products/:id - Lấy chi tiết một sản phẩm
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`API đang chạy tại http://localhost:${port}`);
});