import React, { useEffect, useState } from "react";
import styles from "./CatDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function CatDetails() {
  const [catDetails, setCatDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();

  async function getCatDeatails(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
    console.log(data);
    setCatDetails(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getCatDeatails(id);
  }, []);

  return (
    <>
      <div className="container mx-auto">
      <Helmet>
        <title>E-Commerce - CatDetails</title>
      </Helmet>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap justify-center items-center text-center ">
          
            <div className="w-1/2 ps-9 pt-6 text-black  dark:text-white">
              <div className="cat-item relative ">
                <img
                  src={catDetails.image}
                  className="cat-img w-full h-[400px]"
                  alt=""
                />
                <div className="img-caption text-left absolute bottom-0 px-5  ">
                  <h2 className="absolute  bg-darkSecColor text-lg  text-black dark: left-0 ">
                    {catDetails.name}
                  </h2>
                  <h3 className="text-lg text-white font-bold">Relax & Work</h3>
                  <p className="text-sm text-white">
                    Mauris fermentum dictum magna.{" "}
                    <span className="text-darkSecColor">More info</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
