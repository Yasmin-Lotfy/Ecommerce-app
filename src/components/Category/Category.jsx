import React, { useEffect, useState } from 'react'
import styles from "./Category.module.css"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 async function getCatData() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    .then((data)=>{
      setCategories(data.data.data)
      console.log(data, "cat");
      setIsLoading(false)
    })
    .catch((error)=>{
      setIsLoading(false)
    })
  }
  useEffect(() => {
    getCatData()
  }, [])
  

  return (
    <>
    <div className="container mx-auto mt-24">
    <Helmet>
        <title>E-Commerce - Categories</title>
      </Helmet>
      {isLoading? <Loader/>: <div className="flex  flex-wrap justify-start items-center">
     {categories.map((cat)=>   <div key={cat._id} className="p-4 w-full sm:w-1/2 lg:w-1/3">
       <Link to={`/catdetails/${cat._id}`} className=" text-white hover:text-white dark:hover:text-white">
       <div className="cat-item relative ">
          <img src={cat.image} className='cat-img w-full h-[400px]' alt="" />
          <div className="img-caption text-left absolute bottom-0 px-5  ">
            <h2 className='absolute  bg-darkSecColor text-lg  text-black dark: left-0 '>{cat.name}</h2>
            <h3 className='text-lg font-bold'>Relax & Work</h3>
            <p className='text-sm'>Mauris fermentum dictum magna. <span className='text-darkSecColor'>More info</span>.</p>
          </div>
        </div></Link>
        </div>)}
      </div>}
     
    </div>

    </>
  )
}
