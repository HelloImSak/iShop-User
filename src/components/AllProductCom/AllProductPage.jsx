import React, { useEffect, useRef, useState } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import CardDisCom from "../card/CardDisCom"; // Changed from CardCom to CardDisCom
import BannerAllPro from "./BannerAllPro";
import FilterDis from "./FilterDis";
import ScrollToTopButton from "../ScrollToTopButton";

export default function AllProductPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const [fetchProducts, { isFetching }] = useLazyGetAllQuery();

  // Initial fetch
  useEffect(() => {
    fetchMoreProducts();
  }, []);

  const fetchMoreProducts = async () => {
    if (!hasMore || isFetching) return;

    try {
      const response = await fetchProducts({ page, size: 12 }).unwrap();

      // Check if we got valid data
      if (response?.content && response.content.length > 0) {
        setProducts((prev) => [...prev, ...response.content]);
        setPage((prev) => prev + 1);
        setHasMore(!response.last); // Stop fetching when it's the last page
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasMore(false);
    }
  };

  // Set up Intersection Observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          fetchMoreProducts();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.disconnect();
      }
    };
  }, [hasMore, isFetching, page]); // Add dependencies to re-create observer when these change

  return (
    <>
      <main className="min-h-screen pt-8 md:pt-20">
        <BannerAllPro />
        <div className=" py-10 w-full  px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-center mb-10 text-primary text-2xl sm:text-3xl md:text-4xl  py-7 ">
            Best Price Products
          </h2>

          <div className="flex flex-col w-full lg:flex-row gap-10 lg:gap-5 xl:gap-5 lg:ml-[50px]">
            {/* Sidebar Filter */}
            <FilterDis />

            {/* Product Grid */}
            <div className="">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {products.map((e) => (
                  <CardDisCom
                    key={e?.uuid}
                    uuid={e?.uuid}
                    thumbnail={e?.thumbnail}
                    name={e?.name}
                    brand={e?.brand?.name}
                    priceOut={e?.priceOut}
                    disPrice={(e.priceOut - e.priceOut * e.discount).toFixed(2)}
                    dis={e?.discount || 0} // Discount percentage, default to 0 if not present
                  />
                ))}
              </div>

              {/* Loading indicator */}
              {hasMore && (
                <div
                  ref={loaderRef}
                  className="h-20 flex items-center justify-center my-4"
                >
                  {isFetching ? "Loading more products..." : ""}
                </div>
              )}
            </div>
          </div>
        </div>
        <ScrollToTopButton/>
      </main>
    </>
  );
}
