import React from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import CardCom from "../cart/CardCom";
import Banner from "./Banner";

export default function CategoryPage() {
  const { data: proCate, isLoading, isError } = useLazyGetAllQuery();
  console.log("data", proCate);
  return (
    <main className="min-h-screen pt-20">
      <Banner />
      <div className="max-w-screen-2xl mx-auto pt-[32px] git md:px-[50px] xl:px-[100px]">
        <h1 className="flex justify-center text-2xl md:text-3xl font-semibold mb-4 mt-8 text-primary">
          Top Category
        </h1>
        {/* section1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {proCate?.content?.map((e) => (
            <CardCom
              key={e?.uuid}
              thumbnail={e?.thumbnail}
              name={e?.name}
              brand={e?.brand?.name}
              price={e?.priceOut}
            />
          ))}
        </div>

        <h1 className="flex justify-center text-2xl md:text-3xl font-semibold mb-4 mt-8 text-primary">
          Category Products
        </h1>
        {/* section2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {proCate?.content?.map((e) => (
            <CardCom
              key={e?.uuid}
              thumbnail={e?.thumbnail}
              name={e?.name}
              brand={e?.brand?.name}
              price={e?.priceOut}
            />
          ))}
        </div>
        <h1 className="flex justify-center text-2xl md:text-3xl font-semibold mb-4 mt-8 text-primary">
          New Arrivals
        </h1>
        {/* section3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {proCate?.content?.map((e) => (
            <CardCom
              key={e?.uuid}
              thumbnail={e?.thumbnail}
              name={e?.name}
              brand={e?.brand?.name}
              price={e?.priceOut}
            />
          ))}
        </div>
        <h1 className="flex justify-center text-2xl md:text-3xl font-semibold mb-4 mt-8 text-primary">
          Popular Product
        </h1>
        {/* section4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {proCate?.content?.map((e) => (
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
    </main>
  );
}
