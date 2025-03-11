import React from "react";
import { BsCart3 } from "react-icons/bs";

export default function CardCom({ uuid, thumbnail, name, brand, price }) {
  return (
    <main className="flex items-center justify-center">
      <div className="w-[310px] max-w-sm bg-white border border-gray-200 rounded-[25px] p-5 hover:shadow-[0px_1px_5px_rgba(0,0,0,0.15)]">
        <a href={`/product-detail/${uuid}`}>
          <img
            className="h-[200px] mx-auto object-contain rounded-t-[25px]"
            src={thumbnail}
            alt={name}
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

          <p className="text-gray-600 text-[14px] mt-1">{brand}</p>
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
