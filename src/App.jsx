// import "./App.css";
// import AppRoutes from "./AppRoutes";
// function App() {
//    return <AppRoutes />;

// }

// export default App;



import React from "react";
import AppRoutes from "./routes/AppRoutes";
import FilterCom from "./components/DiscountPageCom/FilterCom.jsx";
import DiscountPage from "./components/DiscountPageCom/DiscountPage.jsx";
// import FilterCom from "./components/FilterCom";
function App(){
   return (
      // <AppRoutes />
      //  <FilterCom/>
       <DiscountPage/>
   );
}
export default App;