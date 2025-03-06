import React from "react";
import { useGetAllQuery } from "../../redux/features/product/productSlice";

export default function TestProduct() {
  const { data: dataProducts, isLoading, isError } = useGetAllQuery();
  console.log("product", dataProducts);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Brand</th>
            <th className="border border-gray-300 px-4 py-2">Discount</th>
          </tr>
        </thead>
        <tbody>
          {dataProducts?.content?.map((e) => (
            <tr key={e?.uuid}>
              <td className="border border-gray-300 px-4 py-2">{e?.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {e?.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {e?.priceOut}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {e?.brand?.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {e?.discount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
