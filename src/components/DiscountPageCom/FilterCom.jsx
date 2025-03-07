import React, { useState } from "react";
import { useGetAllBrandQuery } from "../../redux/features/brand/brandSlice";

export default function FilterCom() {
  const [price, setPrice] = useState(4950);
  const { data: brandData, isLoading, isError } = useGetAllBrandQuery();

  const proList = [
    "Phone",
    "Laptop",
    "Desktop",
    "Keyboard",
    "Mouse",
    "Speaker",
    "Headphone",
  ];

  // Handle loading and error states
  if (isLoading) return <aside className="w-1/4 rounded-lg">Loading...</aside>;
  if (isError) return <aside className="w-1/4 rounded-lg">Error loading brands</aside>;

  // Log to check if component re-renders unexpectedly
  console.log("FilterCom rendered");

  return (
    <aside className="w-1/4 rounded-lg">
      <h3 className="font-semibold text-[20px] text-primary mb-3">
        Product Categories
      </h3>
      <ul className="space-y-2 text-[16px] text-gray-600">
        {proList.map((category) => (
          <li key={category} className="flex items-center">
            <input
              type="checkbox"
              id={category}
              className="mr-2 appearance-none h-4 w-4 bg-white checked:bg-blue-500 checked:ring-transparent"
            />
            <label htmlFor={category}>{category}</label>
          </li>
        ))}
      </ul>

      <h3 className="font-semibold text-[20px] text-primary mt-5 mb-3">
        Product Brands
      </h3>
      <ul className="space-y-2 text-[16px] text-gray-600">
        {brandData?.content?.map((brand) => (
          <li key={brand.uuid} className="flex items-center">
            <input
              type="checkbox" 
              id={brand.uuid}
              className="mr-2 appearance-none h-4 w-4 bg-white checked:bg-blue-500 checked:ring-transparent"
            />
            <label htmlFor={brand.uuid}>{brand.name}</label>
          </li>
        ))}
      </ul>

      <h3 className="font-semibold text-[20px] text-primary mt-5 mb-3">
        Choose Price
      </h3>
      <input
        type="range"
        min="20"
        max="4950"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-[250px] appearance-none bg-secondary h-2 rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:bg-gray-900 [&::-webkit-slider-thumb]:rounded-full"
      />
      <div className="flex justify-between text-[16px] font-bold mt-2">
        <span>$20</span>
        <span className="me-[70px] me-sm-[30px]">${price}</span>
      </div>
    </aside>
  );
}