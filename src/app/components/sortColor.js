import React from "react";

const SortColor = ({ colors, selectedColors, onColorSelect }) => {
  return (
    <div>
      <div className="fs-3">Màu sắc</div>
      <div className="d-flex flex-wrap gap-2 py-3">
        {colors.length > 0 ? (
          colors.map((color, index) => (
            <div key={index}>
              <div
                id={`componentSortColor-${color._id}`}
                className={`${
                  selectedColors.includes(color) ? "sortActive" : ""
                }`}
                title={color.name}
                style={{
                  backgroundColor: color.hexCode,
                  height: "30px",
                  width: "30px",
                  cursor: "pointer",
                  borderRadius: 20,
                }}
                onClick={() => onColorSelect(color)}
              ></div>
            </div>
          ))
        ) : (
          // Hiển thị placeholder nếu không có màu sắc
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

export default SortColor;
