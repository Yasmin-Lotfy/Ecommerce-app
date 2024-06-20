import React from "react";
import styles from "./CategorySlider.module.css";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CategorySlider() {
  function getCatData() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data } = useQuery({
    queryKey: ["catSlider"],
    queryFn: getCatData,
  });
  console.log(data?.data.data);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    arrows: false,
    autoplayspeed: 1000,
  };
  return (
    <>
      <div className="bg-white dark:bg-slate-800 dark:text-white">
        <div className="container mx-auto my-10  ">
        <Link to="/cat">  <h2 className="dark:hover:text-white">Show Popular Category</h2></Link>
          <Slider {...settings}>
            {data?.data.data.map((cat) => (
              <div className="text-center " key={cat._id}>
                <img src={cat.image} className="h-[200px] w-[700px]" alt="" />
                <Link to={`/catdetails/${cat._id}`}><p className="dark:hover:text-white">{cat.name}</p></Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
