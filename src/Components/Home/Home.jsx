import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Home.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSilder from "../MainSilder/MainSilder";

export default function Home() {
  
  
 

  return (
    <>
        <MainSilder/>

      <CategoriesSlider/>

      <RecentProducts/>
    </>
  );
}
