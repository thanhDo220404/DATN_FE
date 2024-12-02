import React from "react";

const SortColor = ({ colors, selectedColors, onColorSelect }) => {
  return (
    <div>
      <div className="fs-3">Màu sắc</div>
      <div className="d-flex flex-wrap gap-4 py-3">
        {colors.length > 0 ? (
          colors.map((color, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0 8px", // Khoảng cách giữa các màu
              }}
            >
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
              <span
                htmlFor={`componentSortColor-${color._id}`}
                style={{ marginTop: "5px", cursor: "pointer" }}
                onClick={() => onColorSelect(color)}
              >
                {color.name}
              </span>
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
