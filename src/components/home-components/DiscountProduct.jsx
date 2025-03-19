import React, { useEffect, useState } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import CardDisCom from "../card/CardDisCom";

export default function DiscountProduct() {
  const [fetchProducts, { data, isLoading, isError, error }] =
    useLazyGetAllQuery();
  const [discountedProducts, setDiscountedProducts] = useState([]);

  useEffect(() => {
    // Fetch products - we'll filter for discounts client-side
    fetchProducts({
      page: 0,
      size: 50, // Fetch more to ensure we can find 10 discounted products
    });
  }, [fetchProducts]);

  useEffect(() => {
    if (data?.content) {
      // Filter products that have a valid discount
      const productsWithDiscount = data.content.filter(
        (product) => product.discount && product.discount > 0
      );

      // Set only the first 10 discounted products
      setDiscountedProducts(productsWithDiscount.slice(0, 12));
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
    <main className="min-h-screen pt-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary text-center font-OpenSanBold mb-8">
        Discount Products
      </h1>

      <div className="w-full px-4 sm:px-6 lg:px-8">
        {discountedProducts.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px] text-gray-500 text-xl">
            No discounted products available
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
            {discountedProducts.map((e) => (
              <CardDisCom
                key={e?.uuid}
                uuid={e?.uuid}
                thumbnail={e?.thumbnail}
                name={e?.name}
                brand={e?.brand?.name}
                priceOut={e?.priceOut}
                dis={e?.discount}
                disPrice={(e.priceOut - e.priceOut * e.discount).toFixed(2)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
