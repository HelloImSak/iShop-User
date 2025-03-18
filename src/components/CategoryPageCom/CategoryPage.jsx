import React from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import CardCom from "../card/CardCom";
import Banner from "./Banner";
import FilterDis from "../AllProductCom/FilterDis";

export default function CategoryPage() {
  const { data: proCate, isLoading, isError } = useLazyGetAllQuery();
  console.log("data", proCate);

  return (
    <main className="min-h-screen pt-20">
      <Banner />
      <div className="py-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Section - Left Side */}
          <div className="w-full lg:w-1/4 xl:w-1/5 lg:ml-[50px]">
            <FilterDis />
          </div>

          {/* Cards Section - Right Side */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px] mb-8">
              {proCate?.content?.map((e) => (
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

            <h1 className="font-bold text-center mb-10 text-primary text-2xl sm:text-3xl md:text-4xl py-7">
              Category Products
            </h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px] mb-8">
              {proCate?.content?.map((e) => (
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

            <h1 className="font-bold text-center mb-10 text-primary text-2xl sm:text-3xl md:text-4xl py-7">
              New Arrivals
            </h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px] mb-8">
              {proCate?.content?.map((e) => (
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

            <h1 className="font-bold text-center mb-10 text-primary text-2xl sm:text-3xl md:text-4xl py-7">
              Popular Product
            </h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px] mb-8">
              {proCate?.content?.map((e) => (
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
  );
}
