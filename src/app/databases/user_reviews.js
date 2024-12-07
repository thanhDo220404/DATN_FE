const API_URL =
  `${process.env.NEXT_PUBLIC_API_URL}/user_reviews` ||
  "http://localhost:2204/user_reviews";

// Tạo review mới
export const createReview = async (reviewData) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create review: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

// Lấy tất cả reviews
export const getAllReviews = async () => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

// Lấy review theo ID
export const getReviewById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch review: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching review by ID:", error);
    throw error;
  }
};

// Cập nhật review
export const updateReview = async (id, reviewData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update review: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

// Xóa review
export const deleteReview = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete review: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

// Lọc tất cả reviews theo userId
export const getReviewsByUser = async (userId) => {
  try {
    // Lấy tất cả các review
    const reviews = await getAllReviews();

    // Lọc reviews theo userId
    const filteredReviews = reviews.filter(
      (review) => review.user._id === userId
    );

    return filteredReviews;
  } catch (error) {
    console.error("Error filtering reviews by userId:", error);
    throw error;
  }
};
// Lọc tất cả reviews theo orderId
export const getReviewsByOrder = async (orderId, reviewData = null) => {
  try {
    // Lấy tất cả các review
    const reviews = reviewData || (await getAllReviews());

    // Lọc reviews theo userId
    const filteredReviews = reviews.filter(
      (review) => review.order._id === orderId
    );

    return filteredReviews;
  } catch (error) {
    console.error("Error filtering reviews by userId:", error);
    throw error;
  }
};
// Lọc tất cả reviews theo orderId
export const getReviewsByProduct = async (productId, reviewData = null) => {
  try {
    // Lấy tất cả các review
    const reviews = reviewData || (await getAllReviews());

    // Lọc reviews theo userId
    const filteredReviews = reviews.filter(
      (review) => review.product._id === productId
    );

    return filteredReviews;
  } catch (error) {
    console.error("Error filtering reviews by userId:", error);
    throw error;
  }
};
