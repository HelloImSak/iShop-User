import React, { useEffect, useState } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import CardDisCom from "../cart/CardDisCom";

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

  // Filter products with discounts when data changes
  useEffect(() => {
    if (data?.content) {
      // Filter products that have a discount > 0
      const productsWithDiscount = data.content.filter(
        (product) => product.discount && product.discount > 0
      );

      // Take only the first 10
      setDiscountedProducts(productsWithDiscount.slice(0, 10));
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
    <>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-primary text-center font-OpenSanBold mb-[50px] pt-[30px]">
        Discount Products
      </h1>

      <div className="w-full px-4 sm:px-[50px]">
        {discountedProducts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No discounted products available
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 mb-8">
            {discountedProducts.map((e) => (
              <CardDisCom
                key={e?.uuid}
                uuid={e?.uuid}
                thumbnail={e?.thumbnail}
                name={e?.name}
                brand={e?.brand?.name}
                priceOut={e?.priceOut}
                dis={e?.discount}
                disPrice={(
                  e.priceOut -
                  (e.priceOut * e.discount) / 100
                ).toFixed(2)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
