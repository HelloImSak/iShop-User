import React from "react";
import { useGetAllQuery } from "../redux/service/product/productSlice";
import { useGetAllBrandQuery } from "../redux/features/brand/brandSlice";
import Banner from "../components/BrandPage/Banner";
import FilterCom from "../components/DiscountPageCom/FilterCom";
import CardCom from "../components/cart/CardCom";
import CardDisCom from "../components/cart/CardDisCom";

function Brand() {
  const selectedUUIDs = [
    "fde730bb-9006-4783-a1f9-a8c18ba11005",
    "31462521-2e68-4f84-971d-c57bbbf738b4",
    "4a17f357-6a25-44df-a9e2-1f314ace366d",
  ];
  const { data: ProductBrand } = useGetAllBrandQuery();
  const { data: product, isLoading, isError } = useGetAllQuery();

  // Handling loading and error states
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error loading data
      </div>
    );

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
            <div className="lg:hidden mb-4">
              <FilterCom />
            </div>
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
                {product?.content?.map((e) => (
                  <div key={e?.uuid} className="flex justify-center">
                    <CardDisCom
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
                  </div>
                ))}
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
                <div className="col-span-full my-6 text-center">
                  <h2 className="font-bold text-ellipsis mb-10 text-primary text-3xl underline">
                    Famous Brands
                  </h2>
                </div>
                {ProductBrand?.content &&
                  ProductBrand.content
                    .filter((e) => selectedUUIDs.includes(e?.uuid))
                    .map((e) => (
                      <div key={e?.uuid} className="flex justify-center">
                        <img
                          src={e?.brandLogo}
                          alt={e?.name}
                          className="w-48 h-48 object-contain shadow-md rounded-full transition-transform duration-300 hover:scale-110 hover:shadow-lg"
                          onError={(e) => (e.target.src = "/fallback-logo.png")}
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
