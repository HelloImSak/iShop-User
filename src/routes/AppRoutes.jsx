import { useEffect, useState } from "react"; // ✅ Fix: Import useState
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import SignInCom from "../components/auth/SignInCom";
import SignOutCom from "../components/auth/SignOutCom";
import Layout from "../components/Layout/Layout";
import About from "../pages/About";
import Home from "../pages/Home";
import ProductDetails from "../pages/products/ProductDetails";
import { useUserDataOfTokenQuery } from "../redux/features/auth/authSlice";
import { useGetUserCartQuery } from "../redux/features/cart/cartSlice";

export default function AppRoutes() {
  const token = localStorage.getItem("accessToken");
  const { data: userData, error } = useUserDataOfTokenQuery(undefined, {
    skip: !token, // ✅ Skip API call if no token
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!token); // ✅ Set based on token presence
  const [cartItems, setCartItems] = useState(0); // Add cartItems state
  // Fetch cart data using the user's UUID
  const userId = userData?.uuid; // Assuming uuid is in userData
  const {
    data: cartData,
    error: cartError,
    isLoading: cartLoading,
  } = useGetUserCartQuery(userId, {
    skip: !userId || !isLoggedIn, // Skip if no userId or not logged in
  });
  useEffect(() => {
    if (error) {
      console.error("Invalid token, logging out...", error);
      localStorage.removeItem("accessToken");
      setIsLoggedIn(false);
    } else if (userData) {
      setIsLoggedIn(true);
    }
  }, [userData, error]);

  // Update cartItems when cart data is fetched
  useEffect(() => {
    if (cartData?.cartItems) {
      // Sum the quantities of all cart items
      const totalQuantity = cartData.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCartItems(totalQuantity);
      console.log("Cart Data:", cartData);
      console.log("Total Quantity:", totalQuantity);
    }
    if (cartError) {
      console.error("Failed to fetch cart:", cartError);
    }
  }, [cartData, cartError]);

  return (
    <>
      <Toaster position="top-center" /> {/* ✅ Correct placement */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                isLoggedIn={isLoggedIn}
                profile={userData?.profile}
                cartItems={cartItems}
              />
            }
          >
            <Route
              index
              element={
                <Home
                  isLoggedIn={isLoggedIn}
                  userData={userData}
                  cartItems={cartItems}
                  cartLoading={cartLoading}
                />
              }
            />
            <Route
              path="/about"
              element={
                <About
                  isLoggedIn={isLoggedIn}
                  cartItems={cartItems}
                  cartLoading={cartLoading}
                />
              }
            />

            {/* product */}
            <Route path="/product-details">
              <Route path=":id" element={<ProductDetails />} />
            </Route>
          </Route>

          {/* Login / Register */}
          <Route
            path="/login"
            element={<SignInCom setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/profile" element={<SignOutCom />} />
        </Routes>
      </Router>
    </>
  );
}
