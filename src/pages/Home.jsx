import React from "react";
import HomeBanner from "../components/home-components/HomeBanner"
import AssuranceSection from "../components/home-components/AssuranceSection";
import PopularCategories from "../components/home-components/PopularCategories"
import NewArrivals from "../components/home-components/NewArrivals";


export default function Home() {
  return <main>
  <div className="pt-40">
  <HomeBanner/>
  </div>
  <div className="pt-14">
  <AssuranceSection/>
  </div>
  <div className="pt-14">
  <PopularCategories/>
  </div>
  <div>
    <NewArrivals/>
  </div>

  </main>
}
