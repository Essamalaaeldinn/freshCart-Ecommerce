import React from "react";
import Slider from "react-slick";
import Slide1 from "../../assets/slider-2.jpeg";
import Slide2 from "../../assets/slider-image-2.jpeg";
import Slide3 from "../../assets/slider-image-3.jpeg";
import Slide4 from "../../assets/grocery-banner.png";
import Slide5 from "../../assets/grocery-banner-2.jpeg";

export default function MainSilder() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Disable arrows
    responsive: [
      {
        breakpoint: 768, // For tablets and smaller devices
        settings: {
          arrows: false, // Ensure arrows are hidden on smaller screens
          dots: true,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col md:flex-row my-5">
        <div className="w-full md:w-3/4">
          <Slider {...settings}>
            <img src={Slide1} className="w-full h-[400px] object-cover" alt="Slide 1" />
            <img src={Slide4} className="w-full h-[400px] object-cover" alt="Slide 2" />
            <img src={Slide5} className="w-full h-[400px] object-cover" alt="Slide 3" />
          </Slider>
        </div>
        <div className="w-full md:w-1/4 flex flex-col  mt-2 md:mt-0">
          <img src={Slide2} className="w-full h-[200px] object-cover" alt="Sidebar 1" />
          <img src={Slide3} className="w-full h-[200px] object-cover" alt="Sidebar 2" />
        </div>
      </div>
    </>
  );
}
