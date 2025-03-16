import React, { useEffect, useState } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import CardDisCom from "../cart/CardDisCom";

export default function NewArrivals() {
  const [fetchProducts, { data, isLoading, isError, error }] =
    useLazyGetAllQuery();
  const [newestProducts, setNewestProducts] = useState([]);

  useEffect(() => {
    // Fetch products with sorting by creation date (if your API supports it)
    fetchProducts({
      page: 0,
      size: 10,
      sort: "createdAt,desc", // Assuming your API supports this sorting parameter
    });
  }, [fetchProducts]);

  // Update products state when data changes
  useEffect(() => {
    if (data?.content) {
      // If API already sorts by creation date, just take the first 10
      setNewestProducts(data.content.slice(0, 10));
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center animate-pulse text-6xl py-20">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center text-2xl text-red-500 py-20">
        Error loading products: {error?.message || "Unknown error"}
      </div>
    );
  }

  return (
    <main className="">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-primary text-center font-OpenSanBold mb-8 pt-[30px]">
        New Arrivals Products
      </h1>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-7 ">
        {data?.content?.map((e) => (
          <CardCom
            key={e?.uuid}
            uuid={e?.uuid}
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
