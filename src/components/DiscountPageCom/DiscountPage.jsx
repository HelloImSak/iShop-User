import React, { useEffect, useState, useRef } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import Filter from "../Filter";
import CardDisCom from "../card/CardDisCom";
import BannerDis from "./BannerDis";
import ScrollToTopButton from "../ScrollToTopButton";

export default function DiscountPage() {
  const [fetchProducts, { data, isLoading, isError, error, isFetching }] = useLazyGetAllQuery();
  const [discountedProducts, setDiscountedProducts] = useState([]); // All discounted products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  // State for filter criteria
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(4950); // Max price
  const [minPrice, setMinPrice] = useState(0); // Min price

  // Fetch all products on component mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Fetch all products from the API
  const fetchAllProducts = async () => {
    try {
      const response = await fetchProducts({
        page: 0, // Fetch the first page
        size: 12, // Fetch a smaller number of products initially
      }).unwrap();

      if (response?.content && response.content.length > 0) {
        // Filter only products with discounts
        const discounted = response.content.filter(
          (product) => product.discount && product.discount > 0
        );
        setDiscountedProducts(discounted); // Set the discounted products in state
        setHasMore(!response.last);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch more products for infinite scroll
  const fetchMoreProducts = async () => {
    if (!hasMore || isFetching) return;

    try {
      const response = await fetchProducts({ page: page + 1, size: 12 }).unwrap();
      if (response?.content && response.content.length > 0) {
        const discounted = response.content.filter(
          (product) => product.discount && product.discount > 0
        );
        setDiscountedProducts((prev) => [...prev, ...discounted]);
        setPage((prev) => prev + 1);
        setHasMore(!response.last);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more products:", error);
      setHasMore(false);
    }
  };

  // Filter products based on selected brands, categories, and price range
  useEffect(() => {
    const filtered = discountedProducts.filter((product) => {
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand?.uuid);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category?.uuid);
      const matchesPrice =
        product.priceOut >= minPrice && product.priceOut <= priceRange;
      return matchesBrand && matchesCategory && matchesPrice;
    });

    setFilteredProducts(filtered);
  }, [selectedBrands, selectedCategories, priceRange, minPrice, discountedProducts]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
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
  }, [hasMore, isFetching, page]);

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
      <main className="w-full min-h-screen pt-8 md:pt-14">
        <BannerDis />
        <div className="py-2 w-full px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-center mb-10 text-primary text-2xl sm:text-3xl md:text-4xl py-2">
            Best Price Products
          </h2>

          <div className="flex flex-col w-full lg:flex-row gap-10 lg:gap-5 xl:gap-5">
            {/* Sidebar Filter */}
            <div className="w-full lg:w-[300px] sticky top-24 h-fit">
              <Filter
                setSelectedBrands={setSelectedBrands}
                setSelectedCategories={setSelectedCategories}
                setPriceRange={setPriceRange}
                setMinPrice={setMinPrice} // Pass setMinPrice to the Filter component
              />
            </div>

            {/* Product Grid */}
            <div className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                {filteredProducts.length === 0 ? (
                  <div className="text-center font-OpenSanSemiBold py-10 text-primary">
                    No discounted products available
                  </div>
                ) : (
                  filteredProducts.map((e) => (
                    <CardDisCom
                      key={e?.uuid}
                      uuid={e?.uuid}
                      thumbnail={e?.thumbnail}
                      name={e?.name}
                      brand={e?.brand?.name}
                      priceOut={e?.priceOut}
                      dis={e?.discount}
                      disPrice={(e.priceOut - e.discount * e.priceOut).toFixed(2)}
                    />
                  ))
                )}
              </div>

              {/* Loading indicator */}
              {hasMore && (
                <div ref={loaderRef} className="h-20 flex items-center justify-center my-4">
                  {isFetching ? "Loading more products..." : ""}
                </div>
              )}
            </div>
          </div>
        </div>
        <ScrollToTopButton />
      </main>
    </>
  );
}