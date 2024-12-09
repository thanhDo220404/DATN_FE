import React from "react";

const SortSize = ({ sizes, selectedSizes, onSizeSelect }) => {
  return (
    <div>
      <div className="fs-3">Kích cỡ</div>
      <div className="d-flex flex-wrap gap-2 py-3">
        {sizes.length > 0 ? (
          sizes.map((size, index) => (
            <div
              key={index}
              className={`my-size-items ${
                selectedSizes.includes(size) ? "active" : ""
              }`}
              style={{
                cursor: "pointer",
              }}
              onClick={() => onSizeSelect(size)}
            >
              {size.name}
            </div>
          ))
        ) : (
          // Hiển thị placeholder nếu không có kích thước
          <>
            <span className="placeholder col-6"></span>
            <span className="placeholder w-75"></span>
            <span className="placeholder" style={{ width: "25%" }}></span>
          </>
        )}
      </div>
    </div>
  );
};

export default SortSize;
