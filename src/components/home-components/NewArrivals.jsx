import React, { useEffect, useState } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import CardDisCom from "../card/CardDisCom";

export default function NewArrivals() {
  const [fetchProducts, { data, isLoading, isError, error }] =
    useLazyGetAllQuery();
  const [newestProducts, setNewestProducts] = useState([]);

  useEffect(() => {
    // Fetch products with sorting by creation date (if your API supports it)
    fetchProducts({
      page: 0,
      size: 50,
      sort: "createdAt,desc", // Assuming your API supports this sorting parameter
    });
  }, [fetchProducts]);

  // Update products state when data changes
  useEffect(() => {
    if (data?.content) {
      // If API already sorts by creation date, just take the first 10
      setNewestProducts(data.content.slice(0, 12));
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
    <main className="px-4 lg:px-0">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-primary text-center font-OpenSanBold mb-8 pt-[30px]">
        New Arrivals Products
      </h1>
      {newestProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No new products available
        </div>
      ) : (
        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {newestProducts.map((e) => (
            <CardDisCom
              key={e?.uuid}
              uuid={e?.uuid}
              thumbnail={e?.thumbnail}
              name={e?.name}
              brand={e?.brand?.name}
              priceOut={e?.priceOut}
              disPrice={(e.priceOut - e.discount * e.priceOut).toFixed(2)}
              dis={e?.discount || 0}
            />
          ))}
        </section>
      )}
    </main>
  );
}
