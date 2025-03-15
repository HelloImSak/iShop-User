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
      <div className="max-w-sm bg-white border rounded-[25px] p-5 relative hover:shadow-[0px_1px_5px_rgba(0,0,0,0.15)]">
        {/* Discount Badge */}
        {dis > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[12px] font-bold px-2 py-1 rounded-full">
            {dis}% OFF
          </div>
        )}

        <div className="h-[200px] w-full flex items-center justify-center overflow-hidden mb-3">
          <a
            href={`/product-detail/${uuid}`}
            className="w-full h-full flex items-center justify-center"
          >
            <img
              className="w-full h-full object-cover"
              src={thumbnail}
              alt={name}
              onError={(e) => {
                e.target.src = "/path/to/fallback-image.jpg"; // Add a fallback image
                e.target.onerror = null;
              }}
            />
          </a>
        </div>
        <div className="px-1 pb-3 text-left">
          <div className="flex items-center justify-between gap-2 mt-4 relative">
            <a href="#">
              <p className="text-[16px] font-bold text-primary inline line-clamp-custom-1">
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
            {dis > 0 && (
              <del className="text-[15px] text-accent_1 mx-5">${priceOut}</del>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
