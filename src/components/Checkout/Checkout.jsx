import React, { useContext } from 'react'
import styles from "./Checkout.module.css"
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function Checkout() {
  let {onilePayment} = useContext(CartContext)
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: (values) => {
      letsPayOnline(values)
    },
  });

  function letsPayOnline(values){
    onilePayment(values)
  }
  return (
    <>

    <div className='container mx-auto'>
    <Helmet>
        <title>E-Commerce - Checkout</title>
      </Helmet>
    <h2 className="text-main text-4xl py-11">CheckOut Form</h2>
    <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="default-input3"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
             Details:
            </label>
            <input
              name="name"
              values={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="default-input3"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.errors.details && formik.touched.details ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.details}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="default-input4"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone:
            </label>
            <input
              name="email"
              type="tel"
              values={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="default-input4"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.phone}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="default-input5"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City:
            </label>
            <input
              name="city"
              type="text"
              values={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="default-input5"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.errors.city && formik.touched.city ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.city}
              </div>
            ) : (
              ""
            )}
          </div>
        
          <div className="text-end">
              <button
             
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="bg-main py-3 px-7 text-white rounded-md"
            >
              PayNow
            </button>
           
          
          </div>
        </form>
    </div>
    
    </>
  )
}
