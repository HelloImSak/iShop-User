import React from 'react'
import phone from "../../assets/PopularCategories/phoneCategory.png"
import laptop from "../../assets/PopularCategories/laptopCategory.png"
import headphone from "../../assets/PopularCategories/headPhoneCategory.png"
import mouse from "../../assets/PopularCategories/mouseCategory.png"
import keyboard from "../../assets/PopularCategories/keyboardCategory.png"
import { BsCart3 } from "react-icons/bs";

const products = [
    {
        name: "Phone",
        image: phone,
        brand: "Beats",
        price: "$38.00",
      },
    {
      name: "Laptop",
      image: laptop,
      brand: "Beats",
      price: "$38.00",
    },
    {
      name: "Headphone",
      image: headphone,
      brand: "Beats",
      price: "$38.00",
    },
    {
      name: "Mouse",
      image: mouse,
      brand: "Beats",
      price: "$38.00",
    },
    {
      name: "Keyboard",
      image: keyboard,
      brand: "Beats",
      price: "$38.00",
    },
  ];
  
  export default function NewArrivals() {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 m-4 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className=" w-[270px] h-[200] border rounded-3xl p-4 hover: transition"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-[230px] h-[200px] object-contain "
          />
          <div className="px-1 pb-3 text-left ">
              <div className="flex items-center justify-between gap-2 ">
                     <a href="#">
                      <p className="text-[15px] font-bold text-primary inline">
                         {product.name}
                       </p>
                    </a>
                    <button className="bg-secondary text-white p-2 rounded-full">
                      <BsCart3 />
                   </button>
                  </div>
                 <p className="text-gray-600 text-[14px] mt-1">{product.brand}</p>
                  <div className="flex items-center justify-between mt-2">
                     <span className="text-[15px] font-bold text-gray-900">{product.price}</span>
                   </div>
        </div>
        </div>
      ))}
    </div>
      </>
    );

  }
  
