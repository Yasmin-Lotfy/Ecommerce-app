import React from "react";
import styles from "./Home.module.css";
import FeatureProducts from "../FeatureProducts/FeatureProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
     <Helmet>
                <title>E-Commerce - Home</title>
         
            </Helmet>
      <MainSlider />
      <CategorySlider />
      <FeatureProducts />
    </>
  );
}
