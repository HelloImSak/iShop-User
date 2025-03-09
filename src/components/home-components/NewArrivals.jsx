import React from "react";
import { useGetAllQuery } from "../../redux/service/product/productSlice";
import CardCom from "../cart/CardCom";

export default function NewArrivals() {
  const { data, isLoading, isError } = useGetAllQuery();
  console.log("Product data", data);
  if (isLoading) {
    return (
      <div className="flex justify-center animate-pulse text-6xl">
        Loading...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center animate-pulse text-6xl">
        console.error(error)
      </div>
    );
  }
  return (
    <main className="px-[50px]">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl  text-primary text-center font-OpenSanBold mb-8">
        New Arrivals Products
      </h1>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 ">
        {data?.content?.map((e) => (
          <CardCom
            key={e?.uuid}
            thumbnail={e?.thumbnail}
            name={e?.name}
            brand={e?.brand?.name}
            price={e?.priceOut}
          />
        ))}
      </section>
    </main>
  );
}
