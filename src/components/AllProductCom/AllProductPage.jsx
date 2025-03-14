import React from "react";
import BannerAllPro from "./BannerAllPro";
import CardCom from "../cart/CardCom";
import FilterDis from "./FilterDis";
import { useGetAllQuery } from "../../redux/service/product/productSlice";
export default function AllProductPage() {
  const { data: proAll } = useGetAllQuery();
  return (
    <>
      <main className="w-full min-h-screen pt-8 md:pt-16">
        <BannerAllPro />
        <div className=" py-10 w-full  px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-center mb-10 text-primary text-2xl sm:text-3xl md:text-4xl  py-7 ">
            Best Price Products
          </h2>

          <div className="flex flex-col w-full lg:flex-row gap-10 lg:gap-5 xl:gap-5">
            {/* Sidebar Filter */}
            <FilterDis />

            {/* Product Grid */}

            <div className="w-full ">
              <div className="grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px] mb-8">
                {proAll?.content?.map((e) => (
                  <CardCom
                    key={e?.uuid}
                    uuid={e?.uuid}
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
    </>
  );
}
