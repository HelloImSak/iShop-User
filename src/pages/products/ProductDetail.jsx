import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { NavLink } from "react-router";

const ProductDetail = () => {
  const images = [
    "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
    "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg",
    "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
    "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg",
    "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
    "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const Description = () => (
    <div className="text-gray-600 space-y-4 mx-5 mt-10">
      <h2 className="text-lg font-medium text-primary">Description</h2>
      <p>
        The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro
        or M1 Max chip — the first Apple silicon designed for pros — you get
        groundbreaking performance. Up to 10-core CPU delivers up to 2x faster
        performance to fly through pro workflows quicker than ever. 10-core GPU
        with up to 4x faster graphics performance and machine learning (ML)
        accelerators for cutting-edge AI.
      </p>
    </div>
  );

  return (
    <section className="pt-40 pb-14 bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image Section */}
          <div className="flex flex-col items-center relative">
            <div className="relative w-full max-w-lg">
              <img
                src={images[currentIndex]}
                alt="Product"
                className="w-full h-[400px] object-contain rounded-lg"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 justify-center flex-wrap mt-4">
              {images.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-contain cursor-pointer border-2 rounded-md transition-all ${
                    currentIndex === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  } hover:border-blue-300`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            {/* Description for lg and above */}
            <div className="hidden lg:block">
              <Description />
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <p className="text-sm text-gray-500">
              Category: <span className="text-primary text-caption">Laptop</span>
            </p>
            <h1 className="text-h6 sm:text-h5 font-semibold text-gray-900 mt-2">
              2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB
              SSD Storage) - Space Gray
            </h1>
            <p className="text-sm text-gray-700 mt-2">
              Availability:{" "}
              <span className="text-caption text-green-500">In Stock</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Brand: <span className="text-primary text-caption">Apple</span>
            </p>

            <p className="text-h3 sm:text-h4 font-OpenSanSemiBold text-gray-900 mt-4">
              $1699.00{" "}
              <span className="line-through text-red-500 mr-2">$1999.00</span>{" "}
            </p>

            <div className="mt-6 space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700"
                >
                  Color
                </label>
                <select
                  id="color"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Space Gray</option>
                  <option>Silver</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="size"
                  className="block text-sm font-medium text-gray-700"
                >
                  Size
                </label>
                <select
                  id="size"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>14-inch Liquid Retina XDR Display</option>
                  <option>13-inch Liquid Retina Display</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="memory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Memory
                </label>
                <select
                  id="memory"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>16GB Unified Memory</option>
                  <option>8GB Unified Memory</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="storage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Storage
                </label>
                <select
                  id="storage"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>1TB SSD Storage</option>
                  <option>256GB SSD Storage</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex flex-col lg:flex-row gap-4 items-center w-full">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button className="px-6 py-2 text-gray-500 hover:text-gray-700">
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value="1"
                  className="w-20 text-center border-none focus:outline-none"
                  readOnly
                />
                <button className="px-6 py-2 text-gray-500 hover:text-gray-700">
                  +
                </button>
              </div>
              <button className="w-full lg:w-auto lg:flex-1 bg-secondary hover:bg-orange-600 text-white font-medium py-2 px-5 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-300">
                <NavLink to="/shopping-cart">Add to Cart</NavLink>
              </button>
              <button className="w-full lg:w-auto lg:flex-1 bg-blue-600 hover:bg-primary text-white font-medium py-2 px-5 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
                Buy Now
              </button>
            </div>
            {/* Description for below lg */}
            <div className="lg:hidden">
              <hr className="my-6 border-gray-200" />
              <Description />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
