import React , {useState , useEffect} from 'react'
import styles from "./Brands.module.css"
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let navigate = useNavigate()
  
  async function getProducts(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    .then((data)=>{
      setBrands(data?.data?.data);
      setIsLoading(false);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  useEffect(() => {
    getProducts()
  }, [])

  function getBrandDetails(id){
    navigate(`/branddetails/${id}`)
  }

  return (
    <>
      <div className="container mx-auto">
      <Helmet>
        <title>E-Commerce - Brands</title>
      </Helmet>
        <div className="flex justify-center items-center">
          {isLoading ? <Loader /> : ""}
        </div>
        <div className="flex flex-wrap ">
          {brands.map((product) => (
            <div key={product._id} className="p-4 text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="">
               
                  <div className="product-main relative border  rounded-md dark:hover:text-white" onClick={()=>getBrandDetails(product._id)}>
                    <img src={product.image} className="w-full" alt="" />
                  
                  </div>
                  <p className="dark:text-darkSecColor text-black">{product.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
