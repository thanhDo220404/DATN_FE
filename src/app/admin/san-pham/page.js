"use client";
import Pagination from "@/app/components/pagination";
import { deleteProduct, getAllProducts } from "@/app/databases/products";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [listProducts, setListProducts] = useState([]);
  const [productSelected, setProductSelected] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchProducts = async () => {
    const result = await getAllProducts();
    setListProducts(result);
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleDelete = async (data) => {
    setProductSelected(data);
  };
  const onSubmitDelete = async () => {
    if (productSelected) {
      try {
        await deleteProduct(productSelected._id);
        await fetchProducts(); // Cập nhật lại danh sách
        const modal = document.getElementById("deleteProduct");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide(); // Đóng modal
      } catch (error) {
        console.error("Xóa sản phẩm thất bại:", error);
      }
    }
  };
  const handleReplaceUpdate = (id) => {
    window.location.href = `/admin/san-pham/sua/${id}`;
  };

  const paginatedProducts = listProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(listProducts.length / itemsPerPage);
  return (
    <>
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
                  {listProducts && listProducts.length > 0 ? (
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
                      <td colSpan="9" style={{ textAlign: "center" }}>
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
