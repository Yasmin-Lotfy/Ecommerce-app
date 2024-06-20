import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import Loader from "../Loader/Loader";
import styles from "./FeatureProducts.module.css";

export default function FeatureProducts() {
  const [products, setProducts] = useState([]);
  const [normalProducts, setNormalProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { addToWishList, getWishListProducts } = useContext(WishListContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Assuming you have a way to get the token, e.g., from context or local storage
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    async function fetchData() {
      try {
        const productResponse = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        const normalProductsData = productResponse.data.data;
        setNormalProducts(normalProductsData);

        if (token) {
          const wishListResponse = await getWishListProducts();
          const wishListIds = new Set(
            wishListResponse.data.data.map((item) => item.id)
          );

          const updatedProducts = normalProductsData.map((product) => ({
            ...product,
            isWishListed: wishListIds.has(product.id),
          }));
          setProducts(updatedProducts);
        } else {
          setProducts(normalProductsData);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [token, getWishListProducts]);

  async function addToCartMiddle(productId, e) {
    e.stopPropagation();
    await addToCart(productId);
  }

  async function goToWishList(productId, e) {
    e.stopPropagation();
    await addToWishList(productId);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, isWishListed: true } : product
      )
    );
    console.log(productId, "added to wish list");
  }

  function goToProductDetails(id, e) {
    e.stopPropagation();
    navigate(`/productdetails/${id}`);
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center">
        {isLoading ? <Loader /> : null}
      </div>
      <div className="flex flex-wrap">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <div>
              <div
                className="product-main relative dark:hover:text-white"
                onClick={(e) => goToProductDetails(product.id, e)}
              >
                <img
                  src={product.imageCover}
                  className="w-full"
                  alt={product.title}
                />
                <div className="product-cart flex text-darkSecColor absolute">
                  <div
                    className="border-2 border-cartColor hover:text-darkSecColor hover:border-darkSecColor text-cartColor me-3"
                    onClick={(e) => addToCartMiddle(product.id, e)}
                  >
                    <i className="fa-solid fa-cart-shopping"></i>
                  </div>
                  {product.isWishListed ? (
                    <div
                      className="border-2 hover:border-wishListColor hover:text-wishListColor border-wishListColor text-wishListColor "
                      onClick={(e) => goToWishList(product.id, e)}
                    >
                      <i className="fa-solid fa-heart"></i>
                    </div>
                  ) : (
                    <div
                      className="border-2 hover:border-wishListColor hover:text-wishListColor border-cartColor text-cartColor "
                      onClick={(e) => goToWishList(product.id, e)}
                    >
                      <i className="fa-solid fa-heart"></i>
                    </div>
                  )}
                </div>
              </div>
              <p className="dark:text-darkSecColor text-lg font-bold text-black">
                {product.category.name}
              </p>
              <h2>{product.title}</h2>
              <div className="flex justify-between items-center">
                <p>{product.price} EGP</p>
                <p>
                  <i className="fa fa-star rating-color"></i>
                  {product.ratingsAverage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
