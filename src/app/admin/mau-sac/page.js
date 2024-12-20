"use client";
import {
  deleteColor,
  getAllColors,
  insertColor,
  updateColor,
} from "@/app/databases/color";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Colors() {
  const [listColors, setListColors] = useState([]);
  const [colorSelected, setColorSelected] = useState(null);
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
  const fetchColor = async () => {
    const result = await getAllColors();
    setListColors(result);
  };
  useEffect(() => {
    fetchColor();
  }, []);
  const handleUpdate = async (data) => {
    setValueUpdate("name", data.name);
    setValueUpdate("hexCode", data.hexCode);
    setColorSelected(data);
  };
  const handleDelete = async (data) => {
    setColorSelected(data);
  };

  const onSubmit = async (data) => {
    try {
      const result = await insertColor(data);
      await fetchColor();
      resetInsert(); // Đặt lại form sau khi gửi thành công
      // Đóng modal xóa
      const modal = document.getElementById("insertColor");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    } catch (error) {}
  };
  const onSubmitUpdate = async (data) => {
    try {
      const result = await updateColor(colorSelected._id, data);
      await fetchColor();
      resetUpdate(); // Đặt lại form sau khi gửi thành công
      // Đóng modal xóa
      const modal = document.getElementById("updateColor");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    } catch (error) {
      throw new Error(error);
    }
  };
  const onSubmitDelete = async () => {
    if (colorSelected) {
      try {
        await deleteColor(colorSelected._id);
        await fetchColor(); // Cập nhật lại danh sách
        const modal = document.getElementById("deleteColor");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide(); // Đóng modal
      } catch (error) {
        console.error("Xóa màu thất bại:", error);
      }
    }
  };
  return (
    <>
      {/* nội dung */}
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách màu sắc</b>
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
                    data-bs-target="#insertColor"
                  >
                    <i className="bi bi-plus" />
                    Thêm màu sắc
                  </a>
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
                    <th width={300}>ID</th>
                    <th width={250}>Tên</th>
                    <th width={50}>Mã HEX</th>
                    <th width={150}></th>
                    <th width={100}>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {listColors.map((color, index) => (
                    <tr key={index}>
                      <td>{color._id}</td> {/* ID của màu sắc */}
                      <td>{color.name}</td>
                      <td>{color.hexCode}</td> {/* Mã HEX */}
                      <td>
                        <div
                          className="w-100 h-100 d-flex justify-content-center align-items-center"
                          style={{ height: "150px", width: "100%" }}
                        >
                          <div
                            className="w-100 h-100"
                            style={{
                              background: color.hexCode,
                              color: color.hexCode,
                            }}
                          >
                            .
                          </div>
                        </div>
                      </td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          style={{ width: "20px", margin: "5px" }}
                          data-bs-toggle="modal"
                          data-bs-target="#deleteColor"
                          onClick={() => handleDelete(color)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                        <button
                          className="btn btn-primary btn-sm edit"
                          type="button"
                          title="Sửa"
                          style={{ width: "20px", margin: "5px" }}
                          data-bs-toggle="modal"
                          data-bs-target="#updateColor"
                          onClick={() => handleUpdate(color)}
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

      {/* <!-- Modal insert --> */}
      <div
        className="modal fade"
        id="insertColor"
        tabIndex="-1"
        aria-labelledby="insertColorLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="insertColorLabel">
                Thêm màu sắc
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
                    id="colorName"
                    placeholder="Tên màu"
                    {...registerInsert("name", { required: true })}
                  />
                  <label htmlFor="colorName">Tên màu</label>
                </div>
                <div className="form-floating">
                  <input
                    type="color"
                    className="form-control"
                    id="colorCode"
                    placeholder="Mã màu"
                    {...registerInsert("hexCode", { required: true })}
                  />
                  <label htmlFor="colorCode">Mã màu</label>
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
      {/* <!-- Modal update --> */}
      <div
        className="modal fade"
        id="updateColor"
        tabIndex="-1"
        aria-labelledby="updateColorLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="insertColorLabel">
                Chỉnh sửa
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
                    id="colorName"
                    placeholder="Tên màu"
                    {...registerUpdate("name", { required: true })}
                  />
                  <label htmlFor="colorName">Tên màu</label>
                </div>
                <div className="form-floating">
                  <input
                    type="color"
                    className="form-control"
                    id="colorCode"
                    placeholder="Mã màu"
                    {...registerUpdate("hexCode", { required: true })}
                  />
                  <label htmlFor="colorCode">Mã màu</label>
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
        id="deleteColor"
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
              <p>Bạn có chắc chắn muốn xóa màu này không?</p>
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
