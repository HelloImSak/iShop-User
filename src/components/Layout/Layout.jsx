import { Outlet } from "react-router";
import FooterComponent from "../Nav-Foot/FooterComponent";
import NavOneCom from "../Nav-Foot/NavOneCom";

export default function Layout() {
  return (
    <>
      <header>
        <NavOneCom />
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
