// import React, { useEffect, useRef, useState } from "react";
// import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
// import CardDisCom from "../card/CardDisCom";
// import BannerAllPro from "./BannerAllPro";
// import FilterDis from "./FilterDis";
// import ScrollToTopButton from "../ScrollToTopButton";

// export default function AllProductPage() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const loaderRef = useRef(null);
//   const [fetchProducts, { isFetching }] = useLazyGetAllQuery();

//   // Filter states
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [priceRange, setPriceRange] = useState(4950);
//   const [minPrice, setMinPrice] = useState(0);
//   const [showDiscountedItems, setShowDiscountedItems] = useState(false);

//   useEffect(() => {
//     fetchMoreProducts();
//   }, []);

//   const fetchMoreProducts = async () => {
//     if (!hasMore || isFetching) return;

//     try {
//       const response = await fetchProducts({ page, size: 12 }).unwrap();
//       if (response?.content?.length > 0) {
//         setProducts((prev) => [...prev, ...response.content]);
//         setPage((prev) => prev + 1);
//         setHasMore(!response.last);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setHasMore(false);
//     }
//   };

//   // Filtering logic
//   useEffect(() => {
//     const filtered = products.filter((product) => {
//       const matchesBrand =
//         selectedBrands.length === 0 ||
//         selectedBrands.includes(product.brand?.uuid);
//       const matchesCategory =
//         selectedCategories.length === 0 ||
//         selectedCategories.includes(product.category?.uuid);
//       const matchesPrice =
//         product.priceOut >= minPrice && product.priceOut <= priceRange;
//       const matchesDiscount =
//         !showDiscountedItems || (product.discount && product.discount > 0);
//       return matchesBrand && matchesCategory && matchesPrice && matchesDiscount;
//     });

//     setFilteredProducts(filtered);
//   }, [
//     selectedBrands,
//     selectedCategories,
//     priceRange,
//     minPrice,
//     showDiscountedItems,
//     products,
//   ]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasMore && !isFetching) {
//           fetchMoreProducts();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => {
//       if (loaderRef.current) {
//         observer.disconnect();
//       }
//     };
//   }, [hasMore, isFetching, page]);

//   return (
//     <main className="min-h-screen pt-8 md:pt-20">
//       <BannerAllPro />
//       <div className=" w-full px-4 sm:px-6 lg:px-8">
//         <h2 className="font-bold text-center text-primary text-2xl sm:text-3xl md:text-4xl ">
//           Best Price Products
//         </h2>

//         <div className="flex flex-col w-full lg:flex-row gap-10 lg:gap-5 xl:gap-5 py-10">
//           {/* Sidebar Filter */}
//           <div className="w-full lg:w-[300px] sticky top-24 h-fit">
//             <FilterDis
//               setSelectedBrands={setSelectedBrands}
//               setSelectedCategories={setSelectedCategories}
//               setPriceRange={setPriceRange}
//               setMinPrice={setMinPrice}
//               setShowDiscountedItems={setShowDiscountedItems}
//             />
//           </div>

//           {/* Product Grid */}
//           <div className="w-full">
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
//               {filteredProducts.length === 0 ? (
//                 <div className="flex items-center justify-center min-h-screen text-primary text-center font-OpenSanBold">
//                 No discounted products available
//               </div>
//               ) : (
//                 filteredProducts.map((e) => (
//                   <CardDisCom
//                     key={e?.uuid}
//                     uuid={e?.uuid}
//                     thumbnail={e?.thumbnail}
//                     name={e?.name}
//                     brand={e?.brand?.name}
//                     priceOut={e?.priceOut}
//                     disPrice={(e.priceOut - e.priceOut * e.discount).toFixed(2)}
//                     dis={e?.discount || 0}
//                   />
//                 ))
//               )}
//             </div>

//             {/* Loading indicator */}
//             {hasMore && (
//               <div
//                 ref={loaderRef}
//                 className="h-20 flex items-center justify-center my-4"
//               >
//                 {isFetching ? "Loading more products..." : ""}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <ScrollToTopButton />
//     </main>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";
// import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
// import { useLocation } from "react-router-dom";
// import CardDisCom from "../card/CardDisCom";
// import BannerAllPro from "./BannerAllPro";
// import FilterDis from "./FilterDis";
// import ScrollToTopButton from "../ScrollToTopButton";

// export default function AllProductPage() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const loaderRef = useRef(null);
//   const [fetchProducts, { isFetching }] = useLazyGetAllQuery();
//   const location = useLocation();

//   // Filter states
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [priceRange, setPriceRange] = useState(4950);
//   const [minPrice, setMinPrice] = useState(0);
//   const [showDiscountedItems, setShowDiscountedItems] = useState(false);

//   // Get category from query parameter
//   const queryParams = new URLSearchParams(location.search);
//   const selectedCategory = queryParams.get("category");

//   // Automatically set the selected category in the filter when the page loads
//   useEffect(() => {
//     if (selectedCategory) {
//       setSelectedCategories([selectedCategory]);
//     }
//   }, [selectedCategory]);

//   useEffect(() => {
//     fetchMoreProducts();
//   }, []);

//   const fetchMoreProducts = async () => {
//     if (!hasMore || isFetching) return;

//     try {
//       const response = await fetchProducts({ page, size: 12 }).unwrap();
//       if (response?.content?.length > 0) {
//         setProducts((prev) => [...prev, ...response.content]);
//         setPage((prev) => prev + 1);
//         setHasMore(!response.last);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setHasMore(false);
//     }
//   };

//   // Filtering logic
//   useEffect(() => {
//     const filtered = products.filter((product) => {
//       const matchesBrand =
//         selectedBrands.length === 0 ||
//         selectedBrands.includes(product.brand?.uuid);
//       const matchesCategory =
//         selectedCategories.length === 0 ||
//         selectedCategories.includes(product.category?.name); // Use category name for filtering
//       const matchesPrice =
//         product.priceOut >= minPrice && product.priceOut <= priceRange;
//       const matchesDiscount =
//         !showDiscountedItems || (product.discount && product.discount > 0);
//       return matchesBrand && matchesCategory && matchesPrice && matchesDiscount;
//     });

//     setFilteredProducts(filtered);
//   }, [
//     selectedBrands,
//     selectedCategories,
//     priceRange,
//     minPrice,
//     showDiscountedItems,
//     products,
//   ]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasMore && !isFetching) {
//           fetchMoreProducts();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => {
//       if (loaderRef.current) {
//         observer.disconnect();
//       }
//     };
//   }, [hasMore, isFetching, page]);

//   return (
//     <main className="min-h-screen pt-8 md:pt-20">
//       <BannerAllPro />
//       <div className=" w-full px-4 sm:px-6 lg:px-8">
//         <h2 className="font-bold text-center text-primary text-2xl sm:text-3xl md:text-4xl ">
//           Best Price Products
//         </h2>

//         <div className="flex flex-col w-full lg:flex-row gap-10 lg:gap-5 xl:gap-5 py-10">
//           {/* Sidebar Filter */}
//           <div className="w-full lg:w-[300px] sticky top-24 h-fit">
//             <FilterDis
//               setSelectedBrands={setSelectedBrands}
//               setSelectedCategories={setSelectedCategories}
//               setPriceRange={setPriceRange}
//               setMinPrice={setMinPrice}
//               setShowDiscountedItems={setShowDiscountedItems}
//               selectedCategories={selectedCategories} // Pass selectedCategories to FilterDis
//             />
//           </div>

//           {/* Product Grid */}
//           <div className="w-full">
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
//               {filteredProducts.length === 0 ? (
//                 <div className="flex items-center justify-center min-h-screen text-primary text-center font-OpenSanBold">
//                   No products available
//                 </div>
//               ) : (
//                 filteredProducts.map((e) => (
//                   <CardDisCom
//                     key={e?.uuid}
//                     uuid={e?.uuid}
//                     thumbnail={e?.thumbnail}
//                     name={e?.name}
//                     brand={e?.brand?.name}
//                     priceOut={e?.priceOut}
//                     disPrice={(e.priceOut - e.priceOut * e.discount).toFixed(2)}
//                     dis={e?.discount || 0}
//                   />
//                 ))
//               )}
//             </div>

//             {/* Loading indicator */}
//             {hasMore && (
//               <div
//                 ref={loaderRef}
//                 className="h-20 flex items-center justify-center my-4"
//               >
//                 {isFetching ? "Loading more products..." : ""}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <ScrollToTopButton />
//     </main>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";
// import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
// import { useLocation } from "react-router-dom";
// import CardDisCom from "../card/CardDisCom";
// import BannerAllPro from "./BannerAllPro";
// import FilterDis from "./FilterDis";
// import ScrollToTopButton from "../ScrollToTopButton";

// export default function AllProductPage() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const loaderRef = useRef(null);
//   const [fetchProducts, { isFetching }] = useLazyGetAllQuery();
//   const location = useLocation();

//   // Filter states
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [priceRange, setPriceRange] = useState(4950);
//   const [minPrice, setMinPrice] = useState(0);
//   const [showDiscountedItems, setShowDiscountedItems] = useState(false);

//   // Get category from query parameter
//   const queryParams = new URLSearchParams(location.search);
//   const selectedCategory = queryParams.get("category");

//   // Automatically set the selected category in the filter when the page loads
//   useEffect(() => {
//     if (selectedCategory) {
//       setSelectedCategories([selectedCategory]);
//     }
//   }, [selectedCategory]);

//   useEffect(() => {
//     fetchMoreProducts();
//   }, []);

//   const fetchMoreProducts = async () => {
//     if (!hasMore || isFetching) return;

//     try {
//       const response = await fetchProducts({ page, size: 12 }).unwrap();
//       if (response?.content?.length > 0) {
//         setProducts((prev) => [...prev, ...response.content]);
//         setPage((prev) => prev + 1);
//         setHasMore(!response.last);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setHasMore(false);
//     }
//   };

//   // Filtering logic
//   useEffect(() => {
//     const filtered = products.filter((product) => {
//       const matchesBrand =
//         selectedBrands.length === 0 ||
//         selectedBrands.includes(product.brand?.uuid);
//       const matchesCategory =
//         selectedCategories.length === 0 ||
//         selectedCategories.includes(product.category?.uuid);
//       const matchesPrice =
//         product.priceOut >= minPrice && product.priceOut <= priceRange;
//       const matchesDiscount =
//         !showDiscountedItems || (product.discount && product.discount > 0);
//       return matchesBrand && matchesCategory && matchesPrice && matchesDiscount;
//     });

//     setFilteredProducts(filtered);
//   }, [
//     selectedBrands,
//     selectedCategories,
//     priceRange,
//     minPrice,
//     showDiscountedItems,
//     products,
//   ]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasMore && !isFetching) {
//           fetchMoreProducts();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => {
//       if (loaderRef.current) {
//         observer.disconnect();
//       }
//     };
//   }, [hasMore, isFetching, page]);

//   return (
//     <main className="min-h-screen pt-8 md:pt-20">
//       <BannerAllPro />
//       <div className=" w-full px-4 sm:px-6 lg:px-8">
//         <h2 className="font-bold text-center text-primary text-2xl sm:text-3xl md:text-4xl ">
//           Best Price Products
//         </h2>

//         <div className="flex flex-col w-full lg:flex-row gap-10 lg:gap-5 xl:gap-5 py-10">
//           {/* Sidebar Filter */}
//           <div className="w-full lg:w-[300px] sticky top-24 h-fit">
//             <FilterDis
//               setSelectedBrands={setSelectedBrands}
//               setSelectedCategories={setSelectedCategories}
//               setPriceRange={setPriceRange}
//               setMinPrice={setMinPrice}
//               setShowDiscountedItems={setShowDiscountedItems}
//               selectedCategories={selectedCategories} // Pass selectedCategories to FilterDis
//             />
//           </div>

//           {/* Product Grid */}
//           <div className="w-full">
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
//               {filteredProducts.length === 0 ? (
//                 <div className="flex items-center justify-center min-h-screen text-primary text-center font-OpenSanBold">
//                   No products available
//                 </div>
//               ) : (
//                 filteredProducts.map((e) => (
//                   <CardDisCom
//                     key={e?.uuid}
//                     uuid={e?.uuid}
//                     thumbnail={e?.thumbnail}
//                     name={e?.name}
//                     brand={e?.brand?.name}
//                     priceOut={e?.priceOut}
//                     disPrice={(e.priceOut - e.priceOut * e.discount).toFixed(2)}
//                     dis={e?.discount || 0}
//                   />
//                 ))
//               )}
//             </div>

//             {/* Loading indicator */}
//             {hasMore && (
//               <div
//                 ref={loaderRef}
//                 className="h-20 flex items-center justify-center my-4"
//               >
//                 {isFetching ? "Loading more products..." : ""}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <ScrollToTopButton />
//     </main>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import { useLocation } from "react-router-dom";
import CardDisCom from "../card/CardDisCom";
import BannerAllPro from "./BannerAllPro";
import FilterDis from "./FilterDis";
import ScrollToTopButton from "../ScrollToTopButton";

export default function AllProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const [fetchProducts, { isFetching }] = useLazyGetAllQuery();
  const location = useLocation();

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(4950);
  const [minPrice, setMinPrice] = useState(0);
  const [showDiscountedItems, setShowDiscountedItems] = useState(false);

  // Get category from query parameter
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  console.log("Selected Category from Query Params:", selectedCategory);

  // Automatically add the selected category to the filter when the page loads
  useEffect(() => {
    if (selectedCategory && !selectedCategories.includes(selectedCategory)) {
      setSelectedCategories((prev) => [...prev, selectedCategory]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchMoreProducts();
  }, []);

  const fetchMoreProducts = async () => {
    if (!hasMore || isFetching) return;

    try {
      const response = await fetchProducts({ page, size: 12 }).unwrap();
      if (response?.content?.length > 0) {
        console.log("API Response:", response.content); // Log the API response
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
    console.log("Selected Categories:", selectedCategories);
    console.log("Products:", products);

    const filtered = products.filter((product) => {
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand?.uuid);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category?.uuid); // Use category ID or name
      const matchesPrice =
        product.priceOut >= minPrice && product.priceOut <= priceRange;
      const matchesDiscount =
        !showDiscountedItems || (product.discount && product.discount > 0);

      console.log(
        "Product:",
        product.name,
        "Category:",
        product.category?.uuid,
        "Matches Category:",
        matchesCategory
      );

      return matchesBrand && matchesCategory && matchesPrice && matchesDiscount;
    });

    console.log("Filtered Products:", filtered);
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
              selectedCategories={selectedCategories} // Pass selectedCategories to FilterDis
            />
          </div>

          {/* Product Grid */}
          <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
              {filteredProducts.length === 0 ? (
                <div className="flex items-center justify-center sm:w-[250px] md:w-[500px] lg:w-[1000px] xl:w-[1200px]">
                  <p className="text-lg sm:text-xl md:text-2xl text-primary text-center font-OpenSanBold">
                    No products available
                  </p>
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
                {isFetching ? (
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : (
                  "Loading more products..."
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  );
}
