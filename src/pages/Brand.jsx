import React from "react";
import { useGetAllQuery } from "../redux/features/product/productSlice";
import Banner from "../components/BrandPage/Banner";
import FilterCom from "../components/DiscountPageCom/FilterCom";
import CardDisCom from "../components/cart/CardDisCom";
import CardCom from "../components/cart/CardCom";

function Brand() {
  const { data: product, isLoading, isError } = useGetAllQuery();

  // Handling loading and error states
  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (isError) return <div className="flex items-center justify-center min-h-screen">Error loading data</div>;

  return (
    <>
      <main className="min-h-screen md:pt-16">
        <Banner />
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Filter Sidebar - Hidden on mobile, shown on larger screens */}
            <div className="hidden lg:block lg:w-1/4">
              <FilterCom />
            </div>

            {/* Mobile Filter - Visible only on small devices */}
            <div className="lg:hidden mb-4">
              <button className="w-full p-2 bg-primary text-white rounded-md text-center">
                Filter
              </button>
              <FilterCom />
            </div>

            {/* Product Grid */}
            <div className="w-full lg:w-3/4 mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {/* Regular Products */}
                {product?.content?.map((e) => (
                  <div key={e?.uuid} className="flex justify-center">
                    <CardCom
                      thumbnail={e?.thumbnail}
                      name={e?.name}
                      brand={e?.brand?.name}
                      price={e?.priceOut}
                    />
                  </div>
                ))}

                {/* Discounted Products */}
                {product?.content?.map((e) => (
                  <div key={e?.uuid} className="flex justify-center">
                    <CardDisCom
                      thumbnail={e?.thumbnail}
                      name={e?.name}
                      brand={e?.brand?.name}
                      priceOut={e?.priceOut}
                      dis={e?.discount}
                      disPrice={(
                        e.priceOut - (e.priceOut * e.discount) / 100
                      ).toFixed(2)}
                    />
                  </div>
                ))}

                {/* Section for Famous Brands */}
                <div className="col-span-full my-6 text-center">
                  <h2 className="font-bold text-ellipsis mb-10 text-primary text-3xl">
                    Famous Brands
                  </h2>
                </div>

                {/* Additional Products */}
                {product?.content?.map((e) => (
                  <div key={e?.uuid} className="flex justify-center">
                    <CardCom
                      thumbnail={e?.thumbnail}
                      name={e?.name}
                      brand={e?.brand?.name}
                      price={e?.priceOut}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Brand;
