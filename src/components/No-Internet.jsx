import React, { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import Logo2 from "../assets/ishop-dark-logo.png";	

const NoInternet = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Listen for online/offline status changes
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

  // No Internet Component
  const NoInternet = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex space-x-6 mb-6">
        <div className="flex items-center justify-center bg-gray-200 rounded-full w-28 h-28 p-4">
          <img
            src={Logo2}
            alt="iShop Logo"
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="flex items-center justify-center bg-gray-200 rounded-full w-28 h-28 p-4">
          <WifiOff size={40} className="text-orange-500" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-custom-blue">
          No Internet Connection
        </p>
        <p className="text-xl font-bold mt-3 text-custom-blue">
          Check your connection and try again.
        </p>
      </div>
      <button
        type="button"
        onClick={() => window.location.reload()} 
        className="mt-6 px-5 py-2.5 text-white bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Retry
      </button>
    </div>
  );
  const MainApp = () => (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-gray-900">Welcome to iShop!</h1>
      <p className="mt-4 text-gray-600">You are online. Enjoy shopping! 🛒</p>
    </div>
  );
  return <div>{isOnline ? <MainApp /> : <NoInternet />}</div>;
};

export default NoInternet;