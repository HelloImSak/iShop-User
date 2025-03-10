import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";

import { useState } from "react";
import phone from "../../assets/logo/phone.png";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Samsung S25 Ultra",
      description: "8GB, After gray",
      price: 1200,
      quantity: 1,
      image: phone,
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max",
      description: "256GB, Titanium Gray",
      price: 1500,
      quantity: 1,
      image: phone,
    },
    {
      id: 3,
      name: "MacBook Pro 14",
      description: "M3 Pro, 16GB RAM",
      price: 2200,
      quantity: 1,
      image: phone,
    },
    {
      id: 4,
      name: "Sony WH-1000XM5",
      description: "Wireless Noise Cancelling",
      price: 400,
      quantity: 1,
      image: phone,
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const dis = 0.1;
  const shippingCost = 10;

  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    setSelectedItems(e.target.checked ? cartItems.map((item) => item.id) : []);
  };

  const removeSelected = () => {
    setCartItems((prev) =>
      prev.filter((item) => !selectedItems.includes(item.id))
    );
    setSelectedItems([]);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const disPrice = subtotal * dis;
  const total = subtotal - disPrice + shippingCost;

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shopping Cart Section */}
          <div className="lg:col-span-2">
            <div className="rounded-lg p-2 lg:p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-h4 font-OpenSanBold text-gray-800">
                  My Shopping Cart
                </h1>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <input
                    id="selectAll"
                    type="checkbox"
                    checked={
                      selectedItems.length === cartItems.length &&
                      cartItems.length > 0
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="selectAll" className="text-sm text-gray-600">
                    Select all items
                  </label>
                </div>
                <button
                  className="text-sm text-red-500 hover:text-red-700 flex items-center underline"
                  onClick={removeSelected}
                  disabled={selectedItems.length === 0}
                >
                  Delete selected items
                </button>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 py-4 border-t border-gray-100"
                  >
                    <input
                      id={`item-${item.id}`}
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex flex-1 items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[60px] h-[60px] rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                        <p className="text-sm font-medium mt-1 text-green-600">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center justify-center border border-gray-300 rounded-md overflow-hidden">
                        <button
                          className="p-2 hover:bg-gray-200 transition-colors"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <TiMinus className="h-2.5 w-2.5 lg:h-4 lg:w-4 text-orange-500" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="w-10 lg:w-12 text-center border-none focus:outline-none p-0 m-0 bg-transparent"
                        />
                        <button
                          className="p-2 hover:bg-gray-200 transition-colors"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <FaPlus className="h-2.5 w-2.5 lg:h-4 lg:w-4 text-primary" />
                        </button>
                      </div>
                      <button
                        className="text-red-500 p-2 hover:bg-red-100 rounded-full"
                        onClick={() => updateQuantity(item.id, -item.quantity)}
                      >
                        <AiOutlineDelete className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="border border-gray-300 rounded-lg p-6 sticky top-36">
              <h2 className="text-h4 text-center font-OpenSanBold text-gray-800 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 text-body">Discount</span>
                  <span className="font-medium">${disPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    ${shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200">
                  <span className="text-primary font-semibold text-h6">
                    Total Price
                  </span>
                  <span className="font-bold text-xl text-green-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <button
                  type="button"
                  className="w-full py-3 px-5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  type="button"
                  className="w-full py-3 px-5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
