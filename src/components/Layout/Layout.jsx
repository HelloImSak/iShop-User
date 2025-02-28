import { Outlet } from "react-router";
import FooterComponent from "../Nav-Foot/FooterComponent";
import NavOneCom from "../Nav-Foot/NavOneCom";

export default function Layout({ isLoggedIn }) {
  return (
    <>
      <header>
        <NavOneCom isLoggedIn={isLoggedIn} />
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
