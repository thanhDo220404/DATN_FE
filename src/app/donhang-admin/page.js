import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../main.css";

export default function donhang() {
  return (
    <>
      {/* thanh nav */}
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <img
            className="app-sidebar__user-avatar"
            src="../images/sp7.jpg"
            style={{ width: "70px", height: "70px" }}
            alt="User Image"
          />
          <div>
            <p className="app-sidebar__user-name">
              <b>Võ Trường</b>
            </p>
            <p className="app-sidebar__user-designation">
              Chào mừng bạn trở lại
            </p>
          </div>
        </div>
        <hr />
        <ul className="app-menu">
          <li>
            <a className="app-menu__item active" href="index.html">
              <i className="bi bi-speedometer2" />
              <span className="app-menu__label">Dashboard</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="#">
              <i className="bi bi-person" />
              <span className="app-menu__label">Quản lý người dùng</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="table-data-oder.html">
              <i className="bi bi-list-task" />
              <span className="app-menu__label">Quản lý danh mục</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="table-data-product.html">
              <i className="bi bi-tag" />
              <span className="app-menu__label">Quản lý sản phẩm</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="table-data-oder.html">
              <i className="bi bi-list-task" />
              <span className="app-menu__label">Quản lý đơn hàng</span>
            </a>
          </li>
          {/* <li>
            <a className="app-menu__item" href="table-data-money.html">
              <i className="bi bi-currency-dollar" />
              <span className="app-menu__label">Quản lý kho hàng</span>
            </a>
          </li> */}
          <li>
            <a className="app-menu__item" href="quan-ly-bao-cao.html">
              <i className="bi bi-bar-chart-line" />
              <span className="app-menu__label">Báo cáo doanh thu</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="#">
              <i className="bi bi-gear" />
              <span className="app-menu__label">Cài đặt hệ thống</span>
            </a>
          </li>
        </ul>
      </aside>

      {/* nội dung */}
      <main className="app-content">
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
                      <i className="bi bi-file-earmark-spreadsheet" /> Xuất
                      Excel
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
                      <th>ID đơn hàng</th>
                      <th width={300}>khách hàng</th>
                      <th width={450}>Đơn hàng</th>
                      <th width={130}>Số lượng</th>
                      <th width={200}>Tổng tiền</th>
                      <th width={190}>Tình trạng</th>
                      <th width={100}>Tính năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Dữ liệu khách hàng sẽ ở đây */}
                    <tr>
                      <td width={10}>
                        <input type="checkbox" name="check1" defaultValue={1} />
                      </td>
                      <td>MD0837</td>
                      <td>Triệu Thanh Phú</td>
                      <td>Ghế làm việc Zuno, Bàn ăn gỗ Theresa</td>
                      <td>2</td>
                      <td>5.600.000 đ</td>
                      <td><span class="badge bg-danger">Đã hủy</span></td>
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
                      <td>MD0837</td>
                      <td>Triệu Thanh Phú</td>
                      <td>Ghế làm việc Zuno, Bàn ăn gỗ Theresa</td>
                      <td>2</td>
                      <td>5.600.000 đ</td>
                      <td><span class="badge bg-success">Hoàn thành</span></td>
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
                         style={{ width: '20px', margin : '5px'}}
                        >
                          <i className="bi bi-pencil" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td width={10}>
                        <input type="checkbox" name="check1" defaultValue={1} />
                      </td>
                      <td>MD0837</td>
                      <td>Triệu Thanh Phú</td>
                      <td>Ghế làm việc Zuno, Bàn ăn gỗ Theresa</td>
                      <td>2</td>
                      <td>5.600.000 đ</td>
                      <td><span class="badge bg-warning">Đang giao hàng</span></td>
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
                         style={{ width: '20px', margin : '5px'}}
                        >
                          <i className="bi bi-pencil" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td width={10}>
                        <input type="checkbox" name="check1" defaultValue={1} />
                      </td>
                      <td>MD0837</td>
                      <td>Triệu Thanh Phú</td>
                      <td>Ghế làm việc Zuno, Bàn ăn gỗ Theresa</td>
                      <td>2</td>
                      <td>5.600.000 đ</td>
                      <td><span class="badge bg-info">Chờ thanh toán</span></td>
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
                         style={{ width: '20px', margin : '5px'}}
                        >
                          <i className="bi bi-pencil" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td width={10}>
                        <input type="checkbox" name="check1" defaultValue={1} />
                      </td>
                      <td>MD0837</td>
                      <td>Triệu Thanh Phú</td>
                      <td>Ghế làm việc Zuno, Bàn ăn gỗ Theresa</td>
                      <td>2</td>
                      <td>5.600.000 đ</td>
                      <td><span class="badge bg-warning">Đang giao hàng</span></td>
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
                         style={{ width: '20px', margin : '5px'}}
                        >
                          <i className="bi bi-pencil" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td width={10}>
                        <input type="checkbox" name="check1" defaultValue={1} />
                      </td>
                      <td>MD0837</td>
                      <td>Triệu Thanh Phú</td>
                      <td>Ghế làm việc Zuno, Bàn ăn gỗ Theresa</td>
                      <td>2</td>
                      <td>5.600.000 đ</td>
                      <td><span class="badge bg-success">Hoàn thành</span></td>
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
                         style={{ width: '20px', margin : '5px'}}
                        >
                          <i className="bi bi-pencil" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td width={10}>
                        <input type="checkbox" name="check1" defaultValue={1} />
                      </td>
                      <td>MD0837</td>
                      <td>Triệu Thanh Phú</td>
                      <td>Ghế làm việc Zuno, Bàn ăn gỗ Theresa</td>
                      <td>2</td>
                      <td>5.600.000 đ</td>
                      <td><span class="badge bg-info">Chờ thanh toán</span></td>
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
                         style={{ width: '20px', margin : '5px'}}
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
      </main>

      <script src="/bootstrap/js/bootstrap.bundle.js"></script>
    </>
  );
}
