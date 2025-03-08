import React, { useState } from "react";

const ProductDetail = () => {
  // State to manage the main product image
  const [mainImage, setMainImage] = useState(
    "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
  );

  // Array of thumbnail images (using placeholder URLs for now)
  const thumbnails = [
    "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
    "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg",
    "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
    "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg",
    "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
    "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg",
  ];

  // Function to handle thumbnail click
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <section className="py-8 bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image Section */}
          <div className="flex flex-col items-center">
            {/* Main Image */}
            <img
              src={mainImage}
              alt="MacBook Pro"
              className="w-full max-w-lg object-contain mb-4"
            />
            {/* Thumbnails */}
            <div className="flex gap-2 justify-center flex-wrap">
              {thumbnails.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-contain cursor-pointer border-2 rounded-md transition-all ${
                    mainImage === thumbnail
                      ? "border-blue-500"
                      : "border-gray-300"
                  } hover:border-blue-300`}
                  onClick={() => handleThumbnailClick(thumbnail)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            {/* Category and Title */}
            <p className="text-sm text-gray-500">Category: Laptop</p>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-2">
              2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB
              SSD Storage) - Space Gray
            </h1>

            {/* Availability and Brand */}
            <p className="text-sm text-green-600 mt-2">
              Availability: In Stock
            </p>
            <p className="text-sm text-gray-500 mt-1">Brand: Apple</p>

            {/* Price */}
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-4">
              <span className="line-through text-gray-500 mr-2">$1999.00</span>{" "}
              $1699.00
            </p>

            {/* Options */}
            <div className="mt-6 space-y-4">
              {/* Color */}
              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700"
                >
                  Color
                </label>
                <select
                  id="color"
                  className="mt-1 block w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Space Gray</option>
                  <option>Silver</option>
                </select>
              </div>

              {/* Size */}
              <div>
                <label
                  htmlFor="size"
                  className="block text-sm font-medium text-gray-700"
                >
                  Size
                </label>
                <select
                  id="size"
                  className="mt-1 block w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>14-inch Liquid Retina XDR Display</option>
                  <option>13-inch Liquid Retina Display</option>
                </select>
              </div>

              {/* Memory */}
              <div>
                <label
                  htmlFor="memory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Memory
                </label>
                <select
                  id="memory"
                  className="mt-1 block w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>16GB Unified Memory</option>
                  <option>8GB Unified Memory</option>
                </select>
              </div>

              {/* Storage */}
              <div>
                <label
                  htmlFor="storage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Storage
                </label>
                <select
                  id="storage"
                  className="mt-1 block w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>1TB SSD Storage</option>
                  <option>256GB SSD Storage</option>
                </select>
              </div>
            </div>

            {/* Quantity and Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value="1"
                  className="w-12 text-center border-none focus:outline-none"
                  readOnly
                />
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                  +
                </button>
              </div>
              <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-5 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-300">
                Add to Cart
              </button>
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
                Buy Now
              </button>
            </div>

            {/* Divider */}
            <hr className="my-6 md:my-8 border-gray-200" />

            {/* Description */}
            <div className="text-gray-600 space-y-4">
              <h2 className="text-lg font-medium">Description</h2>
              <p>
                The most powerful MacBook Pro ever is here. With the
                blazing-fast M1 Pro or M1 Max chip — the first Apple silicon
                designed for pros — you get groundbreaking performance. Up to
                10-core CPU delivers up to 2x faster performance to fly through
                pro workflows quicker than ever. 10-core GPU with up to 4x
                faster graphics performance and machine learning (ML)
                accelerators for cutting-edge AI.
              </p>
              <p>
                Even the ambitious projects are easily handled with up to 10TB
                SSD, up to 64GB unified memory, and support for H.264, HEVC, and
                ProRes codecs and decode media engines that let you edit
                multiple streams of 8K ProRes video.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
