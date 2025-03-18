import React, { useEffect, useRef, useState } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import CardDisCom from "../card/CardDisCom";
import BannerAllPro from "./BannerAllPro";
import FilterDis from "./FilterDis";
import ScrollToTopButton from "../ScrollToTopButton";

export default function AllProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const [fetchProducts, { isFetching }] = useLazyGetAllQuery();

  // State for filter criteria
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(4950); // Max price
  const [showDiscountedItems, setShowDiscountedItems] = useState(false); // Discount filter

  // Initial fetch
  useEffect(() => {
    fetchMoreProducts();
  }, []);

  // Fetch more products for infinite scrolling
  const fetchMoreProducts = async () => {
    if (!hasMore || isFetching) return;

    try {
      const response = await fetchProducts({
        page: page,
        size: 12,
      }).unwrap();

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

  // Filter products based on selected brands, categories, price range, and discount
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand?.uuid);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category?.uuid);
      const matchesPrice = product.priceOut <= priceRange;
      const matchesDiscount =
        !showDiscountedItems || (product.discount && product.discount > 0);

      return matchesBrand && matchesCategory && matchesPrice && matchesDiscount;
    });

    setFilteredProducts(filtered);
  }, [selectedBrands, selectedCategories, priceRange, showDiscountedItems, products]);

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
  }, [hasMore, isFetching, page]);

  return (
    <>
      <main className="min-h-screen pt-8 md:pt-20 sm-pt-90">
        <BannerAllPro />
        <div className="py-10 w-full px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-center mb-10 text-primary text-2xl sm:text-3xl md:text-4xl py-7">
            Best Price Products
          </h2>

          <div className="flex flex-col w-full lg:flex-row gap-10 lg:gap-5 xl:gap-5 lg:ml-[50px]">
            {/* Sidebar Filter */}
            <div className="w-full lg:w-[300px] sticky top-24 h-fit">
              <FilterDis
                setSelectedBrands={setSelectedBrands}
                setSelectedCategories={setSelectedCategories}
                setPriceRange={setPriceRange}
                setShowDiscountedItems={setShowDiscountedItems}
              />
            </div>

            {/* Product Grid */}
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No products found.
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
                      disPrice={(e.priceOut - e.priceOut * e.discount).toFixed(2)}
                      dis={e?.discount || 0} // Discount percentage, default to 0 if not present
                    />
                  ))
                )}
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
        <ScrollToTopButton />
      </main>
    </>
  );
}