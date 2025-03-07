import React from "react";
import Banner from "../components/BrandPage/Banner";
import FilterCom from "../components/DiscountPageCom/FilterCom";


function Brand() {
  return (
    <>
      <main className="bg-zinc-100">
        <Banner />
        <FilterCom />
      </main>
    </>
  );
}
export default Brand;