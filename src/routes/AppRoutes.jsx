import { Route, BrowserRouter as Router, Routes } from "react-router";
import Layout from "../components/Layout/Layout";
import About from "../pages/About";
import Home from "../pages/Home";
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}
