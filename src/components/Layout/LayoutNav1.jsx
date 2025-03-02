import { Outlet } from "react-router";
import FooterComponent from "../Nav-Foot/FooterComponent";
import NavOneCom from "../Nav-Foot/NavOneCom";

export default function LayoutNav1({ isLoggedIn, profile, cartItems }) {
  return (
    <>
      <header>
        <NavOneCom
          isLoggedIn={isLoggedIn}
          profile={profile}
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
