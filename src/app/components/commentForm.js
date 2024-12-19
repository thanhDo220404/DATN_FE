import { useState } from "react";

const CommentForm = () => {
  // State quản lý thông tin form và danh sách bình luận
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      comment: "Sản phẩm rất tốt, mình sẽ mua lại!",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@gmail.com",
      comment: "Giao hàng nhanh, dịch vụ tuyệt vời!",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra thông tin nhập
    if (!name || !email || !comment) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Thêm bình luận mới vào danh sách
    const newComment = {
      id: comments.length + 1,
      name,
      email,
      comment,
    };
    setComments([...comments, newComment]);

    // Reset form
    setName("");
    setEmail("");
    setComment("");
  };

  return (
    <div className="container">
      <h2>Để lại bình luận của bạn</h2>

      {/* Form nhập bình luận */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Họ và tên</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Nhập tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Bình luận</label>
          <textarea
            id="comment"
            className="form-control"
            placeholder="Nhập bình luận của bạn"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Gửi bình luận
        </button>
      </form>

      <hr />

      <h3>Bình luận đã gửi:</h3>
      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <h5>
              {comment.name} (Email: {comment.email})
            </h5>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentForm;
