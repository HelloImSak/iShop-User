import React, { useState } from "react";
import { useGetAllQuery } from "../../redux/features/product/productSlice";

export default function FilterDis() {
  const [price, setPrice] = useState(4950);
  const [isOpen, setIsOpen] = useState(false);
  const { data: brandData, isLoading, isError } = useGetAllQuery();

  const proList = [
    "Phone",
    "Laptop",
    "Desktop",
    "Keyboard",
    "Mouse",
    "Speaker",
    "Headphone",
  ];

  if (isLoading) return <aside className="p-4 text-center">Loading...</aside>;
  if (isError)
    return (
      <aside className="p-4 text-center text-red-500">
        Error loading brands
      </aside>
    );

  return (
    <div className="flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:block bg-white p-5 w-64  rounded-lg">
        <h3 className="font-semibold text-xl text-gray-800 mb-3">
          Product Categories
        </h3>
        <ul className="space-y-2 text-gray-600">
          {proList.map((category) => (
            <li key={category} className="flex items-center">
              <input type="checkbox" id={category} className="mr-2" />
              <label htmlFor={category}>{category}</label>
            </li>
          ))}
        </ul>

        <hr className="my-5 border-gray-200" />

        <h3 className="font-semibold text-xl text-gray-800">Product Brands</h3>
        <ul className="space-y-2 text-gray-600">
          {brandData?.content?.map((brand) => (
            <li key={brand.uuid} className="flex items-center">
              <input type="checkbox" id={brand.uuid} className="mr-2" />
              <label htmlFor={brand.uuid}>{brand.name}</label>
            </li>
          ))}
        </ul>

        <hr className="my-5 border-gray-200" />

        <h3 className="font-semibold text-xl text-gray-800">
          Discount Product
        </h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center">
            <input type="checkbox" id="discount" className="mr-2" />
            <label htmlFor="discount">Discount</label>
          </li>
        </ul>

        <hr className="my-5 border-gray-200" />

        <h3 className="font-semibold text-xl text-gray-800">Choose Price</h3>
        <input
          type="range"
          min="20"
          max="4950"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full"
        />
        <div className="flex justify-between font-bold mt-2">
          <span>$20</span>
          <span>${price}</span>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <button
          className="fixed top-14 left-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Close Filters" : "Open Filters"}
        </button>

        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-5 transform transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } z-40`}
        >
          <h3 className="font-semibold text-xl text-gray-800 mb-3">
            Product Categories
          </h3>
          <ul className="space-y-2 text-gray-600">
            {proList.map((category) => (
              <li key={category} className="flex items-center">
                <input type="checkbox" id={category} className="mr-2" />
                <label htmlFor={category}>{category}</label>
              </li>
            ))}
          </ul>

          <hr className="my-5 border-gray-200" />

          <h3 className="font-semibold text-xl text-gray-800">
            Product Brands
          </h3>
          <ul className="space-y-2 text-gray-600">
            {brandData?.content?.map((brand) => (
              <li key={brand.uuid} className="flex items-center">
                <input type="checkbox" id={brand.uuid} className="mr-2" />
                <label htmlFor={brand.uuid}>{brand.name}</label>
              </li>
            ))}
          </ul>

          <hr className="my-5 border-gray-200" />

          <h3 className="font-semibold text-xl text-gray-800">
            Discount Product
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <input type="checkbox" id="discount" className="mr-2" />
              <label htmlFor="discount">Discount</label>
            </li>
          </ul>

          <hr className="my-5 border-gray-200" />

          <h3 className="font-semibold text-xl text-gray-800">Choose Price</h3>
          <input
            type="range"
            min="20"
            max="4950"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between font-bold mt-2">
            <span>$20</span>
            <span>${price}</span>
          </div>
        </aside>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
