import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function SignOutCom() {
  const handleLogOut = () => {
    toast.success("Log-Out Successful!", {
      icon: "✅",
    });
    localStorage.removeItem("accessToken");
    navigate("/");
    window.location.reload();
  };
  const navigate = useNavigate();
  return (
    <div className="flex justify-center mt-16">
      <button
        onClick={handleLogOut}
        type="button"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Sign-out Here
      </button>
    </div>
  );
}
