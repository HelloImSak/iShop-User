import QRCode from "qrcode";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentSuccess from "../../components/payment/PaymentSuccess";
import { useUserDataOfTokenQuery } from "../../redux/features/auth/authSlice";
import { useGetUserCartQuery } from "../../redux/service/cart/cartSlice";
import { useMakeOrderMutation } from "../../redux/service/order/orderSlice";
import {
  useBakongQrMutation,
  useMakePaymentMutation,
} from "../../redux/service/payment/paymentSice";

export default function Order() {
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state || {};

  const {
    userUuid: initialUserUuid,
    cartUuid,
    cartItems: initialCartItems = [],
    subtotal: initialSubtotal = 0,
    totalDiscountAmount: initialTotalDiscount = 0,
    shippingCost: initialShipping = 0,
    total: initialTotal = 0,
  } = orderData;

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [subtotal, setSubtotal] = useState(initialSubtotal);
  const [totalDiscountAmount, setTotalDiscountAmount] =
    useState(initialTotalDiscount);
  const [total, setTotal] = useState(initialTotal);
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isTransactionConfirmed, setIsTransactionConfirmed] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [resolvedOrderUuid, setResolvedOrderUuid] = useState(null);
  const [verificationInterval, setVerificationInterval] = useState(null);
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);
  const [isPaymentFailedOpen, setIsPaymentFailedOpen] = useState(false);
  const [isVerifyPaymentOpen, setIsVerifyPaymentOpen] = useState(false); // New state for verify modal
  const { data: userData, isLoading: userLoading } = useUserDataOfTokenQuery(
    undefined,
    { skip: !token }
  );
  const userUuid = initialUserUuid || userData?.uuid;

  const {
    data: cartData,
    isLoading: cartLoading,
    isError: cartError,
    error: cartErrorDetails,
    refetch: refetchCart,
  } = useGetUserCartQuery(userUuid, { skip: !userUuid });

  const [makeOrder, { isLoading: orderLoading }] = useMakeOrderMutation();
  const [bakongQr] = useBakongQrMutation();
  const [makePayment] = useMakePaymentMutation();

  // Debug data
  useEffect(() => {
    console.log("Order Data from Source:", orderData);
    console.log("Cart Data from API:", cartData);
    console.log("Current Cart Items:", cartItems);
    if (cartError) console.error("Cart Error:", cartErrorDetails);
  }, [orderData, cartData, cartItems, cartError, cartErrorDetails]);

  // Initialize and sync cart data
  useEffect(() => {
    if (initialCartItems.length > 0 && cartUuid) {
      // From ProductDetail (Buy Now) or ShoppingCart with cartUuid
      const formattedItems = initialCartItems.map((item) => ({
        uuid: item.uuid || item.productUuid, // Use productUuid as fallback if no cart item uuid
        productUuid: item.productUuid,
        name: item.name || "Unknown Product",
        price: item.price || 0, // Price from ProductDetail (already discounted if applicable)
        quantity: item.quantity || 1,
        totalPrice: (item.price || 0) * (item.quantity || 1), // Total based on price
        thumbnail: item.thumbnail || "https://via.placeholder.com/64",
        originalPrice: item.originalPrice || item.price || 0, // Original price before discount
        discount: item.discount || 0, // Discount amount from ProductDetail
      }));
      setCartItems(formattedItems);
      calculateTotals(formattedItems);
      refetchCart(); // Sync with cart API if needed
    } else if (cartData?.cartItems && cartData.cartItems.length > 0) {
      // Fallback to API cart data if no initial data provided
      const formattedItems = cartData.cartItems.map((item) => ({
        uuid: item.uuid,
        productUuid: item.productUuid,
        name: item.name || item.product?.name || "Unknown Product",
        price: item.price || item.totalPrice / item.quantity || 0, // Use cart price
        quantity: item.quantity || 1,
        totalPrice: item.totalPrice || (item.price || 0) * (item.quantity || 1),
        thumbnail:
          item.thumbnail ||
          item.product?.thumbnail ||
          "https://via.placeholder.com/64",
        originalPrice:
          item.originalPrice || item.totalPrice / item.quantity || 0,
        discount: item.discount || 0,
      }));
      setCartItems(formattedItems);
      calculateTotals(formattedItems);
    }
  }, [cartData, initialCartItems, cartUuid]);

  const calculateTotals = (items) => {
    const newSubtotal = items.reduce(
      (sum, item) => sum + item.originalPrice * item.quantity,
      0
    );
    const newDiscount = items.reduce(
      (sum, item) => sum + item.discount * item.quantity,
      0
    );
    const newTotal = newSubtotal - newDiscount + initialShipping;

    setSubtotal(newSubtotal);
    setTotalDiscountAmount(newDiscount);
    setTotal(newTotal);
  };

  useEffect(() => {
    return () => {
      if (verificationInterval) clearInterval(verificationInterval);
    };
  }, [verificationInterval]);

  const handleClosePaymentSuccess = () => {
    setIsPaymentSuccessOpen(false);
    setQrCodeImage(null);
    if (verificationInterval) clearInterval(verificationInterval);
    navigate("/profile-setting/order-history");
  };

  const handleClosePaymentFailed = () => {
    setIsPaymentFailedOpen(false);
    setQrCodeImage(null);
    if (verificationInterval) clearInterval(verificationInterval);
  };

  const handleTryAgain = () => {
    setIsPaymentFailedOpen(false);
    generateBakongQr(resolvedOrderUuid, userUuid);
  };

  const handleConfirmPayment = () => {
    setIsVerifyPaymentOpen(false);
    setIsPaymentSuccessOpen(true); // Show PaymentSuccess after confirmation
  };

  const handleMakeOrder = async () => {
    if (!userUuid || cartItems.length === 0) return;

    try {
      const response = await makeOrder({
        userUuid,
        cartUuid: cartUuid || undefined,
        items: cartItems.map((item) => ({
          productUuid: item.productUuid,
          quantity: item.quantity,
        })),
        deliveryMethod,
      }).unwrap();
      setResolvedOrderUuid(response.orderUuid);
      setOrderDetails(response);
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  useEffect(() => {
    if (resolvedOrderUuid && userUuid) {
      generateBakongQr(resolvedOrderUuid, userUuid);
    }
  }, [resolvedOrderUuid, userUuid]);

  const generateBakongQr = async (orderUuid, userUuid) => {
    const payload = {
      userUuid,
      orderUuid,
      currency: "USD",
      city: "Phnom Penh",
    };
    try {
      const qrResponse = await bakongQr(payload).unwrap();
      const qrCodeData = qrResponse?.data?.qr;
      if (qrCodeData) {
        const qrDataUrl = await QRCode.toDataURL(qrCodeData, {
          errorCorrectionLevel: "H",
          margin: 1,
          width: 300,
        });
        setQrCodeImage(qrDataUrl);
        setIsQrModalOpen(true);
        startMd5VerificationLoop(qrResponse?.data?.md5);
      }
    } catch (error) {
      console.error("Failed to generate QR code:", error);
      toast.error("Failed to generate QR code");
      setIsQrModalOpen(false);
      setIsPaymentFailedOpen(true);
    }
  };

  const startMd5VerificationLoop = async (md5) => {
    const bakongToken = import.meta.env.VITE_BAKONG_TOKEN;
    if (!bakongToken) {
      toast.error("Payment verification unavailable: Token missing");
      setIsQrModalOpen(false);
      setIsPaymentFailedOpen(true);
      return;
    }

    const checkMd5WithToken = async () => {
      try {
        const response = await fetch(
          "https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${bakongToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ md5 }),
          }
        );
        return await response.json();
      } catch (error) {
        console.error("Error checking MD5:", error);
        throw error;
      }
    };

    const intervalId = setInterval(async () => {
      try {
        const response = await checkMd5WithToken();
        console.log("MD5 verification response:", response);

        if (
          response?.responseCode === 0 &&
          response?.responseMessage === "Success" &&
          response?.data
        ) {
          const receivedAmount = Number(response.data.amount);
          if (receivedAmount === total) {
            setIsTransactionConfirmed(true);
            setPaymentStatus("Payment confirmed! Processing order...");
            clearInterval(intervalId);

            try {
              const paymentResponse = await makePayment({
                userUuid,
                orderUuid: resolvedOrderUuid,
              }).unwrap();
              console.log("Payment processed successfully:", paymentResponse);
              setPaymentStatus("Payment successful! Email confirmation sent.");
              setIsQrModalOpen(false);
              setIsPaymentSuccessOpen(true);
            } catch (paymentError) {
              console.error("Payment processing failed:", paymentError);
              setPaymentStatus(
                "Payment verified but processing failed. Please contact support."
              );
              setIsQrModalOpen(false);
              setIsPaymentFailedOpen(true);
            }
          } else {
            setPaymentStatus(
              `Payment amount (${receivedAmount} USD) does not match order total (${total} USD).`
            );
            clearInterval(intervalId);
            setIsQrModalOpen(false);
            setIsPaymentFailedOpen(true);
          }
        }
      } catch (error) {
        console.error("MD5 verification failed:", error);
        setPaymentStatus("Payment verification failed. Please try again.");
        clearInterval(intervalId);
        setIsQrModalOpen(false);
        setIsPaymentFailedOpen(true);
      }
    }, 5000);

    setVerificationInterval(intervalId);
  };

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
    if (method === "delivery") {
      setIsDeliveryModalOpen(true);
    }
    calculateTotals(cartItems);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-40">
      <h1 className="text-2xl font-bold mb-6">Order Summary</h1>

      {userLoading || cartLoading ? (
        <p>Loading cart data...</p>
      ) : cartError ? (
        <p>
          Error loading cart:{" "}
          {cartErrorDetails?.data?.message || "Unknown error"}
        </p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Product Details */}
          <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Items</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={item.productUuid || index}
                  className="flex justify-between items-center pb-4 pt-2 border-b last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.thumbnail || "https://via.placeholder.com/64"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/64")
                      }
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Unit Price: ${item.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">
                      ${item.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in cart. Please add items to proceed.</p>
            )}
          </div>

          {/* Right Side - Order Summary and Payment */}
          <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Delivery Method</h3>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={deliveryMethod === "pickup"}
                    onChange={() => handleDeliveryMethodChange("pickup")}
                    className="mr-2"
                  />
                  Store Pickup (Free)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="delivery"
                    checked={deliveryMethod === "delivery"}
                    onChange={() => handleDeliveryMethodChange("delivery")}
                    className="mr-2"
                  />
                  Delivery (Free)
                </label>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span>-${totalDiscountAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-2 border-t font-semibold">
                <span>Total</span>
                <span className="text-green-600 text-xl">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              {!orderDetails ? (
                <button
                  onClick={handleMakeOrder}
                  disabled={orderLoading || !userUuid || cartItems.length === 0}
                  className={`w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium ${
                    orderLoading || !userUuid || cartItems.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  }`}
                >
                  {orderLoading ? "Placing Order..." : "Place Order & Pay"}
                </button>
              ) : (
                <button
                  onClick={() => setIsQrModalOpen(true)}
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600"
                >
                  Show Payment QR Code
                </button>
              )}
            </div>
          </div>

          {/* Modals remain the same */}
          {isDeliveryModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">
                  Delivery Information
                </h2>
                <p className="mb-4">
                  Please provide your delivery form here...
                </p>
                <button
                  onClick={() => setIsDeliveryModalOpen(false)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Close (Form TBD)
                </button>
              </div>
            </div>
          )}

          {/* QR Code Modal */}
          {isQrModalOpen && qrCodeImage && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
                <button
                  onClick={() => setIsQrModalOpen(false)}
                  className="absolute top-2 right-2 text-gray-600 hover:bg-gray-100 rounded-full p-1"
                >
                  ✖
                </button>
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Scan to Pay
                </h2>
                <p className="text-lg font-semibold text-center text-gray-800 mb-3">
                  Total: ${total.toFixed(2)}
                </p>
                <div className="flex justify-center">
                  <img
                    src={qrCodeImage}
                    alt="QR code"
                    className="w-64 mx-auto"
                  />
                </div>
                <p className="text-center mt-4 font-medium">
                  {paymentStatus || "Waiting for payment..."}
                </p>
                {isTransactionConfirmed && (
                  <p className="text-center text-green-600 mt-2 font-bold">
                    Transaction confirmed!
                  </p>
                )}
              </div>
            </div>
          )}
          {/* Payment Success Popup */}
          {isPaymentSuccessOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <PaymentSuccess onClose={handleClosePaymentSuccess} />
            </div>
          )}
          {/* Payment Failed Popup */}
          {isPaymentFailedOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <PaymentFailed
                onClose={handleClosePaymentFailed}
                onTryAgain={handleTryAgain}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
