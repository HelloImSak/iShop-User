import React from "react";
import { BsCart3 } from "react-icons/bs";

export default function CardDisCom() {
  return (
    <main className="flex items-center justify-center h-screen ">
      <div className="w-[330px] max-w-sm bg-white border border-gray-200 rounded-[25px] shadow-lg p-5 relative">
        <div className="absolute top-5 left-5">
          <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full">
            10%
          </span>
        </div>
        <a href="#">
          <img
            className="rounded-t-lg mx-auto w-[250px] "
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTR3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671097"
            alt="Beats Studio Pro"
          />
        </a>
        <div className="px-1 pb-3 text-left ">
          <div className="flex items-center justify-between gap-2 mt-4 relative">
            <a href="#">
              <p className="text-[16px] font-bold text-primary inline">
                Beats Studio Pro
              </p>
            </a>
            <button className="bg-secondary text-white p-2 rounded-full">
              <BsCart3 />
            </button>
          </div>
          <p className="text-gray-600 mt-1 text-[14px]">Beats</p>
          <div className="flex items-center mt-2">
            <span className="text-[18px] font-bold text-gray-900">$38.00</span>
            <del className="text-[15px] font-bold text-gray-600 mx-5">
              $42.22
            </del>
          </div>
        </div>
      </div>
    </main>
  );
}
