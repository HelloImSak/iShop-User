import React, { useEffect, useState } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import FilterDis from "../AllProductCom/FilterDis";
import CardDisCom from "../cart/CardDisCom";
import BannerDis from "./BannerDis";
export default function DiscountPage() {
  const [fetchProducts, { data, isLoading, isError, error }] =
    useLazyGetAllQuery();
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = React.useRef(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Initial fetch
  useEffect(() => {
    fetchMoreProducts();
  }, []);

  const fetchMoreProducts = async () => {
    if (!hasMore || isFetchingMore) return;

    setIsFetchingMore(true);
    try {
      const response = await fetchProducts({
        page: page,
        size: 20, // Fetch a good amount each time
      }).unwrap();

      if (response?.content && response.content.length > 0) {
        // Filter only products with discounts
        const newDiscountedProducts = response.content.filter(
          (product) => product.discount && product.discount > 0
        );

        setDiscountedProducts((prev) => [...prev, ...newDiscountedProducts]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(!response.last); // Stop if this was the last page
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  // Set up infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingMore) {
          fetchMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.disconnect();
      }
    };
  }, [hasMore, isFetchingMore, page]);

  if (isLoading && discountedProducts.length === 0) {
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
      <main className="min-h-screen pt-8 md:pt-16">
        <BannerDis />
        <div className="container mx-auto py-10 w-full max-w-[1425px] px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-center mb-10 text-primary text-2xl sm:text-3xl md:text-4xl">
            Best Price Products
          </h2>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sidebar Filter */}
            <FilterDis />

            {/* Product Grid */}
            <div className="w-full lg:w-3/4">
              {discountedProducts.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No discounted products available
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {discountedProducts.map((e) => (
                      <CardDisCom
                        key={e?.uuid}
                        uuid={e?.uuid}
                        thumbnail={e?.thumbnail}
                        name={e?.name}
                        brand={e?.brand?.name}
                        priceOut={e?.priceOut}
                        dis={e?.discount}
                        disPrice={(e.priceOut - e.discount * 100).toFixed(2)}
                      />
                    ))}
                  </div>
                  {hasMore && (
                    <div
                      ref={loaderRef}
                      className="h-20 flex items-center justify-center my-4"
                    >
                      {isFetchingMore ? "Loading more products..." : ""}
                    </div>
                  )}

                  {/* End of results message */}
                  {/* {!hasMore && discountedProducts.length > 0 && (
                    <div className="text-center mt-6 mb-10 text-gray-600">
                      No more discounted products to load
                    </div>
                  )} */}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
