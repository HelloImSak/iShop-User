import React from "react";
import BannerAllPro from "./BannerAllPro";
import CardCom from "../cart/CardCom";
import FilterDis from "./FilterDis";
import { useGetAllQuery } from "../../redux/service/product/productSlice";

export default function AllProductPage() {
  const { data: proAll } = useGetAllQuery();

  return (
    <main className="min-h-screen pt-8 md:pt-20">
      <BannerAllPro />

      <div className="max-w-screen-2xl mx-auto px-[50px] py-10 sm:px-8 md:px-[50px] lg:px-[80px] xl:px-[100px]">
        <div className="flex flex-col lg:flex-row gap-[30px]">
          {/* Sidebar Filter */}
          <div className="w-full lg:w-1/4 xl:w-1/5">
            <FilterDis />
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {proAll?.content?.map((e) => (
                <CardCom
                  key={e?.uuid}
                  thumbnail={e?.thumbnail}
                  name={e?.name}
                  brand={e?.brand?.name}
                  price={e?.priceOut}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
