import { data } from "autoprefixer";
import axios from "axios";
import { createContext , useState} from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [totalPrice, setTotalPrice] = useState(0)
  const [noOfCartItems, setnoOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null)
let token = localStorage.getItem("userToken");
  let headers = {
    token 
  };

  async function addToCart(productId) {
    if(token){
      return axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        { headers :headers}
      ).then((response)=>{
          console.log(response, "added")
          setCartId(response.data.data._id)
          setTotalPrice(response?.data.data.totalCartPrice)
          setnoOfCartItems(response?.data.numOfCartItems)
          toast.success("Product Added Successfully To your Cart")
      })
      .catch((err)=>{
          toast.error("Please Register to Add Product.")
          console.log(err);
      })
    }else{
      toast.error("Please Register to Add Product.")

    }
  
  }

  async function getCart(){
  if(localStorage.getItem("userToken")){
    return axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
     
      { headers :headers}
    ).then((response)=>{
      
        console.log(response, "all data");
        setnoOfCartItems(response?.data.numOfCartItems);
        setCartId(response.data.data._id)
        setTotalPrice(response?.data.data.totalCartPrice)
        return response;
    })
    .catch((err)=>{
        toast.error("This didn't work.");
        return err
      
        

    })
  }
  }

  async function deleteCartItem(productId){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        headers:headers
    }).then((data)=>{
        console.log(data , "de");
        setTotalPrice(data?.data.data.totalCartPrice)
        setnoOfCartItems(data?.data.numOfCartItems)
        setCartId(response.data.data._id)

       toast.error("Product Removed from Cart")
        return data
    }).catch((err)=>{
        console.log(err);
        return err
    })
  }
  async function onilePayment(shippingAddress){
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{
        shippingAddress
    },{
        headers:headers
    }).then((data)=>{
        console.log(data);
        window.location.href = data.data.session.url;
        // setTotalPrice(data?.data.data.totalCartPrice);
        // setnoOfCartItems(data?.data.numOfCartItems)

        return data
    }).catch((err)=>{
        console.log(err);
        return err
    })
  }
  
  async function updateCartItem(productId, count){
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        count:count
    },{
        headers:headers
    }).then((data)=>{
        console.log(data);
        setTotalPrice(data?.data.data.totalCartPrice);
        setnoOfCartItems(data?.data.numOfCartItems)

        return data
    }).catch((err)=>{
        console.log(err);
        return err
    })
  }
  async function clearCart(){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:headers
    }).then((data)=>{
        console.log("clearrrrrr");
        setTotalPrice("0")
        setnoOfCartItems("0")
       toast.error("Cart Cleared")
        return data
    }).catch((err)=>{
        console.log(err);
        return err
    })
  }

  return <CartContext.Provider value={{onilePayment, clearCart,addToCart, noOfCartItems , totalPrice, updateCartItem ,deleteCartItem , getCart}}>{props.children}</CartContext.Provider>;
}
