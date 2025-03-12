import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import { NavLink } from "react-router";
import {
  useAddQtyByOneMutation,
  useGetUserCartQuery,
  useRemoveAllItemsMutation,
  useRemoveQtyByOneMutation,
} from "../../redux/service/cart/cartSlice";
import { useGetByUuidQuery } from "../../redux/service/product/productSlice";

import NoCartCom from "../../components/cart/NoCartCom";
// Create a separate component for product details
function ProductDetails({ productUuid }) {
  const { data, isLoading } = useGetByUuidQuery(productUuid, {
    skip: !productUuid,
  });
  return {
    name: data?.name || productUuid,
    thumbnail: data?.thumbnail || "https://via.placeholder.com/60",
    isLoading,
  };
}

// Custom hook to fetch multiple products
function useProductDetails(productUuids) {
  // Create a stable array of product details
  const product1 = ProductDetails({ productUuid: productUuids[0] || "" });
  const product2 = ProductDetails({ productUuid: productUuids[1] || "" });
  const product3 = ProductDetails({ productUuid: productUuids[2] || "" });
  const product4 = ProductDetails({ productUuid: productUuids[3] || "" });
  const product5 = ProductDetails({ productUuid: productUuids[4] || "" });
  const product6 = ProductDetails({ productUuid: productUuids[5] || "" });
  const product7 = ProductDetails({ productUuid: productUuids[6] || "" });
  const product8 = ProductDetails({ productUuid: productUuids[7] || "" });
  const product9 = ProductDetails({ productUuid: productUuids[8] || "" });
  const product10 = ProductDetails({ productUuid: productUuids[9] || "" });

  // Create a map of product details
  return useMemo(() => {
    const map = {};
    if (productUuids[0]) map[productUuids[0]] = product1;
    if (productUuids[1]) map[productUuids[1]] = product2;
    if (productUuids[2]) map[productUuids[2]] = product3;
    if (productUuids[3]) map[productUuids[3]] = product4;
    if (productUuids[4]) map[productUuids[4]] = product5;
    if (productUuids[5]) map[productUuids[5]] = product6;
    if (productUuids[6]) map[productUuids[6]] = product7;
    if (productUuids[7]) map[productUuids[7]] = product8;
    if (productUuids[8]) map[productUuids[8]] = product9;
    if (productUuids[9]) map[productUuids[9]] = product10;
    return map;
  }, [
    productUuids,
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
    product9,
    product10,
  ]);
}

export default function ShoppingCart({ userUuid }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const shippingCost = 0;

  // Get cart data
  const {
    data: cartData,
    isLoading: cartLoading,
    isError: cartError,
  } = useGetUserCartQuery(userUuid, {
    skip: !userUuid,
  });

  const [addQtyByOne] = useAddQtyByOneMutation();
  const [removeQtyByOne] = useRemoveQtyByOneMutation();
  const [removeAllItems] = useRemoveAllItemsMutation();

  // Get cart items or empty array if not available
  const cartItems = cartData?.cartItems || [];
  const cartUuid = cartData?.uuid;
  const totalAmount = cartData?.totalAmount || 0;

  // Extract unique productUuids
  const productUuids = useMemo(
    () => [...new Set(cartItems.map((item) => item.productUuid))],
    [cartItems]
  );

  // Use our custom hook to get product details
  const productDetails = useProductDetails(productUuids);

  // Combine cart items with product details
  const cartItemsWithDetails = useMemo(
    () =>
      cartItems.map((item) => ({
        ...item,
        name: productDetails[item.productUuid]?.name || item.productUuid,
        thumbnail:
          productDetails[item.productUuid]?.thumbnail ||
          "https://via.placeholder.com/60",
        discount: productDetails[item.productUuid?.discount]?.discount || 0,
        isLoading: productDetails[item.productUuid]?.isLoading || false,
      })),
    [cartItems, productDetails]
  );
  const totalDiscount = cartItemsWithDetails.reduce(
    (sum, item) => sum + (item.discount || 0),
    0
  );
  console.log(cartItemsWithDetails.discount);

  const updateQuantity = async (uuid, change) => {
    try {
      if (change > 0) {
        await addQtyByOne(uuid).unwrap();
        toast.success("Quantity increased!");
        window.location.reload();
      } else if (change < 1) {
        await removeQtyByOne(uuid).unwrap();
        toast.success("Quantity decreased!");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to update quantity!");
      console.error("Update quantity error:", error);
    }
  };

  const handleSelectItem = (uuid) => {
    setSelectedItems((prev) =>
      prev.includes(uuid) ? prev.filter((id) => id !== uuid) : [...prev, uuid]
    );
  };

  const handleSelectAll = (e) => {
    setSelectedItems(
      e.target.checked ? cartItems.map((item) => item.uuid) : []
    );
  };

  const removeSelected = async () => {
    try {
      await Promise.all(
        selectedItems.map((uuid) => removeQtyByOne(uuid).unwrap())
      );
      toast.success("Selected items removed!");
      setSelectedItems([]);
      window.location.reload();
    } catch (error) {
      toast.error("Failed to remove selected items!");
      console.error("Remove selected error:", error);
    }
  };

  const handleRemoveAll = async () => {
    if (!cartUuid) {
      toast.error("No cart found to remove!");
      window.location.reload();
      return;
    }
    try {
      await removeAllItems(cartUuid).unwrap();
      toast.success("All items removed from cart!");
      setSelectedItems([]);
    } catch (error) {
      toast.error("Failed to remove all items!");
      console.error("Remove all error:", error);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
  const discountAmount = subtotal - totalAmount + shippingCost;
  const total = totalAmount;

  if (!userUuid) {
    return (
      <div className="min-h-screen pt-20">Please log in to view your cart.</div>
    );
  }

  if (cartLoading) return <div className="min-h-screen pt-20">Loading...</div>;

  if (cartError || !cartData || cartItems.length === 0) return <NoCartCom />;

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
                <div className="flex gap-4">
                  {/* <button
                    className="text-sm text-red-500 hover:text-red-700 flex items-center underline"
                    onClick={removeSelected}
                    disabled={selectedItems.length === 0}
                  >
                    Delete selected items
                  </button> */}
                  <button
                    className="text-sm text-red-500 hover:text-red-700 flex items-center underline"
                    onClick={handleRemoveAll}
                    disabled={cartItems.length === 0}
                  >
                    Delete all selected items
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {cartItemsWithDetails.map((item) => (
                  <div
                    key={item.uuid}
                    className="flex items-center gap-4 py-4 border-t border-gray-100"
                  >
                    <input
                      id={`item-${item.uuid}`}
                      type="checkbox"
                      checked={selectedItems.includes(item.uuid)}
                      onChange={() => handleSelectItem(item.uuid)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex flex-1 items-center gap-4 lg:gap-16">
                      {item.isLoading ? (
                        <div className="w-[60px] h-[60px] bg-gray-200 rounded-md animate-pulse" />
                      ) : (
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-[60px] h-[60px] rounded-md object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.isLoading ? "Loading..." : item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {/* Description not included; add if available */}
                        </p>
                        <p className="text-sm font-medium mt-1 text-green-600">
                          ${(item.totalPrice / item.quantity).toFixed(2)} x{" "}
                          {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center justify-center border border-gray-300 rounded-md overflow-hidden">
                        <button
                          className="p-2 hover:bg-gray-200 transition-colors"
                          onClick={() => updateQuantity(item.uuid, -1)}
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
                          onClick={() => updateQuantity(item.uuid, 1)}
                        >
                          <FaPlus className="h-2.5 w-2.5 lg:h-4 lg:w-4 text-primary" />
                        </button>
                      </div>
                      <button
                        className="text-red-500 p-2 hover:bg-red-100 rounded-full"
                        onClick={() =>
                          updateQuantity(item.uuid, -item.quantity)
                        }
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
                  <span className="font-medium">
                    ${discountAmount.toFixed(2)}
                  </span>
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
                <NavLink to="/">
                  <button
                    type="button"
                    className="w-full py-3 px-5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                  >
                    Continue Shopping
                  </button>
                </NavLink>
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
