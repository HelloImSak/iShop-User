import React, { useState } from "react";

export default function FilterCom() {
  const [price, setPrice] = useState(4950);

  return (
    <aside className="w-1/4 ps-[100px] rounded-lg">
      <h3 className="font-semibold text-[20px] text-primary mb-3">
        Product Categories
      </h3>
      <ul className="space-y-2 text-[16px] text-gray-600">
        {["Laptop", "Desktop", "Keyboard", "Mouse", "Speaker", "Headphone"].map(
          (category) => (
            <li key={category}>
              <input type="checkbox" id={category} className="mr-2" />
              <label htmlFor={category}>{category}</label>
            </li>
          )
        )}
      </ul>

      <h3 className="font-semibold text-[20px] text-primary mt-5 mb-3">
        Product Brands
      </h3>
      <ul className="space-y-2 text-[16px] text-gray-600">
        {[
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
        ].map((brand) => (
          <li key={brand}>
            <input
              type="checkbox"
              id={brand}
              className="mr-[10px] mt-2 w-[17px]"
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
        className="w-full"
      />
      <div className="flex justify-between text-[16px] font-bold mt-2">
        <span>$20</span>
        <span>${price}</span>
      </div>
    </aside>
  );
}

