import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import GenreBox from "./genre-box";

export default function CardSlider({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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
              <img src={d.images} alt="" />
            </picture>
          </div>
          <div
            className={`${
              i === currentIndex ? "w-[400px] h-auto" : "w-[0px] h-[0px]"
            } overflow-hidden flex flex-col text-xs transition-all duration-500 ease-in-out text-gray-300`}
          >
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Title
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                {d.title}
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Alternative Title
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                {d.alt_title}
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Genres
              </div>
              {d.genres ? (
                <div className="w-full h-auto flex items-center px-4 col-span-8 flex-wrap gap-2 py-2">
                  {JSON.parse(d.genres) !== null &&
                    JSON.parse(d.genres).map((g, ind) => (
                      <GenreBox id={g} key={ind} />
                    ))}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Language
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                {d.lang ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full overflow-hidden">
                      <picture>
                        <img src={d.lang.images} alt="" />
                      </picture>
                    </div>
                    <div className="text-xs">{d.lang.name}</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Original Language
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                {d.ori_lang ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full overflow-hidden">
                      <picture>
                        <img src={d.ori_lang.images} alt="" />
                      </picture>
                    </div>
                    <div className="text-xs">{d.ori_lang.name}</div>
                  </div>
                ) : (
                  ""
                )}
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
                {moment(d.updated_at).fromNow()}
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
