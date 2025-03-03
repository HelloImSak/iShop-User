import React from "react";
import HomeBanner from "../components/home-components/HomeBanner"
import AssuranceSection from "../components/home-components/AssuranceSection";
import PopularCategories from "../components/home-components/PopularCategories"
import NewArrivals from "../components/home-components/NewArrivals"
import CardCom from "../components/cart/CardCom";
export default function Home() {
  return <>
  <HomeBanner/>
  <AssuranceSection/>
  <PopularCategories/>
  <NewArrivals/>
  <CardCom/>
  </>
}
