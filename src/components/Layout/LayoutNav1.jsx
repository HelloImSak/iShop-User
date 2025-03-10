import { Outlet } from "react-router";
import FooterComponent from "../Nav-Foot/FooterComponent";
import NavOneCom from "../Nav-Foot/NavOneCom";

export default function LayoutNav1({ isLoggedIn, profile, cartItems, user }) {
  return (
    <>
      <header>
        <NavOneCom
          isLoggedIn={isLoggedIn}
          profile={profile}
          user={user}
          cartItems={cartItems}
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
