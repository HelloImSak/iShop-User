import React from 'react'
import { BsCart3 } from "react-icons/bs";

export default function CardCom({ thumbnail, name, brand, price }) {
  return (
    <main className="flex items-center justify-center">
      <div className="w-[310px] max-w-sm bg-white border border-gray-200 rounded-[25px] shadow-lg p-5">
        <a href="#">
          <img
            className="rounded-t-lg mx-auto object-contain "
            src={thumbnail}
            alt="product image"
          />
        </a>
        <div className="px-1 pb-3 text-left ">
          <div className="flex items-center justify-between gap-2 mt-4">
            <a href="#">
              <p className="text-[16px] font-bold text-primary inline">
                {name}
              </p>
            </a>
            <button className="bg-secondary text-white p-2 rounded-full">
              <BsCart3 />
            </button>
          </div>

          <p className="text-gray-600 text-[14px]mt-1">{brand}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[17px] font-bold text-gray-900">
              ${price}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
