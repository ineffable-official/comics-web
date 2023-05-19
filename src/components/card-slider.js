import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import GenreBox from "./genre-box";
import CardSliderSec from "./card-slider-sec";

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
      <CardSliderSec currentIndex={currentIndex} d={d} i={i} key={i} />
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
