import React, { useState } from "react";
import { useGetAllBrandQuery } from "../../redux/features/brand/brandSlice";
import { useGetAllCategoriesQuery } from "../../redux/service/category/categorySlice";
import { HiOutlineFilter, HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function FilterDis({
  setSelectedBrands,
  setSelectedCategories,
  setPriceRange,
  setShowDiscountedItems,
}) {
  const [price, setPrice] = useState(4950);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    data: brandData,
    isLoading: isBrandLoading,
    isError: isBrandError,
  } = useGetAllBrandQuery();
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useGetAllCategoriesQuery();

  // Handle checkbox changes
  const handleBrandChange = (uuid) => {
    setSelectedBrands((prev) =>
      prev.includes(uuid) ? prev.filter((id) => id !== uuid) : [...prev, uuid]
    );
  };

  const handleCategoryChange = (uuid) => {
    setSelectedCategories((prev) =>
      prev.includes(uuid) ? prev.filter((id) => id !== uuid) : [...prev, uuid]
    );
  };

  const handleDiscountChange = (e) => {
    setShowDiscountedItems(e.target.checked);
  };

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setPrice(value);
    setPriceRange(value);
  };

  if (isBrandLoading || isCategoryLoading)
    return <aside className="p-4 text-center">Loading...</aside>;
  if (isBrandError || isCategoryError)
    return (
      <aside className="p-4 text-center text-red-500">Error loading data</aside>
    );

  return (
    <div className="relative">
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="lg:hidden flex items-center bg-primary text-white px-4 rounded-md text-lg font-semibold"
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
        className={`absolute top-0 left-0 w-[240px] bg-white rounded-lg pr-7 z-20 shadow-lg transition-all duration-300 ${
          isFilterOpen ? "block" : "hidden"
        } lg:block lg:relative lg:w-64 lg:max-w-[300px] lg:z-10 lg:shadow-none`}
      >
        <h3 className="font-bold text-[20px] text-primary mb-3">
          Product Categories
        </h3>
        <ul className="space-y-2 text-[16px] text-gray-600">
          {categoryData?.content?.map((category) => (
            <li key={category.uuid} className="flex items-center">
              <input
                type="checkbox"
                id={category.uuid}
                onChange={() => handleCategoryChange(category.uuid)}
                className="mr-2 h-4 w-4 checked:bg-blue-500"
              />
              <label htmlFor={category.uuid}>{category.name}</label>
            </li>
          ))}
        </ul>

        <hr className="my-5 border-gray-200" />

        <h3 className="font-bold text-[20px] text-primary mt-5 mb-3">
          Product Brands
        </h3>
        <ul className="space-y-2 text-[16px] text-gray-600">
          {brandData?.content?.map((brand) => (
            <li key={brand.uuid} className="flex items-center">
              <input
                type="checkbox"
                id={brand.uuid}
                onChange={() => handleBrandChange(brand.uuid)}
                className="mr-2 h-4 w-4 checked:bg-blue-500"
              />
              <label htmlFor={brand.uuid}>{brand.name}</label>
            </li>
          ))}
        </ul>

        <hr className="my-5 border-gray-200" />

        <h3 className="font-semibold text-xl text-primary">Discount Product</h3>
        <ul className="space-y-4 text-gray-600">
          <li className="flex items-center mb-4">
            <input
              type="checkbox"
              id="discount"
              className="mr-2"
              onChange={handleDiscountChange}
            />
            <label htmlFor="discount">Discount</label>
          </li>
        </ul>

        <hr className="my-5 border-gray-200" />

        <h3 className="font-semibold text-[20px] text-primary mt-5 mb-3">
          Choose Price
        </h3>
        <input
          type="range"
          min="20"
          max="4950"
          value={price}
          onChange={handlePriceChange}
          className="w-full accent-primary"
        />
        <div className="flex justify-between font-bold mt-2 text-gray-700">
          <span>$20</span>
          <span>${price}</span>
        </div>
      </aside>

      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
}