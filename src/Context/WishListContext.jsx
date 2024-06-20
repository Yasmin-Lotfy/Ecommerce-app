import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let WishListContext = createContext();

export default function WishListProvider(props) {
    const [wishListItems, setWishListItems] = useState(0);
    let token = localStorage.getItem("userToken")
    let headers = {
        token 
    }
  async function addToWishList(productId) {
  
    if(token){
      return await axios
      .post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        productId: productId,
        
      },{
        headers,
      })
      .then((response) => {
        console.log(response.data.data);
        setWishListItems(response.data.data.length)
        toast.success(response.data.message)
        return response;
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Please Register to Add Product to Your Wishlist.")
        return error;
      });
    }else{
      toast.error("Please Register to Add Product to Your Wishlist.")

    }
  }

  async function getWishListProducts(){
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        headers,
      })
      .then((response) => {
        console.log(response.data.data , "get all wish");
        setWishListItems(response.data.data.length)

        return response;
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.data.message)
        return error;
      });
  }
  async function removeFromWishList(id){
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
        headers,
      })
      .then((response) => {
        console.log(response , "get all wish");
        setWishListItems(response.data.data.length)
        toast.error(response.data.message)

        return response;
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.data.message)
        return error;
      });
  }


  return (
    <WishListContext.Provider value={{removeFromWishList ,getWishListProducts , wishListItems, addToWishList }}>
      {props.children}
    </WishListContext.Provider>
  );
}
