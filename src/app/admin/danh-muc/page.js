"use client";
import {
  deleteCategory,
  getAllCategories,
  insertCategory,
  updateCategory,
} from "@/app/databases/categories"; // Thay đổi import sang danh mục
import { getAllProducts } from "@/app/databases/products";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

export default function Categories() {
  const [listCategories, setListCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const {
    register: registerInsert,
    handleSubmit: handleSubmitInsert,
    reset: resetInsert,
  } = useForm();
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    setValue: setValueUpdate,
    reset: resetUpdate,
  } = useForm();

  const fetchCategories = async () => {
    const result = await getAllCategories(); // Gọi hàm lấy tất cả danh mục
    setListCategories(result);
  };
  const fetchProductsByCateId = async (cateId) => {
    try {
      // Lấy toàn bộ sản phẩm
      const result = await getAllProducts();

      // Lọc sản phẩm theo cateId
      const filteredProducts = result.filter(
        (product) => product.category._id === cateId
      );
      return filteredProducts; // Trả về danh sách sản phẩm đã lọc
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm theo cateId:", error);
      return []; // Trả về mảng rỗng trong trường hợp lỗi
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUpdate = async (data) => {
    resetUpdate();
    setValueUpdate("name", data.name);
    setValueUpdate("description", data.description);
    setCategorySelected(data);
  };
  const handleDelete = async (data) => {
    setCategorySelected(data);
  };

  const onSubmit = async (data) => {
    try {
      // Kiểm tra trùng tên danh mục
      const isDuplicate = listCategories.some(
        (category) => category.name.toLowerCase() === data.name.toLowerCase()
      );
      if (isDuplicate) {
        // Hiển thị cảnh báo bằng toast
        toast.warning("Tên danh mục đã tồn tại!");
        return; // Dừng quá trình thêm mới
      }

      await insertCategory(data); // Thêm danh mục mới
      await fetchCategories(); // Tải lại danh sách danh mục
      resetInsert(); // Đặt lại form
      toast.success("Thêm thành công!"); // Thông báo thành công
      const modal = document.getElementById("insertCategory");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    } catch (error) {
      toast.error("Lỗi khi cập nhật danh mục");
      console.error("Lỗi khi thêm danh mục", error);
    }
  };

  const onSubmitUpdate = async (data) => {
    try {
      // Kiểm tra trùng tên danh mục (trừ danh mục đang chỉnh sửa)
      const isDuplicate = listCategories.some(
        (category) =>
          category.name.toLowerCase() === data.name.toLowerCase() &&
          category._id !== categorySelected._id
      );
      if (isDuplicate) {
        // Hiển thị cảnh báo bằng toast
        toast.warning("Tên danh mục đã tồn tại!");
        return; // Dừng quá trình cập nhật
      }

      await updateCategory(categorySelected._id, data); // Cập nhật danh mục
      await fetchCategories(); // Tải lại danh sách danh mục
      resetUpdate(); // Đặt lại form
      toast.success("Cập nhật thành công!"); // Thông báo thành công
      const modal = document.getElementById("updateCategory");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    } catch (error) {
      toast.error("Lỗi khi cập nhật danh mục");
      console.error("Lỗi khi cập nhật danh mục", error);
    }
  };

  const onSubmitDelete = async () => {
    if (categorySelected) {
      try {
        // Kiểm tra nếu danh mục có sản phẩm
        const products = await fetchProductsByCateId(categorySelected._id);

        if (products.length > 0) {
          // Nếu có sản phẩm, hiển thị toast và không xóa
          toast.error("Không thể xóa danh mục vì vẫn còn sản phẩm trong đó!");
          const modal = document.getElementById("deleteCategory");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          bootstrapModal.hide();
          return;
        }

        // Thực hiện xóa danh mục nếu không có sản phẩm
        await deleteCategory(categorySelected._id); // Gọi hàm xóa danh mục
        await fetchCategories(); // Tải lại danh sách danh mục
        toast.success("Xóa danh mục thành công!"); // Thông báo thành công

        // Đóng modal sau khi xóa
        const modal = document.getElementById("deleteCategory");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
      } catch (error) {
        // Hiển thị lỗi nếu xóa thất bại
        toast.error("Xóa thất bại!");
        console.error("Xóa thất bại:", error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách danh mục</b>
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
                  <a
                    className="btn btn-add btn-sm"
                    href="#"
                    title="Thêm"
                    data-bs-toggle="modal"
                    data-bs-target="#insertCategory"
                  >
                    <i className="bi bi-plus" />
                    Thêm danh mục
                  </a>
                </div>
                {/* Thêm các nút khác ở đây */}
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
                    <th>Mô tả</th>
                    {/* Trường trạng thái cho danh mục */}
                    <th width={150}>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {listCategories.map((category, index) => (
                    <tr key={index}>
                      <td>{category.name}</td>
                      <td>{category.description}</td> {/* Mô tả của danh mục */}
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          style={{ width: "20px", margin: "5px" }}
                          data-bs-toggle="modal"
                          data-bs-target="#deleteCategory"
                          onClick={() => handleDelete(category)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                        <button
                          className="btn btn-primary btn-sm edit"
                          type="button"
                          title="Sửa"
                          style={{ width: "20px", margin: "5px" }}
                          data-bs-toggle="modal"
                          data-bs-target="#updateCategory"
                          onClick={() => handleUpdate(category)}
                        >
                          <i className="bi bi-pencil" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Thêm Danh Mục */}
      <div
        className="modal fade"
        id="insertCategory"
        tabIndex="-1"
        aria-labelledby="insertCategoryLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-dark"
                id="insertCategoryLabel"
              >
                Thêm danh mục
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmitInsert(onSubmit)}>
              <div className="modal-body p-3">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    placeholder="Tên danh mục"
                    {...registerInsert("name", { required: true })}
                  />
                  <label htmlFor="categoryName">Tên danh mục</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="categoryDescription"
                    placeholder="Mô tả danh mục"
                    {...registerInsert("description", { required: true })}
                  />
                  <label htmlFor="categoryDescription">Mô tả danh mục</label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" className="btn btn-success">
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Cập Nhật Danh Mục */}
      <div
        className="modal fade"
        id="updateCategory"
        tabIndex="-1"
        aria-labelledby="updateCategoryLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-dark"
                id="updateCategoryLabel"
              >
                Cập nhật danh mục
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmitUpdate(onSubmitUpdate)}>
              <div className="modal-body p-3">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="categoryNameUpdate"
                    placeholder="Tên danh mục"
                    {...registerUpdate("name", { required: true })}
                  />
                  <label htmlFor="categoryNameUpdate">Tên danh mục</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="categoryDescriptionUpdate"
                    placeholder="Mô tả danh mục"
                    {...registerUpdate("description", { required: true })}
                  />
                  <label htmlFor="categoryDescriptionUpdate">
                    Mô tả danh mục
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" className="btn btn-success">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Modal xác nhận xóa */}
      <div
        className="modal fade"
        id="deleteCategory"
        tabIndex="-1"
        aria-labelledby="deleteCategoryLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-dark"
                id="deleteCategoryLabel"
              >
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
              <p>Bạn có chắc chắn muốn xóa danh mục này này không?</p>
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
