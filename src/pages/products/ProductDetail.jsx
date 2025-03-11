import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import { useAddToCartMutation } from "../../redux/service/cart/cartSlice";

const ProductDetail = ({
  colorOptions = [],
  category = "",
  title = "",
  availability = "In Stock",
  brand = "",
  price = 0,
  originalPrice = 0,
  description = "",
  sizes = [],
  memoryOptions = [],
  storageOptions = [],
  isLoggedIn = false,
  userUuid,
  productUuid,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    colorOptions[0]?.color || ""
  );
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const selectedColorOption = colorOptions.find(
    (option) => option.color === selectedColor
  );
  const images = selectedColorOption?.images || [];

  const Description = () => (
    <div className="text-gray-600 space-y-4 mx-5 mt-10">
      <h2 className="text-lg font-medium text-primary">Description</h2>
      <p>{description}</p>
    </div>
  );

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    setCurrentIndex(0);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent navigation initially
    if (!isLoggedIn) {
      toast.error("You not Logged In!", {
        position: "top-center",
        duration: 3000,
      });
    } else {
      try {
        const response = await addToCart({
          userUuid,
          productUuid,
          quantity,
        }).unwrap();
        toast.success("Item added to cart!", {
          position: "top-center",
          duration: 3000,
        });
        console.log("Add to cart response:", response);
        window.location.reload();
        // Cart icon will update automatically if useGetUserCartQuery is used elsewhere
      } catch (error) {
        toast.error("Failed to add item to cart!", {
          position: "top-center",
          duration: 3000,
        });
        console.error("Add to cart error:", error);
      }
    }
  };

  return (
    <section className="pt-40 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Thumbnail Section */}
          <div className="flex flex-col items-center relative">
            <div className="relative w-full max-w-lg">
              <img
                src={images[currentIndex] || "https://via.placeholder.com/400"}
                alt={`${title} - ${selectedColor}`}
                className="w-full h-[400px] object-contain rounded-lg"
              />
            </div>

            <div className="flex gap-4 justify-center flex-wrap mt-4">
              {images.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`${title} Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-contain cursor-pointer border-2 rounded-md transition-all ${
                    currentIndex === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  } hover:border-blue-300`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <div className="hidden lg:block">
              <Description />
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <p className="text-sm text-gray-500">
              Category:{" "}
              <span className="text-primary text-caption">{category}</span>
            </p>
            <h1 className="text-h6 sm:text-h5 font-semibold text-gray-900 mt-2">
              {title}
            </h1>
            <p className="text-sm text-gray-700 mt-2">
              Availability:{" "}
              <span className="text-caption text-green-500">
                {availability}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Brand: <span className="text-primary text-caption">{brand}</span>
            </p>

            <p className="text-h3 sm:text-h4 font-OpenSanSemiBold text-gray-900 mt-4">
              ${price.toFixed(2)}{" "}
              {originalPrice > price && (
                <span className="line-through text-red-500 mr-2">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
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
                  value={selectedColor}
                  onChange={handleColorChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {colorOptions.map((option) => (
                    <option key={option.color} value={option.color}>
                      {option.color}
                    </option>
                  ))}
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
                  {sizes.map((size) => (
                    <option key={size}>{size}</option>
                  ))}
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
                  {memoryOptions.map((memory) => (
                    <option key={memory}>{memory}</option>
                  ))}
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
                  {storageOptions.map((storage) => (
                    <option key={storage}>{storage}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex flex-col lg:flex-row gap-4 items-center w-full">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="px-6 py-2 text-gray-500 hover:text-gray-700"
                  onClick={decreaseQuantity}
                >
                  <TiMinus className="h-3 w-3 lg:h-3.5 lg:w-3.5 text-orange-500" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  className="w-20 text-center border-none focus:outline-none"
                  readOnly
                />
                <button
                  className="px-6 py-2 text-gray-500 hover:text-gray-700"
                  onClick={increaseQuantity}
                >
                  <FaPlus className="h-3 w-3 lg:h-3.5 lg:w-3.5 text-primary" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                className={`w-full lg:w-auto lg:flex-1 bg-secondary text-white font-medium py-2 px-5 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-300 ${
                  isLoggedIn
                    ? "hover:bg-orange-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handleAddToCart}
                disabled={isAdding} // Disable while adding to prevent multiple clicks
              >
                {isAdding ? "Adding..." : "Add to Cart"}
              </button>

              {/* Buy Now Button */}
              <button
                className={`w-full lg:w-auto lg:flex-1 bg-blue-600 text-white font-medium py-2 px-5 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                  isLoggedIn
                    ? "hover:bg-primary"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  if (!isLoggedIn) {
                    toast.error("You not Logged In!", {
                      position: "top-center",
                      duration: 3000,
                    });
                  } else {
                    // Add Buy Now logic here if needed
                    console.log("Proceeding to buy now...");
                  }
                }}
              >
                Buy Now
              </button>
            </div>

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
