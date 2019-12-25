import React from "react";
const SVG = ({
  style = {},
  fill = "#fff",
  width = "100%",
  className = "",
  height = "100%",
  path = "check.svg"
}) => (
  <svg width={width} style={style} height={height} className={className}>
    <path d={path} fill={fill} />
  </svg>
);

export default SVG;
