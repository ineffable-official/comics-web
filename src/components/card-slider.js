import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function CardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 2500);

    return () => {
      clearInterval(timer);
    };
  });

  const renderSlides = () => {
    const slideNodes = data.map((d, i) => (
      <div
        className={`flex-shrink-0 w-full h-[450px] flex items-center justify-center ${
          i === currentIndex ? "index" : ""
        }`}
        key={i}
      >
        <div className="w-auto h-auto bg-[rgba(255,255,255,0.1)] rounded-xl p-4 flex transition-all duration-500 ease-in-out">
          <div className="w-[200px] h-fit flex items-center justify-center rounded-xl overflow-hidden">
            <picture>
              <img
                src={
                  "https://xfs-s114.batcg.org/thumb/W600/ampi/238/23853a4b110c2c0c632fd1e61bebd23ac7dee3a9_512_728_244673.jpeg?acc=ga30DMRpKCiUtKLnQ4ldMQ&exp=1683911851"
                }
                alt=""
              />
            </picture>
          </div>
          <div
            className={`${i === currentIndex? "w-[400px] h-auto":"w-[0px] h-[0px]"} overflow-hidden flex flex-col text-xs transition-all duration-500 ease-in-out text-gray-300`}
          >
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Title
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                Waka-chan Is Flirty Again
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Alternative Title
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                Waka-chan Is Flirty Again
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Genres
              </div>
              <div className="w-full h-auto flex items-center px-4 col-span-8 flex-wrap gap-2 py-2">
                {data !== null &&
                  data.map((g, i) => (
                    <div
                      className="w-auto py-1 px-2 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-all duration-100 ease-in-out cursor-pointer rounded-lg"
                      key={i}
                    >
                      Action
                    </div>
                  ))}
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Language
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                Indonesia
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Original Language
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                Jepang
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Status
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                On going
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Latest updated at
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                {moment().fromNow()}
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

    slideNodes.push(
      React.cloneElement(slideNodes[0], {
        key: data.length,
        className: "slide cloned",
      })
    );

    return slideNodes;
  };
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-linear"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {renderSlides()}
      </div>
    </div>
  );
}
