import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024, // Large screens (e.g., desktops)
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768, // Medium screens (e.g., tablets)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576, // Small screens (e.g., mobile devices)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <h2 className="my-3 capitalize font-semibold text-slate-400">
        Shop Popular Categories
      </h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} >
            <img
              src={category.image}
              className="w-full h-[200px] object-cover"
              alt={category.name}
            />
            <h4 className="text-center mt-2">{category.name}</h4>
          </div>
        ))}
      </Slider>
    </>
  );
}
