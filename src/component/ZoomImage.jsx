import React, { useRef } from "react";

const ZoomImage = ({ src, width = 550, height = 700 }) => {
  const zoomRef = useRef();

  const handleMouseMove = (e) => {
    const zoom = zoomRef.current;
    const rect = zoom.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * 100) / zoom.offsetWidth;
    const y = ((e.clientY - rect.top) * 100) / zoom.offsetHeight;

    zoom.style.setProperty("--display", "block");
    zoom.style.setProperty("--zoom-x", `${x}%`);
    zoom.style.setProperty("--zoom-y", `${y}%`);
  };

  const handleMouseOut = () => {
    zoomRef.current.style.setProperty("--display", "none");
  };

  return (
    <div
      ref={zoomRef}
      className="zoom-container"
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
      style={{
        "--url": `url(${src})`,
        "--zoom-x": "0%",
        "--zoom-y": "0%",
        "--display": "none",
        width,
        height,
      }}
    >
      <img src={src} alt="Product" />
    </div>
  );
};

export default ZoomImage;

