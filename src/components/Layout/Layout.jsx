import { Outlet } from "react-router";
import FooterComponent from "../Nav-Foot/FooterComponent";
import NavOneCom from "../Nav-Foot/NavOneCom";

export default function Layout({ isLoggedIn, profile, cartItems }) {
  // Retrieve profile from localStorage (parsed from userData)
  const storedUserData = localStorage.getItem("userData");
  const storedProfile = storedUserData
    ? JSON.parse(storedUserData).profile
    : null;

  // Use the passed profile prop if available, otherwise fall back to localStorage
  const activeProfile = profile || storedProfile;

  return (
    <>
      <header>
        <NavOneCom
          isLoggedIn={isLoggedIn}
          profile={activeProfile}
          cartItems={cartItems} // Pass cartItems to NavOneCom
        />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </>
  );
}
