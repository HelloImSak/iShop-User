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
  
  export default function PopularCategories() {
    return (
      <>
        <div className="flex flex-row justify-center h-screen ">
              <div className="grid grid-cols-4 gap-10 w-4xl bg-white border border-gray-200 rounded-[25px] justify-items-center shadow-lg">
              {products.map((product, index) => (
                <div key={index} className="w-310 h-374">
                    <a href="#">
                              <img
                                className="rounded-t-lg mx-auto w-[250px] "
                                src={product.image}
                                alt="Beats Studio Pro"
                              />
                    </a>
                    <div className="px-1 pb-3 text-left ">
                              <div className="flex items-center justify-between gap-2 mt-4">
                                <a href="#">
                                  <p className="text-[16px] font-bold text-primary inline">
                                    {product.name}
                                  </p>
                                </a>
                                <button className="bg-secondary text-white p-2 rounded-full">
                                  <BsCart3 />
                                </button>
                              </div>
                    
                              <p className="text-gray-600 text-[14px]mt-1">{product.brand}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-[17px] font-bold text-gray-900">{product.price}</span>
                              </div>
                    </div>
                </div>
                
              ))}
                
              </div>
        </div>
      </>
    );

  }
  