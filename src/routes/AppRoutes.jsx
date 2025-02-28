import { useEffect, useState } from "react"; // ✅ Fix: Import useState
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import SignInCom from "../components/auth/SignInCom";
import Layout from "../components/Layout/Layout";
import About from "../pages/About";
import Home from "../pages/Home";
import ProductDetails from "../pages/products/ProductDetails";
import { useUserTokenMutation } from "../redux/features/auth/authSlice"; // Import API call

export default function AppRoutes() {
  <Toaster position="top-right" />;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [getUserData] = useUserTokenMutation(); // RTK Query mutation

  // ✅ Check if user is logged in and fetch user details
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    async function verifyToken() {
      try {
        const user = await getUserData(token).unwrap();
        setUserData(user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token, logging out...", error);
        localStorage.removeItem("accessToken"); // Remove invalid token
        setIsLoggedIn(false);
      }
    }

    verifyToken();
  }, []);
  return (
    <>
      <Toaster position="top-center" /> {/* ✅ Correct placement */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Layout isLoggedIn={isLoggedIn} userData={userData} />}
          >
            <Route
              index
              element={<Home isLoggedIn={isLoggedIn} userData={userData} />}
            />
            <Route path="about" element={<About isLoggedIn={isLoggedIn} />} />

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
        </Routes>
      </Router>
    </>
  );
}
