import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import Loader from "../Loader/Loader";
import { TokenContext } from "../../Context/TokenContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  let{token} = useContext(TokenContext);
  let navigate = useNavigate()
  let { getCart ,updateCartItem , clearCart, deleteCartItem, totalPrice } = useContext(CartContext);
async function deleteCart(id){
  let data = await deleteCartItem(id);
  console.log(data);
  setCartItems(data?.data.data.products);
  setIsLoading(false)


}
 async function updateProduct(productId, count){
   let response = await updateCartItem(productId, count);
   console.log(response?.data);

   setCartItems(response?.data.data.products);
   setIsLoading(false)
  //  setTotalPrice(response?.data)

 }
  async function getCartItems() {
    let response = await getCart();
    console.log(response?.data);
    setCartItems(response?.data?.data.products);
    setIsLoading(false)
  }

  useEffect(() => {
      getCartItems();
    
   
  }, []);

  async function letClearCart(){
    await clearCart();
    getCartItems();
  }

  return (
    <>

    { isLoading? <Loader/>:  cartItems?
    
    
    <div className=" py-11 relative container mx-auto overflow-x-auto shadow-md sm:rounded-lg">
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
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                TotalPrice
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <Helmet>
                <title>E-Commerce - Cart</title>
         
            </Helmet>
          <tbody>
          <tr
               
               className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 my-5 dark:hover:bg-gray-600"
             >
               <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white" colSpan="5">
                Clear Cart
               </td>
             
               <td  className="bg-main py-3 px-7 text-white rounded-md"  ><button onClick={()=>letClearCart()} >ClearCart</button></td>
               </tr>
              
            {cartItems.map((item) => (
              
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={item.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt="Apple Watch"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                    onClick={ ()=> updateProduct(item.product.id, item.count-1 ==0?deleteCart(item.product.id):item.count-1 )}
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span>{item.count}</span>
                    </div>
                    <button
                    onClick={ ()=> updateProduct(item.product.id, item.count+1)}
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.price} EGP
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.count * item.price} EGP
                </td>
                <td className="px-6 py-4">
                  <a
                  onClick={()=>deleteCart(item.product.id)}
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </a>
                </td>
              </tr>
            ))}
               <tr
               
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                 Total Price
                </td>
                <td className="px-6 py-4 font-semibold text-center text-gray-900 dark:text-white" colSpan="4">
                 {totalPrice} EGP
                </td>
                <td  className="bg-main py-3 px-7 text-white rounded-md"><Link to="/checkout">Checkout</Link></td>
                </tr>
          </tbody>
        </table>
      </div>

      :    <h2 className="text-main text-4xl py-11 text-center">There is No Product in the Cart</h2>
}
    
    
    </>
  );
}
