import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './slider.css'

export default function Slider() {
  let slideTime = useRef(0); 
  const [slideIndex, setSlideIndex] = useState(1);

  //Next Button Click Handler
  const toNextSlide = () => {
    if (slideIndex !== 5) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === 5) {
      setSlideIndex(1);
    }
    clearTimeout(slideTime.current);
  };

  //Previous Button Click Handler
  const toPrevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(5);
    }
    clearTimeout(slideTime.current);
  };
  //Change slide in every 3 seconds
  useEffect(() => {
    slideTime.current =  setTimeout(() => {
        if (slideIndex !== 5) {
            setSlideIndex(slideIndex + 1);
        } else if (slideIndex === 5) {
            setSlideIndex(1);
        }
    }, 3000);
  }, [slideIndex]);
 
  return (
    // Slides
    <div className="slider-wrapper">
      <div className="sliders">
      {Array.from({ length: 5 }).map((item, index) => {
        return (
          <div key={index} className={slideIndex === index + 1 ? "slide active-slide" : "slide"}>
            <img src={`https://coffee.alexflipnote.dev/random?cache=${performance.now()}`} alt="slider"/>
          </div>
        );
      })}
      </div>

      {/* Previous,Next Buttons */}
      <button onClick={toPrevSlide} className={"arrow-btn prev"}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <button onClick={toNextSlide} className={"arrow-btn next"}>
      <FontAwesomeIcon icon={faAngleRight} />
      </button>

      {/* Dots */}
      <div className="dot-wrapper">
        {Array.from({ length: 5 }).map((item, index) => (
          <div key={index} onClick={() =>  {
                clearTimeout(slideTime.current);
                setSlideIndex(index + 1)
            }}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          >
          </div>
        ))}
      </div>
    </div>
  );
}