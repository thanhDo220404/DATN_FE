"use client";
import {
  deleteCategory,
  getAllCategories,
  insertCategory,
  updateCategory,
} from "@/app/databases/categories"; // Thay đổi import sang danh mục
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
  // Hàm để lấy tất cả danh mục con (đệ quy)
  const getAllChildCategories = (categoryId, categories) => {
    let childCategories = categories.filter(
      (category) => category.parent && category.parent.categoryId === categoryId
    );
    childCategories.forEach((child) => {
      childCategories = [
        ...childCategories,
        ...getAllChildCategories(child._id, categories),
      ];
    });
    return childCategories;
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUpdate = async (data) => {
    resetUpdate();
    setValueUpdate("name", data.name);
    setValueUpdate("description", data.description); // Giả sử bạn có trường mô tả cho danh mục
    setValueUpdate("status", data.status); // Trạng thái cho danh mục
    if (data.parent !== null) {
      setValueUpdate("parent", data.parent.categoryId); // Trạng thái cho danh mục
    }
    setCategorySelected(data);
  };
  const handleDelete = async (data) => {
    setCategorySelected(data);
  };

  const onSubmit = async (data) => {
    try {
      await insertCategory(data); // Thay đổi hàm chèn màu sắc thành chèn danh mục
      await fetchCategories();
      resetInsert(); // Đặt lại form sau khi gửi thành công
      const modal = document.getElementById("insertCategory");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
      // console.log(data);
    } catch (error) {
      console.error("Lỗi khi thêm danh mục", error);
    }
  };

  const onSubmitUpdate = async (data) => {
    try {
      await updateCategory(categorySelected._id, data); // Thay đổi hàm cập nhật danh mục
      await fetchCategories();
      resetUpdate(); // Đặt lại form sau khi gửi thành công
      const modal = document.getElementById("updateCategory");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    } catch (error) {
      throw new Error(error);
    }
    console.log("this is onSubmitUpdate", data);
  };
  const onSubmitDelete = async () => {
    if (categorySelected) {
      try {
        await deleteCategory(categorySelected._id);
        await fetchCategories(); // Cập nhật lại danh sách
        const modal = document.getElementById("deleteCategory");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide(); // Đóng modal
      } catch (error) {
        console.error("Xóa màu thất bại:", error);
      }
    }
  };

  return (
    <>
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
                    <th width={10}>
                      <input type="checkbox" id="all" />
                    </th>
                    <th width={300}>ID</th>
                    <th width={250}>Tên</th>
                    <th width={250}>Mô tả</th>
                    <th width={150}>Trạng thái</th>{" "}
                    {/* Trường trạng thái cho danh mục */}
                    <th width={100}>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {listCategories.map((category, index) => (
                    <tr key={index}>
                      <td width={10}>
                        <input
                          type="checkbox"
                          name={`check${index}`}
                          defaultValue={index}
                        />
                      </td>
                      <td>{category._id}</td> {/* ID của danh mục */}
                      <td>{category.name}</td>
                      <td>{category.description}</td> {/* Mô tả của danh mục */}
                      <td>
                        <span
                          className={`badge ${
                            category.status ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {category.status ? "Hoạt động" : "Không hoạt động"}
                        </span>
                      </td>
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
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="categoryStatus"
                    {...registerInsert("status", { required: true })}
                  >
                    <option value="true">Hoạt động</option>
                    <option value="false">Không hoạt động</option>
                  </select>
                  <label htmlFor="categoryStatus">Trạng thái danh mục</label>
                </div>
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="categoryParent"
                    {...registerInsert("parent")}
                  >
                    <option value="">Chọn danh mục cha</option>
                    {listCategories.map((parent) => (
                      <option key={parent._id} value={parent._id}>
                        {parent.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="categoryParent">Danh mục cha</label>
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
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="categoryStatusUpdate"
                    {...registerUpdate("status", { required: true })}
                  >
                    <option value="true">Hoạt động</option>
                    <option value="false">Không hoạt động</option>
                  </select>
                  <label htmlFor="categoryStatusUpdate">
                    Trạng thái danh mục
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="updateCategoryParent"
                    {...registerUpdate("parent")}
                  >
                    <option value="">Chọn danh mục cha</option>
                    {listCategories
                      .filter((parent) => {
                        // Kiểm tra xem categorySelected có tồn tại không
                        if (!categorySelected) return true;

                        // Lấy tất cả các danh mục con của categorySelected
                        const childCategories = getAllChildCategories(
                          categorySelected._id,
                          listCategories
                        );

                        // Loại bỏ danh mục hiện tại và tất cả danh mục con của nó
                        return (
                          parent._id !== categorySelected._id &&
                          !childCategories.some(
                            (child) => child._id === parent._id
                          )
                        );
                      })
                      .map((parent) => (
                        <option key={parent._id} value={parent._id}>
                          {parent.name}
                        </option>
                      ))}
                  </select>
                  <label htmlFor="updateCategoryParent">Danh mục cha</label>
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
