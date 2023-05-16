import { useState } from "react";

export default function ImageLoad({ src }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-full h-auto">
      {loading ? (
        <div className="w-full h-[200px] flex items-center justify-center bg-[rgba(255,255,255,0.05)]">
          <div className="w-10 h-10 flex items-center justify-center animate-spin">
            <i className="fa-light fa-spinner"></i>
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        className="w-full h-auto"
        style={{ display: loading ? "none" : "flex" }}
      >
        <picture>
          <img
            src={src}
            className="w-full h-auto"
            alt=""
            onLoad={(e) => setLoading(false)}
          />
        </picture>
      </div>
    </div>
  );
}
