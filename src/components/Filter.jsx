import React, { useState } from "react";
import { useGetAllBrandQuery } from "../redux/features/brand/brandSlice";
import { useGetAllCategoriesQuery } from "../redux/service/category/categorySlice";
import { HiOutlineFilter, HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function Filter({
  setSelectedBrands,
  setSelectedCategories,
  setPriceRange,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: brandData, isLoading: isBrandLoading, isError: isBrandError } =
    useGetAllBrandQuery();
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useGetAllCategoriesQuery();

  // Handle brand checkbox changes
  const handleBrandChange = (uuid) => {
    setSelectedBrands((prev) =>
      prev.includes(uuid) ? prev.filter((id) => id !== uuid) : [...prev, uuid]
    );
  };

  // Handle category checkbox changes
  const handleCategoryChange = (uuid) => {
    setSelectedCategories((prev) =>
      prev.includes(uuid) ? prev.filter((id) => id !== uuid) : [...prev, uuid]
    );
  };

  // Handle price range changes
  const handlePriceChange = (e) => {
    setPriceRange(Number(e.target.value));
  };

  if (isBrandLoading || isCategoryLoading)
    return <aside className="w-1/4 rounded-lg">Loading...</aside>;
  if (isBrandError || isCategoryError)
    return (
      <aside className="w-1/4 rounded-lg text-red-500">
        Error loading filters
      </aside>
    );

  return (
    <div className="relative">
      {/* Filter Button (For Small Screens) */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="lg:hidden flex items-center bg-primary text-white py-2 px-4 rounded-md text-lg font-semibold"
      >
        <HiOutlineFilter className="text-xl mr-2" />
        <span>Filter</span>
        {isFilterOpen ? (
          <HiChevronUp className="ml-2 text-xl" />
        ) : (
          <HiChevronDown className="ml-2 text-xl" />
        )}
      </button>

      {/* Filter Sidebar/Dropdown */}
      <aside
        className={`fixed lg:sticky top-0 left-0 w-[240px] bg-white rounded-lg p-5 z-50 transition-all duration-300 ${
          isFilterOpen ? "block" : "hidden"
        } lg:block lg:relative lg:top-20 lg:w-64 lg:max-w-[300px] lg:h-fit lg:overflow-y-auto`}
      >
        {/* Product Categories */}
        <h3 className="font-semibold text-[20px] text-primary mb-3">
          Product Categories
        </h3>
        <ul className="space-y-2 text-[16px] text-gray-600">
          {categoryData?.content?.map((category) => (
            <li key={category.uuid} className="flex items-center">
              <input
                type="checkbox"
                id={category.uuid}
                onChange={() => handleCategoryChange(category.uuid)}
                className="mr-2 h-4 w-4 checked:bg-primary"
              />
              <label htmlFor={category.uuid}>{category.name}</label>
            </li>
          ))}
        </ul>

        {/* Product Brands */}
        <h3 className="font-semibold text-[20px] text-gray-800 mt-5 mb-3">
          Product Brands
        </h3>
        <ul className="space-y-2 text-[16px] text-gray-600">
          {brandData?.content?.map((brand) => (
            <li key={brand.uuid} className="flex items-center">
              <input
                type="checkbox"
                id={brand.uuid}
                onChange={() => handleBrandChange(brand.uuid)}
                className="mr-2 h-4 w-4 checked:bg-primary"
              />
              <label htmlFor={brand.uuid}>{brand.name}</label>
            </li>
          ))}
        </ul>

        {/* Price Range */}
        <h3 className="font-semibold text-[20px] text-primary mt-5 mb-3">
          Choose Price
        </h3>
        <input
          type="range"
          min="20"
          max="4950"
          defaultValue="4950"
          onChange={handlePriceChange}
          className="w-full accent-primary"
        />
        <div className="flex justify-between font-bold mt-2 text-gray-700">
          <span>$20</span>
          <span>$4950</span>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
}