import { useState } from "react";

export default function ImageLoad({ src }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-full h-auto">
      {loading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <div className="w-10 h-10 flex items-center justify-center animate-spin">
            <i className="fa-light fa-spinner"></i>
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        className="w-full h-auto flex justify-center"
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
