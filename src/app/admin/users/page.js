"use client";
import { getAllUsers } from "@/app/databases/users";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Users() {
  const [listUsers, setListUsers] = useState([]);

  const fetchUsers = async () => {
    const result = await getAllUsers();
    const filteredUsers = result.Users.filter((user) => user.role === 0);
    setListUsers(filteredUsers);
    console.log(filteredUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách khách hàng</b>
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
                  {/* <a
                    className="btn btn-delete btn-sm nhap-tu-file"
                    type="button"
                    title="Nhập"
                  >
                    <i className="bi bi-file-earmark-arrow-up" /> Tải từ file
                  </a> */}
                </div>
                {/* Các button khác */}
              </div>
              <table
                className="table table-hover table-bordered js-copytextarea table-align-center"
                cellPadding={0}
                cellSpacing={0}
                border={0}
                id="sampleTable"
              >
                <thead>
                  <tr>
                    <th>Họ và tên</th>
                    <th>Ảnh</th>
                    <th>Email</th>
                    <th>SĐT</th>
                    <th>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {listUsers.length > 0 ? (
                    listUsers
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .map((user) => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>
                            <img
                              className="img-card-person"
                              src={`http://localhost:2204/img/user/${user.image}`}
                              alt="User Avatar"
                              width="50"
                            />
                          </td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>
                            <Link href={`/admin/users/${user._id}`}>
                              <button
                                className="btn btn-primary btn-sm"
                                type="button"
                                title="Xem"
                                id="show-emp"
                                style={{ width: "20px", margin: "5px" }}
                              >
                                <i className="bi bi-eye-fill"></i>
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        Không có dữ liệu người dùng
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
