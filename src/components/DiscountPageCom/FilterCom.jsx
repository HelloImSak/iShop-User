import React, { useState } from "react";
import { useGetAllBrandQuery } from "../../redux/features/brand/brandSlice";
import { HiOutlineFilter, HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function FilterDis() {
  const [price, setPrice] = useState(4950);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
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

  // Handle brand checkbox changes
  const handleBrandChange = (uuid) => {
    setSelectedBrands((prev) =>
      prev.includes(uuid)
        ? prev.filter((id) => id !== uuid)
        : [...prev, uuid]
    );
  };

  if (isLoading) return <aside className="w-1/4 rounded-lg">Loading...</aside>;
  if (isError)
    return <aside className="w-1/4 rounded-lg text-red-500">Error loading brands</aside>;

  return (
    <div className="relative">
      {/* Filter Button (For Small Screens) */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="lg:hidden flex items-center bg-blue-600 text-white py-2 px-4 rounded-md text-lg font-semibold"
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
        className={`absolute top-12 left-0 w-[300px] bg-white rounded-lg p-5 z-50 transition-all duration-300 ${
          isFilterOpen ? "block" : "hidden"
        } lg:block lg:relative lg:top-0 lg:w-64 lg:max-w-[300px]`}
      >
        <h3 className="font-semibold text-[20px] text-gray-800 mb-3">
          Product Categories
        </h3>
        <ul className="space-y-2 text-[16px] text-gray-600">
          {proList.map((category) => (
            <li key={category} className="flex items-center">
              <input
                type="checkbox"
                id={category}
                className="mr-2 h-4 w-4 checked:bg-blue-500"
              />
              <label htmlFor={category}>{category}</label>
            </li>
          ))}
        </ul>

        <h3 className="font-semibold text-[20px] text-gray-800 mt-5 mb-3">
          Product Brands
        </h3>
        <ul className="space-y-2 text-[16px] text-gray-600">
          {brandData?.content?.map((brand) => (
            <li key={brand.uuid} className="flex items-center">
              <input
                type="checkbox"
                id={brand.uuid}
                checked={selectedBrands.includes(brand.uuid)}
                onChange={() => handleBrandChange(brand.uuid)}
                className="mr-2 h-4 w-4 checked:bg-blue-500"
              />
              <label htmlFor={brand.uuid}>{brand.name}</label>
            </li>
          ))}
        </ul>

        <h3 className="font-semibold text-[20px] text-gray-800 mt-5 mb-3">
          Choose Price
        </h3>
        <input
          type="range"
          min="20"
          max="4950"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between font-bold mt-2 text-gray-700">
          <span>$20</span>
          <span>${price}</span>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
}