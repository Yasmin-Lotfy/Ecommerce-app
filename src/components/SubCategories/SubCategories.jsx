import React, { useEffect, useState } from 'react'
import styles from "./SubCategories.module.css"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';

export default function SubCategories() {
  const [subCat, setSubCat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate()
 async function getSubCatData() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/subcategories").then((respone)=>{
      console.log(respone.data.data, "sub");
      setSubCat(respone.data.data);
      setIsLoading(false)
    }).catch((error)=>{
      console.log(error);
      setIsLoading(false)
    })
  }
useEffect(() => {
  getSubCatData()
  
}, [])
function GoToCategoty(id){

  navigate(`/catdetails/${id}`)
}

  return (
    <>
    

<div className="relative container mx-auto  overflow-x-auto">
<Helmet>
        <title>E-Commerce - SubCategories</title>
      </Helmet>
  {isLoading?<Loader/>: <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    SubCategory
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className='' >View More</span>
                </th>
                
            </tr>
        </thead>
        <tbody>
            {subCat.map((sub)=><tr key={sub._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th onClick={()=>GoToCategoty(sub.category)} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {sub.name}
                </th>
                <td className="px-6 py-4">
                    <span onClick={()=>GoToCategoty(sub.category)}>View More</span>
                </td>
            </tr>)}
          
        </tbody>
    </table> }
   
</div>

    </>
  )
}
