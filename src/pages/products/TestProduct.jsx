import React from "react";
import { useGetAllQuery } from "../../redux/features/product/productSlice";

export default function TestProduct() {
  const { data: dataProducts , isLoading, isError } = useGetAllQuery();
  console.log("product", dataProducts);
  return (
    <>
      {dataProducts?.content?.map((e) => (
        <div key={e.uuid}>
          <h1>{e.name}</h1>
          <p>{e.description}</p>
          <p>{e.priceOut}</p>
        </div>
      ))}
    </>
  );
}
