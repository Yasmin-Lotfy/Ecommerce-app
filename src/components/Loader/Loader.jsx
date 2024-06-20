import React from 'react'
import styles from "./Loader.module.css"
import { FallingLines } from 'react-loader-spinner'

export default function Loader() {
  return (
    <>
   <div className="flex justify-center items-center h-screen">

   <FallingLines
  color="#4fa94d"
  width="100"
  visible={true}
  ariaLabel="falling-circles-loading"
  />
   </div>
  </>
  )
}
