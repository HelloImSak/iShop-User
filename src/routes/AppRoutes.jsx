import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import AllProductPage from "../components/AllProductCom/AllProductPage";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";
import VerifyEmail from "../components/auth/VerifyEmail";
import DiscountPage from "../components/DiscountPageCom/DiscountPage";
import LayoutNav1 from "../components/Layout/LayoutNav1";
import LayoutNav2 from "../components/Layout/LayoutNav2";
import NoInternet from "../components/NoInternet";
import NotFoundProductCom from "../components/NotFoundProductCom";
import About from "../pages/About";
import LoginForm from "../pages/auth/LoginForm";
import RegisterForm from "../pages/auth/RegisterForm";
import Brand from "../pages/Brand";
import ShoppingCart from "../pages/cart/ShoppingCart";
import Category from "../pages/Category";
import Home from "../pages/Home";
import Detail from "../pages/products/Detail";
import Products from "../pages/products/Products";
import Profile from "../pages/user/Profile";
import { useUserDataOfTokenQuery } from "../redux/features/auth/authSlice";
import { useGetUserCartQuery } from "../redux/service/cart/cartSlice";
import { useGetAllQuery } from "../redux/service/product/productSlice";

export default function AppRoutes() {
  const token = localStorage.getItem("accessToken");
  const { data: userData, error } = useUserDataOfTokenQuery(undefined, {
    skip: !token, // Skip API call if no token
  });
  // console.log("userdata: ", userData);

  const [isLoggedIn, setIsLoggedIn] = useState(!!token); // Set based on token presence

  const [cartItems, setCartItems] = useState(0);

  // Fetch all products for the entire app
  const {
    data: products,
    isLoading: productLoading,
    error: productError,
  } = useGetAllQuery();

  // Fetch cart data using the user's UUID
  const userUuid = userData?.uuid; // uuid is in userData
  const {
    data: cartData,
    error: cartError,
    isLoading: cartLoading,
  } = useGetUserCartQuery(userUuid, {
    skip: !userUuid || !isLoggedIn, // Skip if no userId or not logged in
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
      // console.log("Cart Data:", cartData);
      // console.log("Total Quantity:", totalQuantity);
    }
    if (cartError) {
      console.error("Failed to fetch cart:", cartError);
    }
  }, [cartData, cartError]);

  const storedUserData = localStorage.getItem("userData");
  const storedProfile = storedUserData
    ? JSON.parse(storedUserData).profile
    : null;

  // get profile from stored profile
  const activeProfile = userData?.profile || storedProfile;

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) return <NoInternet />;

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
                user={userData}
                profile={activeProfile}
                cartItems={cartItems}
              />
            }
          >
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/all-products" element={<AllProductPage />} />
            <Route path="/about" element={<About isLoggedIn={isLoggedIn} />} />
            <Route
              path="/products"
              element={<Products products={products} />} // Pass products as prop
            />
            <Route path="/brand" element={<Brand />} />
            <Route path="/discount-products" element={<DiscountPage />} />
            <Route path="/phone" element={<Category />} />
            <Route path="/product-detail/:uuid" element={<Detail />} />
            <Route
              path="/shopping-cart"
              element={<ShoppingCart userUuid={userUuid} />}
            />

            <Route
              path="/profile-setting"
              element={<Profile user={userData} />}
            />
          </Route>

          {/* Layout with NavTwoCom */}
          <Route
            element={
              <LayoutNav2
                isLoggedIn={isLoggedIn}
                profile={activeProfile}
                user={userData}
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

          {/* Login / Register / Verify code and Forgot Password */}
          <Route>
            <Route
              path="/login"
              element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
