import React from "react";
import { useGetAllBrandQuery } from "../../redux/features/brand/brandSlice";
import CardCom from "../cart/CardCom";
import Banner from "./Banner";
import FilterCom from "../DiscountPageCom/FilterCom";

export default function AppleBrand() {
  const { data: brandData, isLoading, isError } = useGetAllBrandQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  console.log("Brand data: ", brandData);
  return (
    <>
      <main className="min-h-screen pt-8 md:pt-16">
        {/* <Banner /> */}
        {/* <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-20">
          {brandData?.content?.map((e) => (
            <FilterCom
            key={e?.uuid}
            name={e?.name}

            />
          ))}
        </div> */}
        {/* <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {brandData?.content?.map((e) => (
              <CardCom
                key={e?.uuid}
                thumbnail={e?.brandLogo}
                name={e?.name}
                description={e?.description}
                // brand={e?.brand?.name}
                // logo={e?.brandLogo}
                // disPrice={e.disPrice}
              />
            ))}
          </div>
        </div> */}
        <FilterCom/>
      </main>
    </>
  );
}
