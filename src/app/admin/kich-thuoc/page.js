"use client";
import {
  deleteSize,
  getAllSizes,
  insertSize,
  updateSize,
} from "@/app/databases/size"; // Thay đổi import từ màu sắc sang kích thước
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Sizes() {
  const [listSizes, setListSizes] = useState([]);
  const [sizeSelected, setSizeSelected] = useState(null);
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

  const fetchSize = async () => {
    const result = await getAllSizes(); // Gọi hàm lấy tất cả kích thước
    setListSizes(result);
  };

  useEffect(() => {
    fetchSize();
  }, []);

  const handleUpdate = async (data) => {
    setValueUpdate("name", data.name);
    setValueUpdate("value", data.value); // Giả sử bạn có trường giá trị cho kích thước
    setSizeSelected(data);
  };
  const handleDelete = async (data) => {
    setSizeSelected(data);
    console.log(sizeSelected);
  };

  const onSubmit = async (data) => {
    try {
      const result = await insertSize(data); // Thay đổi hàm chèn màu sắc thành chèn kích thước
      await fetchSize();
      resetInsert(); // Đặt lại form sau khi gửi thành công
      const modal = document.getElementById("insertSize");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    } catch (error) {}
  };

  const onSubmitUpdate = async (data) => {
    try {
      const result = await updateSize(sizeSelected._id, data); // Thay đổi hàm cập nhật màu sắc thành cập nhật kích thước
      await fetchSize();
      resetUpdate(); // Đặt lại form sau khi gửi thành công
      const modal = document.getElementById("updateSize");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    } catch (error) {
      throw new Error(error);
    }
  };
  const onSubmitDelete = async () => {
    if (sizeSelected) {
      try {
        await deleteSize(sizeSelected._id);
        await fetchSize(); // Cập nhật lại danh sách
        const modal = document.getElementById("deleteSize");
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
              <b>Danh sách kích thước</b>
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
                    data-bs-target="#insertSize"
                  >
                    <i className="bi bi-plus" />
                    Thêm kích thước
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
                    <th width={300}>ID</th>
                    <th width={250}>Tên</th>
                    <th width={150}>Giá trị</th>{" "}
                    {/* Trường giá trị cho kích thước */}
                    <th width={100}>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {listSizes.map((size, index) => (
                    <tr key={index}>
                      <td>{size._id}</td> {/* ID của kích thước */}
                      <td>{size.name}</td>
                      <td>{size.value}</td> {/* Giá trị của kích thước */}
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          style={{ width: "20px", margin: "5px" }}
                          data-bs-toggle="modal"
                          data-bs-target="#deleteSize"
                          onClick={() => handleDelete(size)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                        <button
                          className="btn btn-primary btn-sm edit"
                          type="button"
                          title="Sửa"
                          style={{ width: "20px", margin: "5px" }}
                          data-bs-toggle="modal"
                          data-bs-target="#updateSize"
                          onClick={() => handleUpdate(size)}
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

      {/* Modal Thêm Kích Thước */}
      <div
        className="modal fade"
        id="insertSize"
        tabIndex="-1"
        aria-labelledby="insertSizeLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="insertSizeLabel">
                Thêm kích thước
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
                    id="sizeName"
                    placeholder="Tên kích thước"
                    {...registerInsert("name", { required: true })}
                  />
                  <label htmlFor="sizeName">Tên kích thước</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="sizeValue"
                    placeholder="Giá trị kích thước"
                    {...registerInsert("value", { required: true })}
                  />
                  <label htmlFor="sizeValue">Giá trị kích thước</label>
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

      {/* Modal Cập Nhật Kích Thước */}
      <div
        className="modal fade"
        id="updateSize"
        tabIndex="-1"
        aria-labelledby="updateSizeLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="updateSizeLabel">
                Cập nhật kích thước
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
                    id="sizeNameUpdate"
                    placeholder="Tên kích thước"
                    {...registerUpdate("name", { required: true })}
                  />
                  <label htmlFor="sizeNameUpdate">Tên kích thước</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="sizeValueUpdate"
                    placeholder="Giá trị kích thước"
                    {...registerUpdate("value", { required: true })}
                  />
                  <label htmlFor="sizeValueUpdate">Giá trị kích thước</label>
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
        id="deleteSize"
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
              <p>Bạn có chắc chắn muốn xóa kích thước này không?</p>
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
