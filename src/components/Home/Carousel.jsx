import React, { Component } from "react";
import Slider from "react-slick";

function Carousel(props) {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    arrows: true,
    centerPadding: "160px",
    slidesToShow: 1,
    speed: 500,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className=" mx-4 bg-red-300">
          <h3>1</h3>
        </div>
        <div className=" mx-4 bg-blue-300">
          <h3>2</h3>
        </div>
        <div className=" mx-4 bg-green-300">
          <h3>3</h3>
        </div>
        <div className=" mx-4 bg-yellow-300">
          <h3>4</h3>
        </div>
        <div className=" mx-4 bg-gray-300">
          <h3>5</h3>
        </div>
        <div className=" mx-4 bg-pink-300">
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
