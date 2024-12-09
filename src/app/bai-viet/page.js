"use client";
import { useEffect, useState } from "react";
import { getPosts } from "../databases/post";

export default function Post() {
  const [posts, setPosts] = useState([]);

  // Fetch posts (replace with your actual API endpoint)
  const fetchPosts = async () => {
    const result = await getPosts();
    setPosts(result);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container my-5">
      <div className="row mt-5">
        <h3 className="product-title">Bài viết</h3>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="col-lg-4">
              <div className="card">
                <a href={`/bai-viet/${post._id}`}>
                  <img
                    src={post.image.filePath || "../img-gioithieu/bv4.png"}
                    className="card-img-top object-fit-cover"
                    alt={post.image.filePath}
                    height={250}
                  />
                </a>
                <div className="card-body">
                  <div className="card-title fs-6">
                    <a href={`/bai-viet/${post._id}`}>{post.title}</a>
                  </div>{" "}
                  {/* Displaying title */}
                  <p className="card-text fs-6">
                    Đăng ngày: {new Date(post.createdAt).toLocaleDateString()}
                  </p>{" "}
                  {/* Displaying id */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Không có bài viết nào</p> // Handle case when no posts are available
        )}
      </div>
    </div>
  );
}
