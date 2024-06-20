import React, {useState , useEffect, useContext } from 'react'
import styles from "./WishList.module.css"
import { WishListContext } from '../../Context/WishListContext';
import Loader from '../Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function WishList() {
  let {token }= useContext(TokenContext);
  let navigate = useNavigate();
  const [wishProducts, setWishProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  let { addToCart}= useContext(CartContext)
  let {removeFromWishList, getWishListProducts} = useContext(WishListContext)
  useEffect(() => {
  
    getWishProducts()
  }, []);

  


  function getWishProducts(){
    getWishListProducts().then((response)=>{
      console.log(response.data.data, "wishhhhh");
      setWishProducts(response.data.data )
      setIsLoading(false)
    }).catch((error)=>{
      console.log(error);
      setIsLoading(false)
    })
  }

  function addCart(id,e){
    e.stopPropagation();

    addToCart(id)
    removeWish(id,e)
    getWishProducts()

  }
  function removeWish(id,e){
    e.stopPropagation();

    removeFromWishList(id)
    .then((response)=>{
      console.log(response);
      getWishProducts()

    }).catch((error)=>{
      console.log(error);
    })
  }
  

  function goToProductDetails(id, e){
    e.stopPropagation();
    navigate(`/productdetails/${id}`)

  }

  return (
    <>
       
  

{token ? <div className=" py-11 relative container mx-auto overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                   Price
                </th>
                <th scope="col" className="px-6 py-3">
                   Add To Cart
                </th>
                <th scope="col" className="px-6 py-3">
                   Remove from Wish
                </th>
            </tr>
        </thead>
        <Helmet>
                <title>E-Commerce - WhistList</title>
         
            </Helmet>
        <tbody>
           {wishProducts.map((wish)=>  <tr key={wish.id} onClick={((e)=>goToProductDetails(wish.id,e))} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              
               <td className="p-4" >
                    <img src={wish.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
                </td>
          
               
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {wish.title.split(" ").slice(0,2).join(" ")}
                </td>
              
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {wish.price} EGP
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <a onClick={(e)=>addCart(wish.id,e)}  className="font-medium text-red-600 dark:text-red-500 hover:underline">Add</a>
                </td>
                <td className="px-6 py-4">
                    <a onClick={(e)=>removeWish(wish.id,e)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                </td>
            </tr>
          )}
        </tbody>
    </table>
</div>:""}

    </>
  )
}
