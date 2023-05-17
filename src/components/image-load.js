import axios from "axios";
import { useState, useRef, useCallback, useEffect } from "react";

export default function ImageLoad({ src }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  return (
    <div className="w-full h-auto">
      {loading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <div className="w-16 h-2 flex bg-[rgba(255,255,255,0.1)] rounded-full">
            <div
              className="h-2 rounded-full bg-blue-500 transition-all duration-500 ease-in-out"
              style={{
                width: `${progress}%`,
              }}
            ></div>
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
            onLoad={(e) => {
              setProgress(100);
              const t = setTimeout(() => {
                setLoading(false);
              }, 1000);
              return () => {
                clearTimeout(t);
              };
            }}
          />
        </picture>
      </div>
    </div>
  );
}
