import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [userMessage, setUserMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate();
  
  let mySchema = Yup.object({
    name: Yup.string()
      .required("name is req")
      .min(3, "min is 3 chars")
      .max(10, "max is 10 chars"),
    email: Yup.string().required("email is required").email("not valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "not valid pass"),
    rePassword: Yup.string()
      .required("repassword is required")
      .oneOf([Yup.ref("password")], "not match password"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "not valid phone"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      RegisterForm(values);
    },
  });
  async function RegisterForm(values) {
    setIsLoading(true)
    return axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        console.log(data.data.message);
        setUserMessage(data.data.message);
        navigate("/login");
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
        <h2 className="text-main text-4xl py-11">Registration Form</h2>
        <Helmet>
        <title>E-Commerce - Register</title>
      </Helmet>
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
              htmlFor="default-input3"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name:
            </label>
            <input
              name="name"
              values={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="default-input3"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.errors.name && formik.touched.name ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.name}
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
              Email:
            </label>
            <input
              name="email"
              type="email"
              values={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="default-input4"
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
              htmlFor="default-input5"
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
              id="default-input5"
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
          <div className="mb-6">
            <label
              htmlFor="default-input6"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              RePassword
            </label>
            <input
              name="rePassword"
              values={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              id="default-input6"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="default-input7"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone:
            </label>
            <input
              name="phone"
              type="tel"
              values={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="default-input7"
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
          <div className="text-end">
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
              Register
            </button>}
           
          
          </div>
        </form>
      </div>
    </>
  );
}
