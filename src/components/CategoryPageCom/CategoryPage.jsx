import React from "react";
import { useGetAllQuery } from "../../redux/service/product/productSlice";
import CardCom from "../cart/CardCom";
import Banner from "./Banner";

export default function CategoryPage() {
  const { data: proCate, isLoading, isError } = useGetAllQuery();
  console.log("data", proCate);
  return (
    <main>
      <Banner />
      <div className="container mx-auto pt-[32px] git px-[100px]">
        <h1 className="flex justify-center text-2xl md:text-3xl font-semibold mb-4 mt-8 text-primary">
          Top Category
        </h1>
        {/* section1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
