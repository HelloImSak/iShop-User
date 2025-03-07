import React from "react";
import { useGetAllBrandQuery } from "../redux/features/brand/brandSlice";

export default function Brand() {
  const { data: brandData } = useGetAllBrandQuery();
//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error loading data</div>;

  console.log("Brand data: ", brandData)

  return (
    <div>
      {brandData?.content?.map((brand) => (
          <div key={brand.uuid}>
            <h3>{brand.name}</h3>
          </div>
        ))}
    </div>
  );
}
