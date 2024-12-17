"use client";
import { useEffect, useState } from "react";
import { deletePost, getPosts } from "@/app/databases/post"; // Thêm hàm getAllPosts vào các api
import Pagination from "@/app/components/pagination";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

export default function Posts() {
  const [listPosts, setListPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [postSelected, setPostSelected] = useState(null);

  const fetchPosts = async () => {
    const result = await getPosts();
    setListPosts(result);
  };

  const handleReplaceUpdate = (id) => {
    window.location.href = `/admin/bai-viet/sua/${id}`;
  };
  const handleDelete = async (data) => {
    setPostSelected(data);
  };
  const onSubmitDelete = async () => {
    if (postSelected) {
      try {
        await deletePost(postSelected._id);
        await fetchPosts(); // Cập nhật lại danh sách
        const modal = document.getElementById("deletePost");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide(); // Đóng modal
        toast.success("Xóa thành công");
      } catch (error) {
        console.error("Xóa bài viết thất bại:", error);
        toast.error("Xóa bài viết thất bại");
      }
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const paginatedPosts = listPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(listPosts.length / itemsPerPage);

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách bài viết</b>
            </a>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <Link
                    className="btn btn-add btn-sm"
                    href="/admin/bai-viet/them"
                    title="Thêm"
                  >
                    <i className="bi bi-plus" />
                    Thêm bài viết
                  </Link>
                </div>
              </div>
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Tên bài viết</th>
                    <th>Ngày tạo</th>
                    <th>Ngày cập nhật</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {listPosts.length > 0 ? (
                    paginatedPosts.map((post) => (
                      <tr key={post._id}>
                        <td>{post.title}</td>
                        <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                        <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm trash"
                            type="button"
                            title="Xóa"
                            style={{ width: "20px", margin: "5px" }}
                            data-bs-toggle="modal"
                            data-bs-target="#deletePost"
                            onClick={() => handleDelete(post)}
                          >
                            <i className="bi bi-trash" />
                          </button>
                          <button
                            className="btn btn-primary btn-sm edit"
                            type="button"
                            title="Sửa"
                            id="show-emp"
                            style={{ width: "20px", margin: "5px" }}
                            onClick={() => handleReplaceUpdate(post._id)}
                          >
                            <i className="bi bi-pencil" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        Không có bài viết nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Modal xác nhận xóa */}
      <div
        className="modal fade"
        id="deletePost"
        tabIndex="-1"
        aria-labelledby="deletePostLabel"
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
              <p>Bạn có chắc chắn muốn xóa bài viết này không?</p>
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
