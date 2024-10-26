import React from "react";

const SortSize = ({ sizes, selectedSizes, onSizeSelect }) => {
  return (
    <div>
      <div className="fs-3">Kích cỡ</div>
      <div className="d-flex flex-wrap gap-2">
        {sizes.map((size, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default SortSize;
