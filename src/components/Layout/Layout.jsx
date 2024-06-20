import React from "react";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import NavBar2 from "../NavBar2/NavBar2";

export default function Layout() {
  return (
    <>
      <NavBar2 />
      <Outlet />
    </>
  );
}
