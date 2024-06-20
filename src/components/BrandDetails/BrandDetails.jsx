import React , {useState , useEffect} from 'react'
import styles from "./BrandDetails.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';

export default function BrandDetails() {
  const [brandDetails, setBrandDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let {id} = useParams();
  async function getDetails() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((data) => {
        console.log(data.data.data);
        setBrandDetails(data.data.data);
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
       <div className="container mx-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap justify-center items-center text-center ">
              <Helmet>
        <title>E-Commerce - Brand Details</title>
      </Helmet>
            <div className="w-1/2 ps-9 pt-6 text-black   overflow-hidden   dark:text-white">
              <div className="cat-item w-full  overflow-hidden  relative ">
                <img
                  src={brandDetails.image}
                  className="cat-img   w-full h-[400px]"
                  alt=""
                />
                <div className="img-caption  text-left absolute bottom-0 px-5  ">
                  <h2 className="absolute  bg-darkSecColor text-lg  text-black  left-0 ">
                  <p className="text-lg  font-bold">{brandDetails.name}</p>
                    
                  </h2>
                  <h3 className="text-lg text-white font-bold">{brandDetails.name}</h3>
                  <p className="text-sm text-white">
                    Mauris fermentum dictum magna.
                    <span className="text-darkSecColor">More info</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
