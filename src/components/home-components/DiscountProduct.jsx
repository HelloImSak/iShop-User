import React from 'react'
import phone from "../../assets/PopularCategories/phoneCategory.png"
import laptop from "../../assets/PopularCategories/laptopCategory.png"
import headphone from "../../assets/PopularCategories/headPhoneCategory.png"
import mouse from "../../assets/PopularCategories/mouseCategory.png"
import keyboard from "../../assets/PopularCategories/keyboardCategory.png"
import { BsCart3 } from "react-icons/bs";

const products = [
    {
        name: "Beats Studio Pro",
        image: phone,
        brand: "Beats",
        price: "$38.00",
        discount: "10%",
      },
    {
      name: "Beats Studio Pro",
      image: laptop,
      brand: "Beats",
      price: "$38.00",
      discount: "10%",
    },
    {
      name: "HeadpBeats Studio Pro",
      image: headphone,
      brand: "Beats",
      price: "$38.00",
      discount: "10%",
    },
    {
      name: "Beats Studio Pro",
      image: mouse,
      brand: "Beats",
      price: "$38.00",
      discount: "10%",
    },
    {
      name: "Beats Studio Pro",
      image: keyboard,
      brand: "Beats",
      price: "$38.00",
      discount: "10%",
    },
    {
      name: "Beats Studio Pro",
      image: phone,
      brand: "Beats",
      price: "$38.00",
      discount: "10%",
    },
  {
    name: "Beats Studio Pro",
    image: laptop,
    brand: "Beats",
    price: "$38.00",
    discount: "10%",
  },
  {
    name: "HeadpBeats Studio Pro",
    image: headphone,
    brand: "Beats",
    price: "$38.00",
    discount: "10%",
  },
  ];
  
  export default function DiscountProduct() {
    return (
      <>
        <h1 className="text-4xl text-primary text-center font-OpenSanBold mb-10">Discount Products</h1>
        <div className="grid justify-items-center  gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-10 ">
      {products.map((product) => (
        
        <div
          key={product.id}
          className="relative w-[270px] h-[200] border border-b-gray-200 rounded-3xl p-4 transition-all duration-300 ease-out hover:scale-101 hover:shadow-[0px_0px_8px_rgba(229,231,235,1)]"
        >
            <div className="absolute top-5 left-5">
          <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full">
            {product.discount}
          </span>
        </div>
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