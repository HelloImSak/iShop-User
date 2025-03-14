import React from "react";
import { BsCart3 } from "react-icons/bs";

export default function CardDisCom({
  uuid,
  thumbnail,
  name,
  brand,
  priceOut,
  disPrice,
  dis,
}) {
  return (
    <main className="flex items-center justify-center">
      <div className="w-[310px] max-w-sm bg-white border  rounded-[25px]  p-5 relative hover:shadow-[0px_1px_5px_rgba(0,0,0,0.15)]">
        <a href={`/product-detail/${uuid}`}>
          <img
            className="h-[200px] mx-auto object-contain rounded-t-[25px]"
            src={thumbnail}
            alt={name}
          />
        </a>
        <div className="px-1 pb-3 text-left ">
          <div className="flex items-center justify-between gap-2 mt-4 relative">
            <a href="#">
              <p className="text-[16px] font-bold text-primary inline">
                {name}
              </p>
            </a>
            <button className="bg-secondary text-white p-2 rounded-full">
              <BsCart3 />
            </button>
          </div>
          <p className="text-gray-600 mt-1 text-[14px]">{brand}</p>
          <div className="flex items-center mt-2">
            <span className="text-[18px] font-bold text-gray-900">
              ${disPrice}
            </span>
            <del className="text-[15px] font-bold text-gray-600 mx-5">
              ${priceOut}
            </del>
          </div>
        </div>
      </div>
    </main>
  );
}
