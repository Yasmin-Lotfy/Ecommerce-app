import React , {useContext, useState} from 'react'
import styles from "./Login.module.css"
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TokenContext } from '../../Context/TokenContext';
import { Helmet } from 'react-helmet';

export default function Login() {
  let {token , setToken}= useContext(TokenContext)
  const [errorMessage, setErrorMessage] = useState(null);
  const [userMessage, setUserMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate();

  let mySchema = Yup.object({
   
    email: Yup.string().required("email is required").email("not valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "not valid pass"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      loginForm(values);
    },
  });
  async function loginForm(values) {
    setIsLoading(true)
    return axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((data) => {
        console.log(data.data);
        // save token to local storage 
        localStorage.setItem("userToken", data.data.token)
        // set token inside context
        setToken(data.data.token)
        setUserMessage(data.data.message);
        navigate("/");
        setIsLoading(false)

      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
        setIsLoading(false)

      });
  }
  return (
    <>
    <div className="container mx-auto mt-4 mb-10">
      <h2 className="text-main text-4xl py-11">Login Form</h2>
      {errorMessage ? (
        <div
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {errorMessage}
        </div>
      ) : (
        ""
      )}
      {userMessage ? (
        <div
          class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          {userMessage}
        </div>
      ) : (
        ""
      )}

      <form onSubmit={formik.handleSubmit}>
       
        <div className="mb-6">
          <label
            htmlFor="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email:
          </label>
          <input
            name="email"
            type="email"
            values={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="default-input2"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            values={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="default-input2"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
        </div>
      
        <div className="text-end">
        <Helmet>
        <title>E-Commerce - Login</title>
      </Helmet>
          {isLoading?   <button
            type="submit"
            className="bg-main py-3 px-7 text-white rounded-md"
          >
           <i className="fa fa-spinner fa-spin"></i>
          </button> :  <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="bg-main py-3 px-7 text-white rounded-md"
          >
            Login
          </button>}
         
        
        </div>
      </form>
    </div>
  </>
  )
}
