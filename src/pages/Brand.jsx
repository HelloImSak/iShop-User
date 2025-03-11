// import React from "react";
// import { useGetAllQuery } from "../redux/service/product/productSlice";
// import Banner from "../components/BrandPage/Banner";
// import FilterCom from "../components/DiscountPageCom/FilterCom";
// import CardCom from "../components/cart/CardCom";
// import CardDisCom from "../components/cart/CardDisCom";
// import LogoBrand from "../components/BrandPage/LogoBrand";

// function Brand() {
//   const { data: product, isLoading, isError } = useGetAllQuery();

//   // Handling loading and error states
//   if (isLoading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         Loading...
//       </div>
//     );
//   if (isError)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         Error loading data
//       </div>
//     );

//   return (
//     <>
//       <main className="min-h-screen md:pt-16">
//         <Banner />
//         <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-20">
//           <div className="flex flex-col lg:flex-row gap-10">
//             {/* Filter Sidebar - Hidden on mobile, shown on larger screens */}
//             <div className="hidden lg:block lg:w-1/5">
//               <FilterCom />
//             </div>
//             <div className="lg:hidden mb-4">
//               <FilterCom />
//             </div>
//             <div className="w-full lg:w-3/4 mx-auto">
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {/* Regular Products */}
//                 {product?.content?.map((e) => (
//                   <div key={e?.uuid} className="flex justify-center">
//                     <CardCom
//                       thumbnail={e?.thumbnail}
//                       name={e?.name}
//                       brand={e?.brand?.name}
//                       price={e?.priceOut}
//                     />
//                   </div>
//                 ))}
//                 {product?.content?.map((e) => (
//                   <div key={e?.uuid} className="flex justify-center">
//                     <CardDisCom
//                       thumbnail={e?.thumbnail}
//                       name={e?.name}
//                       brand={e?.brand?.name}
//                       priceOut={e?.priceOut}
//                       dis={e?.discount}
//                       disPrice={(
//                         e.priceOut -
//                         (e.priceOut * e.discount) / 100
//                       ).toFixed(2)}
//                     />
//                   </div>
//                 ))}
//                 {product?.content?.map((e) => (
//                   <div key={e?.uuid} className="flex justify-center">
//                     <CardCom
//                       thumbnail={e?.thumbnail}
//                       name={e?.name}
//                       brand={e?.brand?.name}
//                       price={e?.priceOut}
//                     />
//                   </div>
//                 ))}
//                 <div>
//                   <LogoBrand/>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// export default Brand;

import React from "react";
import { useGetAllQuery } from "../redux/service/product/productSlice";
import Banner from "../components/BrandPage/Banner";
import FilterCom from "../components/DiscountPageCom/FilterCom";
import CardCom from "../components/cart/CardCom";
import CardDisCom from "../components/cart/CardDisCom";
import LogoBrand from "../components/BrandPage/LogoBrand";

function Brand() {
  const { data: product, isLoading, isError, error } = useGetAllQuery();

  // Handling loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Handling error state with more details
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">
          Error loading data: {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  // Validate product data before rendering
  if (!product || !product.content || !Array.isArray(product.content)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">No products available.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      <Banner />
      <div className="container mx-[100px] py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:block lg:w-1/5">
            <FilterCom />
          </div>
          <div className="lg:hidden mb-4">
            <FilterCom />
          </div>

          {/* Product Grid with Responsive Columns */}
          <div className="w-full lg:w-4/5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6">
              {/* Render products with conditional CardCom or CardDisCom */}
              {product.content.map((e) => (
                <div
                  key={e?.uuid}
                  className="flex justify-center w-full h-auto mb-6"
                >
                  {e?.discount ? (
                    <CardDisCom
                      thumbnail={e?.thumbnail || "/placeholder-image.jpg"} // Fallback image
                      name={e?.name || "Unknown Product"}
                      brand={e?.brand?.name || "Unknown Brand"}
                      priceOut={e?.priceOut || 0}
                      dis={e?.discount || 0}
                      disPrice={(
                        (e?.priceOut || 0) -
                        ((e?.priceOut || 0) * (e?.discount || 0)) / 100
                      ).toFixed(2)}
                      className="w-[200px] h-[300px] mb-4"
                    />
                  ) : (
                    <CardCom
                      thumbnail={e?.thumbnail || "/placeholder-image.jpg"} // Fallback image
                      name={e?.name || "Unknown Product"}
                      brand={e?.brand?.name || "Unknown Brand"}
                      price={e?.priceOut || 0}
                      className="w-[200px] h-[300px] mb-4"
                    />
                  )}
                </div>
              ))}
              {/* Optional LogoBrand at the end */}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-full">
        <LogoBrand />
      </div>
    </main>
  );
} 

export default Brand;
