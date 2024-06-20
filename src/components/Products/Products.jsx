import React from "react";
import styles from "./Products.module.css";
import FeatureProducts from "../FeatureProducts/FeatureProducts";
import { Helmet } from "react-helmet";

export default function Products() {
  return (
    <>
      <FeatureProducts />
      <Helmet>
        <title>E-Commerce - Products</title>
      </Helmet>
    </>
  );
}
