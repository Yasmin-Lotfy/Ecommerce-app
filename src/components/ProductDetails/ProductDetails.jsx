import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let {addToCart} = useContext(CartContext)
  let { id } = useParams();
  console.log(id);
  async function addToCartMiddle(productId) {
    let data = await addToCart(productId);
  
  }
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false,
    autoplayspeed:1000
  };
  async function getDetails() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((data) => {
        console.log(data);
        setProductDetails(data.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    getDetails();
  }, []);

 
  return (
    <>
      <div className="container mx-auto mt-10">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap ">
            <div className="w-full md:w-1/4 text-black  dark:text-white">
              <Slider {...settings}>
                {productDetails.images.map((src , index)=> <img key={index} src={src} alt="" />)}
              </Slider>
              {/* <img src={productDetails.imageCover} alt="" /> */}
            </div>
            <div className="w-full md:w-3/4 px-9 pt-6">
              <h1 className="font-bold text-lg text-black  dark:text-white">
                {productDetails.title}
              </h1>
              <h3 className="text-black  dark:text-white pt-5">
                {productDetails.description}
              </h3>
              <p className=" pt-5"> {productDetails?.category?.name}</p>
              <div className="flex justify-between items-center pt-6">
                <p>{productDetails.price}EGP</p>
                <p>
                 
                  <i className="fa fa-star rating-color"></i>
                  {productDetails.ratingsAverage}
                </p>
              </div>
              <div className="text-center my-6">
                <button onClick={()=>addToCartMiddle(productDetails.id)} className="btn bg-main w-full text-white px-4 py-2">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
