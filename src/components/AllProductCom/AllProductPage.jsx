import React, { useEffect, useRef, useState } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import CardDisCom from "../card/CardDisCom";
import ScrollToTopButton from "../ScrollToTopButton";
import BannerAllPro from "./BannerAllPro";
import FilterDis from "./FilterDis";

export default function AllProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const [fetchProducts, { isFetching }] = useLazyGetAllQuery();

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(4950);
  const [minPrice, setMinPrice] = useState(0);
  const [showDiscountedItems, setShowDiscountedItems] = useState(false);

  useEffect(() => {
    fetchMoreProducts();
  }, []);

  const fetchMoreProducts = async () => {
    if (!hasMore || isFetching) return;

    try {
      const response = await fetchProducts({ page, size: 12 }).unwrap();
      if (response?.content?.length > 0) {
        setProducts((prev) => [...prev, ...response.content]);
        setPage((prev) => prev + 1);
        setHasMore(!response.last);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasMore(false);
    }
  };

  // Filtering logic
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand?.uuid);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category?.uuid);
      const matchesPrice =
        product.priceOut >= minPrice && product.priceOut <= priceRange;
      const matchesDiscount =
        !showDiscountedItems || (product.discount && product.discount > 0);
      return matchesBrand && matchesCategory && matchesPrice && matchesDiscount;
    });

    setFilteredProducts(filtered);
  }, [
    selectedBrands,
    selectedCategories,
    priceRange,
    minPrice,
    showDiscountedItems,
    products,
  ]);

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

  return (
    <main className="min-h-screen pt-8 md:pt-20">
      <BannerAllPro />
      <div className=" w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full lg:flex-row gap-10 lg:gap-5 xl:gap-5 py-10">
          {/* Sidebar Filter */}
          <div className="w-full lg:w-[300px] sticky top-24 h-fit">
            <FilterDis
              setSelectedBrands={setSelectedBrands}
              setSelectedCategories={setSelectedCategories}
              setPriceRange={setPriceRange}
              setMinPrice={setMinPrice}
              setShowDiscountedItems={setShowDiscountedItems}
            />
          </div>

          {/* Product Grid */}
          <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
              {filteredProducts.length === 0 ? (
                <div className="flex items-center justify-center min-h-screen text-primary text-center font-OpenSanBold">
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
                    disPrice={(e.priceOut - e.priceOut * e.discount).toFixed(2)}
                    dis={e?.discount || 0}
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
  );
}
