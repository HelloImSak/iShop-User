import React, { useState } from "react";
export default function FilterCom() {
  const [price, setPrice] = useState(4950);
  const proList = [
    "Phone",
    "Laptop",
    "Desktop",
    "Keyboard",
    "Mouse",
    "Speaker",
    "Headphone",
  ];
  const brandList = [
    "Apple",
    "Asus",
    "Msi",
    "Samsung",
    "Acer",
    "Lenovo",
    "Asus",
    "Microsoft",
    "Sony",
    "Vivo",
    "Oppo",
    "Beat",
    "JBL",
    "Sharper",
    "TECKNET",
  ];

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
        {brandList.map((brand) => (
          <li key={brand} className="flex items-center">
            <input
              type="checkbox"
              id={brand}
              className="mr-2 appearance-none h-4 w-4 bg-white checked:bg-blue-500 checked:ring-transparent"
            />
            <label htmlFor={brand}>{brand}</label>
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
