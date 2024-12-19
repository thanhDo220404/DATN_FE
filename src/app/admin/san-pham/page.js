"use client";
import Pagination from "@/app/components/pagination";
import { deleteProduct, getAllProducts } from "@/app/databases/products";
import { getAllVouchers } from "@/app/databases/voucher"; // Ensure you have this import
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

export default function Products() {
  const [listProducts, setListProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [productSelected, setProductSelected] = useState(null);
  const [vouchers, setVouchers] = useState([]); // State for vouchers
  const [error, setError] = useState(null); // State for error
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch all products without query for client-side filtering
  const fetchProducts = async () => {
    try {
      const result = await getAllProducts(); // Ensure getAllProducts fetches all products without filtering
      setListProducts(result);
      setFilteredProducts(result); // Initialize filtered products
    } catch (err) {
      setError("Đã xảy ra lỗi khi lấy danh sách sản phẩm.");
      toast.error("Đã xảy ra lỗi khi lấy danh sách sản phẩm.");
    }
  };

  const fetchVouchers = async () => {
    try {
      const fetchedVouchers = await getAllVouchers();
      const currentDate = new Date();

      // Lọc chỉ những voucher hoạt động và chưa hết hạn
      const activeVouchers = fetchedVouchers.filter(voucher => 
        voucher.isActive && new Date(voucher.expiryDate) >= currentDate
      );

      setVouchers(activeVouchers);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      setError("Đã có lỗi xảy ra khi tải voucher.");
      toast.error("Đã có lỗi xảy ra khi tải voucher.");
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  useEffect(() => {
    fetchProducts();
    fetchVouchers(); // Gọi hàm fetchVouchers khi component mount
  }, []);

  useEffect(() => {
    // Filter products based on searchQuery
    if (searchQuery.trim() === '') {
      setFilteredProducts(listProducts);
    } else {
      const filtered = listProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      setCurrentPage(1); // Reset to first page on new search
    }
  }, [searchQuery, listProducts]);

  const handleDelete = async (data) => {
    setProductSelected(data);
  };

  const onSubmitDelete = async () => {
    if (productSelected) {
      // Thêm kiểm tra tổng số lượng sản phẩm
      const totalQuantity = listProducts.find(
        (product) => product._id === productSelected._id
      )?.items.reduce((sum, item) => sum + item.variations.reduce((s, v) => s + v.quantity, 0), 0) || 0;

      if (totalQuantity >= 1) {
        toast.error('Không thể xóa sản phẩm khi còn số lượng lớn hơn hoặc bằng 1.');
        return;
      }

      try {
        await deleteProduct(productSelected._id);
        await fetchProducts(); // Cập nhật lại danh sách
        const modal = document.getElementById("deleteProduct");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide(); // Đóng modal
        toast.success('Xóa sản phẩm thành công.');
      } catch (error) {
        console.error("Xóa sản phẩm thất bại:", error);
        toast.error('Xóa sản phẩm thất bại.');
      }
    }
  };

  const handleReplaceUpdate = (id) => {
    window.location.href = `/admin/san-pham/sua/${id}`;
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <>
      {/* Thêm ToastContainer để hiển thị thông báo */}
      <ToastContainer />
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách sản phẩm</b>
            </a>
          </li>
        </ul>
        <div id="clock" />
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <Link
                    className="btn btn-add btn-sm"
                    href="/admin/san-pham/them"
                    title="Thêm"
                  >
                    <i className="bi bi-plus" />
                    Thêm sản phẩm
                  </Link>
                </div>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm sản phẩm"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <table
                className="table table-hover table-bordered js-copytextarea"
                cellPadding={0}
                cellSpacing={0}
                border={0}
                id="sampleTable"
              >
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Ảnh</th>
                    <th>Số lượng</th>
                    <th>Tình trạng</th>
                    <th>Giá tiền</th>
                    <th>Danh mục</th>
                    <th width={100}>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts && filteredProducts.length > 0 ? (
                    paginatedProducts.map((product) => {
                      // Lấy item đầu tiên và tổng số lượng variations
                      const firstItem =
                        product.items.length > 0 ? product.items[0] : null;
                      const totalQuantity = product.items.reduce(
                        (total, item) => {
                          const variationsTotal = item.variations.reduce(
                            (sum, variation) => sum + variation.quantity,
                            0
                          );
                          return total + variationsTotal;
                        },
                        0
                      );

                      return (
                        <tr key={product._id}>
                          <td>{product.name}</td>
                          <td>
                            {firstItem && (
                              <img
                                className="img-card-products"
                                src={firstItem.image.mediaFilePath} // Hình ảnh đầu tiên
                                alt={product.name}
                              />
                            )}
                          </td>
                          <td>{totalQuantity}</td> {/* Tổng số lượng */}
                          <td>
                            <span
                              className={`badge ${
                                totalQuantity > 0 ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {totalQuantity > 0 ? "Còn hàng" : "Hết hàng"}
                            </span>
                          </td>
                          <td>
                            {firstItem && formatCurrency(firstItem.price)}
                          </td>
                          <td>{product.category.categoryName}</td>
                          <td className="table-td-center">
                            <button
                              className="btn btn-primary btn-sm trash"
                              type="button"
                              title="Xóa"
                              style={{ width: "20px", margin: "5px" }}
                              data-bs-toggle="modal"
                              data-bs-target="#deleteProduct"
                              onClick={() => handleDelete(product)}
                              disabled={totalQuantity >= 1} // Vô hiệu hóa nút "Xóa" khi số lượng >= 1
                              title={totalQuantity >= 1 ? "Không thể xoá sản phẩm còn tồn kho" : "Xóa sản phẩm"}
                            >
                              <i className="bi bi-trash" />
                            </button>
                            <button
                              className="btn btn-primary btn-sm edit"
                              type="button"
                              title="Sửa"
                              id="show-emp"
                              style={{ width: "20px", margin: "5px" }}
                              onClick={() => handleReplaceUpdate(product._id)}
                            >
                              <i className="bi bi-pencil" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center" }}>
                        Không có sản phẩm nào
                      </td>
                    </tr>
                  )}
                </tbody>
                {/* <tfoot>
                  <tr>
                    <th>Tên</th>
                    <th>Ảnh</th>
                    <th>Số lượng</th>
                    <th>Tình trạng</th>
                    <th>Giá tiền</th>
                    <th>Danh mục</th>
                    <th width={100}>Tính năng</th>
                  </tr>
                </tfoot> */}
              </table>
              <div className="row element-button">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal xác nhận xóa */}
      <div
        className="modal fade"
        id="deleteProduct"
        tabIndex="-1"
        aria-labelledby="deleteColorLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="deleteColorLabel">
                Xác nhận xóa
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onSubmitDelete}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}