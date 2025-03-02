import { useEffect, useState } from "react"; // ✅ Fix: Import useState
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import SignInCom from "../components/auth/SignInCom";
import SignOutCom from "../components/auth/SignOutCom";
import LayoutNav1 from "../components/Layout/LayoutNav1";
import LayoutNav2 from "../components/Layout/LayoutNav2";
import NotFoundProductCom from "../components/NotFoundProductCom";
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

  const storedUserData = localStorage.getItem("userData");
  const storedProfile = storedUserData
    ? JSON.parse(storedUserData).profile
    : null;

  const activeProfile = userData?.profile || storedProfile;

  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          {/* Layout with NavOneCom */}
          <Route
            element={
              <LayoutNav1
                isLoggedIn={isLoggedIn}
                profile={activeProfile}
                cartItems={cartItems}
              />
            }
          >
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />

            <Route path="/about" element={<About isLoggedIn={isLoggedIn} />} />

            {/* product */}
            <Route path="/product-details">
              <Route path=":id" element={<ProductDetails />} />
            </Route>
          </Route>

          {/* Layout with NavTwoCom */}
          <Route
            element={
              <LayoutNav2
                isLoggedIn={isLoggedIn}
                profile={activeProfile}
                cartItems={cartItems}
              />
            }
          >
            <Route
              path="/not-found-product"
              element={
                <NotFoundProductCom
                  isLoggedIn={isLoggedIn}
                  userData={userData}
                  cartItems={cartItems}
                  cartLoading={cartLoading}
                />
              }
            />
          </Route>

          {/* Login / Register */}
          <Route>
            <Route
              path="/login"
              element={<SignInCom setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/profile" element={<SignOutCom />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
