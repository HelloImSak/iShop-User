import React from "react";
import HomeBanner from "../components/home-components/HomeBanner"
import AssuranceSection from "../components/home-components/AssuranceSection";
import PopularCategories from "../components/home-components/PopularCategories"
import DiscountProduct from "../components/home-components/DiscountProduct"
import NewArrivals from "../components/home-components/NewArrivals";


export default function Home() {
  return <main>
  <div className="pt-40">
  <HomeBanner/>
  </div>
  <div className="pt-10">
  <AssuranceSection/>
  </div>
  <div className="pt-10">
  <PopularCategories/>
  </div>
  <div className="pt-10">
    <NewArrivals/>
  </div>
  <div className="pt-10">
    <DiscountProduct/>
  </div>
  </main>
}
