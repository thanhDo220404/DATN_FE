export default function danhmuc() {
  return (
    <>
      {/* nội dung */}
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
                  <a
                    className="btn btn-add btn-sm"
                    href="form-add-nhan-vien.html"
                    title="Thêm"
                  >
                    <i className="bi bi-plus" />
                    Thêm sản phẩm
                  </a>
                </div>
                <div className="col-sm-2">
                  <a
                    className="btn btn-delete btn-sm nhap-tu-file"
                    type="button"
                    title="Nhập"
                  >
                    <i className="bi bi-file-earmark-arrow-up" /> Tải từ file
                  </a>
                </div>
                <div className="col-sm-2">
                  <a
                    className="btn btn-delete btn-sm print-file"
                    type="button"
                    title="In"
                  >
                    <i className="bi bi-printer" /> In dữ liệu
                  </a>
                </div>
                <div className="col-sm-2">
                  <a
                    className="btn btn-delete btn-sm print-file js-textareacopybtn"
                    type="button"
                    title="Sao chép"
                  >
                    <i className="bi bi-clipboard" /> Sao chép
                  </a>
                </div>
                <div className="col-sm-2">
                  <a className="btn btn-excel btn-sm" href="" title="In">
                    <i className="bi bi-file-earmark-spreadsheet" /> Xuất Excel
                  </a>
                </div>
                <div className="col-sm-2">
                  <a
                    className="btn btn-delete btn-sm pdf-file"
                    type="button"
                    title="In"
                  >
                    <i className="bi bi-file-earmark-pdf" /> Xuất PDF
                  </a>
                </div>
                <div className="col-sm-2">
                  <a
                    className="btn btn-delete btn-sm"
                    type="button"
                    title="Xóa"
                  >
                    <i className="bi bi-trash" /> Xóa tất cả
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
                    <th width={10}>
                      <input type="checkbox" id="all" />
                    </th>
                    <th width={300}>Mã danh mục</th>
                    <th width={250}>tên</th>
                    <th width={50}>Ảnh</th>
                    <th width={150}>số lượng</th>
                    <th>tình trạng</th>
                    <th width={100}>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Dữ liệu khách hàng sẽ ở đây */}
                  <tr>
                    <td width={10}>
                      <input type="checkbox" name="check1" defaultValue={1} />
                    </td>
                    <td>71309005</td>
                    <td>áo thun nam</td>
                    <td>
                      <img
                        className="img-card-products"
                        src="../images/sp2.jpg"
                        alt=""
                      />
                    </td>
                    <td>40</td>
                    <td>
                      <span class="badge bg-success">Còn hàng</span>
                    </td>
                    <td className="table-td-center">
                      <button
                        className="btn btn-primary btn-sm trash"
                        type="button"
                        title="Xóa"
                        style={{ width: "20px", margin: "5px" }}
                      >
                        <i className="bi bi-trash" />
                      </button>
                      <button
                        className="btn btn-primary btn-sm edit"
                        type="button"
                        title="Sửa"
                        id="show-emp"
                        data-toggle="modal"
                        data-target="#ModalUP"
                        style={{ width: "20px", margin: "5px" }}
                      >
                        <i className="bi bi-pencil" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td width={10}>
                      <input type="checkbox" name="check1" defaultValue={1} />
                    </td>
                    <td>71309005</td>
                    <td>áo thun nam</td>
                    <td>
                      <img
                        className="img-card-products"
                        src="../images/sp3.jpg"
                        alt=""
                      />
                    </td>
                    <td>40</td>
                    <td>
                      <span class="badge bg-success">Còn hàng</span>
                    </td>
                    <td className="table-td-center">
                      <button
                        className="btn btn-primary btn-sm trash"
                        type="button"
                        title="Xóa"
                        style={{ width: "20px", margin: "5px" }}
                      >
                        <i className="bi bi-trash" />
                      </button>
                      <button
                        className="btn btn-primary btn-sm edit"
                        type="button"
                        title="Sửa"
                        id="show-emp"
                        data-toggle="modal"
                        data-target="#ModalUP"
                        style={{ width: "20px", margin: "5px" }}
                      >
                        <i className="bi bi-pencil" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td width={10}>
                      <input type="checkbox" name="check1" defaultValue={1} />
                    </td>
                    <td>71309005</td>
                    <td>áo thun nam</td>
                    <td>
                      <img
                        className="img-card-products"
                        src="../images/sp4.jpg"
                        alt=""
                      />
                    </td>
                    <td>40</td>
                    <td>
                      <span class="badge bg-success">Còn hàng</span>
                    </td>
                    <td className="table-td-center">
                      <button
                        className="btn btn-primary btn-sm trash"
                        type="button"
                        title="Xóa"
                        style={{ width: "20px", margin: "5px" }}
                      >
                        <i className="bi bi-trash" />
                      </button>
                      <button
                        className="btn btn-primary btn-sm edit"
                        type="button"
                        title="Sửa"
                        id="show-emp"
                        data-toggle="modal"
                        data-target="#ModalUP"
                        style={{ width: "20px", margin: "5px" }}
                      >
                        <i className="bi bi-pencil" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td width={10}>
                      <input type="checkbox" name="check1" defaultValue={1} />
                    </td>
                    <td>71309005</td>
                    <td>áo thun nam</td>
                    <td>
                      <img
                        className="img-card-products"
                        src="../images/sp5.jpg"
                        alt=""
                      />
                    </td>
                    <td>40</td>
                    <td>
                      <span class="badge bg-success">Còn hàng</span>
                    </td>
                    <td className="table-td-center">
                      <button
                        className="btn btn-primary btn-sm trash"
                        type="button"
                        title="Xóa"
                        style={{ width: "20px", margin: "5px" }}
                      >
                        <i className="bi bi-trash" />
                      </button>
                      <button
                        className="btn btn-primary btn-sm edit"
                        type="button"
                        title="Sửa"
                        id="show-emp"
                        data-toggle="modal"
                        data-target="#ModalUP"
                        style={{ width: "20px", margin: "5px" }}
                      >
                        <i className="bi bi-pencil" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td width={10}>
                      <input type="checkbox" name="check1" defaultValue={1} />
                    </td>
                    <td>71309005</td>
                    <td>áo thun nam</td>
                    <td>
                      <img
                        className="img-card-products"
                        src="../images/sp1.jpg"
                        alt=""
                      />
                    </td>
                    <td>40</td>
                    <td>
                      <span class="badge bg-success">Còn hàng</span>
                    </td>
                    <td className="table-td-center">
                      <button
                        className="btn btn-primary btn-sm trash"
                        type="button"
                        title="Xóa"
                        style={{ width: "20px", margin: "5px" }}
                      >
                        <i className="bi bi-trash" />
                      </button>
                      <button
                        className="btn btn-primary btn-sm edit"
                        type="button"
                        title="Sửa"
                        id="show-emp"
                        data-toggle="modal"
                        data-target="#ModalUP"
                        style={{ width: "20px", margin: "5px" }}
                      >
                        <i className="bi bi-pencil" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td width={10}>
                      <input type="checkbox" name="check1" defaultValue={1} />
                    </td>
                    <td>71309005</td>
                    <td>áo thun nam</td>
                    <td>
                      <img
                        className="img-card-products"
                        src="../images/sp3.jpg"
                        alt=""
                      />
                    </td>
                    <td>40</td>
                    <td>
                      <span class="badge bg-success">Còn hàng</span>
                    </td>
                    <td className="table-td-center">
                      <button
                        className="btn btn-primary btn-sm trash"
                        type="button"
                        title="Xóa"
                        style={{ width: "20px", margin: "5px" }}
                      >
                        <i className="bi bi-trash" />
                      </button>
                      <button
                        className="btn btn-primary btn-sm edit"
                        type="button"
                        title="Sửa"
                        id="show-emp"
                        data-toggle="modal"
                        data-target="#ModalUP"
                        style={{ width: "20px", margin: "5px" }}
                      >
                        <i className="bi bi-pencil" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td width={10}>
                      <input type="checkbox" name="check1" defaultValue={1} />
                    </td>
                    <td>71309005</td>
                    <td>áo thun nam</td>
                    <td>
                      <img
                        className="img-card-products"
                        src="../images/sp6.jpg"
                        alt=""
                      />
                    </td>
                    <td>40</td>
                    <td>
                      <span class="badge bg-success">Còn hàng</span>
                    </td>
                    <td className="table-td-center">
                      <button
                        className="btn btn-primary btn-sm trash"
                        type="button"
                        title="Xóa"
                        style={{ width: "20px", margin: "5px" }}
                      >
                        <i className="bi bi-trash" />
                      </button>
                      <button
                        className="btn btn-primary btn-sm edit"
                        type="button"
                        title="Sửa"
                        id="show-emp"
                        data-toggle="modal"
                        data-target="#ModalUP"
                        style={{ width: "20px", margin: "5px" }}
                      >
                        <i className="bi bi-pencil" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
