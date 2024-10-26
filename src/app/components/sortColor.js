import React from "react";

const SortColor = ({ colors, selectedColors, onColorSelect }) => {
  return (
    <div>
      <div className="fs-3">Màu sắc</div>
      <div className="d-flex flex-wrap gap-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`${selectedColors.includes(color) ? "sortActive" : ""}`}
            title={color.name}
            style={{
              backgroundColor: color.hexCode,
              height: "30px",
              width: "30%",
              cursor: "pointer",
            }}
            onClick={() => onColorSelect(color)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortColor;
