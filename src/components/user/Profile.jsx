"use client";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaBars, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import * as Yup from "yup";

function Profile() {
  const [preview, setPreview] = useState(
    "https://cdn.builder.io/api/v1/image/assets/fbf0d28e02734151a96ea2472d158bab/9c8d44bd6cd42049e4102a4cf5d887fbd1986f185a360248e855aa02f170ae0a?placeholderIfAbsent=true"
  );
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const infoForm = useFormik({
    initialValues: {
      username: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      road: "",
      linkAddress: "",
      profile: null,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters long")
        .max(20, "Username must not exceed 20 characters")
        .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters")
        .required("Username is required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must contain only digits")
        .min(8, "Phone Number must be 8 to 16 numbers")
        .required("Phone Number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less than 20 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      addressLine1: Yup.string().required("Address Line 1 is required"),
      addressLine2: Yup.string().required("Address Line 2 is required"),
      road: Yup.string().required("Road is required"),
      linkAddress: Yup.string().required("Link Address is required"),
      profile: Yup.mixed().nullable(),
    }),
    onSubmit: async (values) => {
      try {
        console.log("Profile updated:", values);
        toast.success("Profile updated successfully!");
      } catch (err) {
        toast.error("Failed to update profile");
      }
    },
  });

  // Password Form
  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(6, "Old password must be at least 6 characters")
        .max(20, "Old password must be less than 20 characters")
        .required("Old password is required"),
      newPassword: Yup.string()
        .min(6, "New password must be at least 6 characters")
        .max(20, "New password must be less than 20 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "New password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)"
        )
        .required("New password is required")
        .notOneOf(
          [Yup.ref("oldPassword"), null],
          "New password must be different from old password"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("Password updated:", values);
        toast.success("Password updated successfully!");
      } catch (err) {
        toast.error("Failed to update password");
      }
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      infoForm.setFieldValue("profile", file);
    }
  };

  const isFilled = (value) => value && value.trim() !== "";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 md:px-20 pt-24 md:pt-52 pb-16">
      <div className="">
        {/* Sidebar - Visible on lg and above, hidden below lg */}
        <aside
          className={`fixed lg:static top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          } shadow-xl lg:shadow-none`}
        >
          <nav className="flex flex-col p-6 h-full">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-semibold tracking-wide">
                Profile Setting
              </h2>
              <button
                onClick={toggleSidebar}
                className="text-white hover:text-gray-300 lg:hidden"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href="#"
                className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors duration-200"
              >
                My Profile
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                Orders History
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                Search History
              </a>
            </div>
            <button className="mt-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-sm font-medium rounded-md transition-colors duration-200">
              Log Out
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="w-full lg:w-[calc(100%-16rem)] max-md:ml-0 max-md:w-full lg:ml-64">
          <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
            <div className="flex justify-between items-center mb-8">
              <header className="text-3xl font-bold text-gray-800">
                Welcome!{" "}
                <span className="text-red-600">{infoForm.values.username}</span>
              </header>
              <button
                onClick={toggleSidebar}
                className="text-gray-800 hover:text-gray-600 lg:hidden md:bg-red-600 md:text-white md:hover:bg-red-700 md:px-4 md:py-2 md:rounded-md transition-colors duration-200"
              >
                <span className="lg:hidden">
                  <FaBars size={24} />
                </span>
                <span className="hidden md:hidden lg:hidden text-sm font-medium">
                  Manage Account
                </span>
              </button>
            </div>

            <form onSubmit={infoForm.handleSubmit} className="px-6 mb-10">
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <img
                    src={preview}
                    alt="Profile"
                    className="object-cover w-32 h-32 rounded-full border-4 border-gray-200 shadow-md"
                  />
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full cursor-pointer hover:bg-red-700 transition-colors duration-200"
                  >
                    Edit
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                {infoForm.errors.profile && infoForm.touched.profile && (
                  <div className="text-red-500 text-sm mt-2">
                    {infoForm.errors.profile}
                  </div>
                )}
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-red-600 mb-6">
                Edit Your Profile
              </h3>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={infoForm.values.username}
                    onChange={infoForm.handleChange}
                    onBlur={infoForm.handleBlur}
                    placeholder="Enter username"
                    className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 ${
                      isFilled(infoForm.values.username) &&
                      !infoForm.errors.username
                        ? "bg-red-50"
                        : "bg-white"
                    }`}
                  />
                  {infoForm.errors.username && infoForm.touched.username && (
                    <div className="text-red-500 text-sm mt-1">
                      {infoForm.errors.username}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={infoForm.values.phoneNumber}
                    onChange={infoForm.handleChange}
                    onBlur={infoForm.handleBlur}
                    placeholder="Enter phone number"
                    className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 ${
                      isFilled(infoForm.values.phoneNumber) &&
                      !infoForm.errors.phoneNumber
                        ? "bg-red-50"
                        : "bg-white"
                    }`}
                  />
                  {infoForm.errors.phoneNumber &&
                    infoForm.touched.phoneNumber && (
                      <div className="text-red-500 text-sm mt-1">
                        {infoForm.errors.phoneNumber}
                      </div>
                    )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={infoForm.values.addressLine1}
                    onChange={infoForm.handleChange}
                    onBlur={infoForm.handleBlur}
                    placeholder="Enter address line 1"
                    className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 ${
                      isFilled(infoForm.values.addressLine1) &&
                      !infoForm.errors.addressLine1
                        ? "bg-red-50"
                        : "bg-white"
                    }`}
                  />
                  {infoForm.errors.addressLine1 &&
                    infoForm.touched.addressLine1 && (
                      <div className="text-red-500 text-sm mt-1">
                        {infoForm.errors.addressLine1}
                      </div>
                    )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={infoForm.values.addressLine2}
                    onChange={infoForm.handleChange}
                    onBlur={infoForm.handleBlur}
                    placeholder="Enter address line 2"
                    className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 ${
                      isFilled(infoForm.values.addressLine2) &&
                      !infoForm.errors.addressLine2
                        ? "bg-red-50"
                        : "bg-white"
                    }`}
                  />
                  {infoForm.errors.addressLine2 &&
                    infoForm.touched.addressLine2 && (
                      <div className="text-red-500 text-sm mt-1">
                        {infoForm.errors.addressLine2}
                      </div>
                    )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Road
                  </label>
                  <input
                    type="text"
                    name="road"
                    value={infoForm.values.road}
                    onChange={infoForm.handleChange}
                    onBlur={infoForm.handleBlur}
                    placeholder="Enter road"
                    className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 ${
                      isFilled(infoForm.values.road) && !infoForm.errors.road
                        ? "bg-red-50"
                        : "bg-white"
                    }`}
                  />
                  {infoForm.errors.road && infoForm.touched.road && (
                    <div className="text-red-500 text-sm mt-1">
                      {infoForm.errors.road}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Google Map Link
                  </label>
                  <input
                    type="text"
                    name="linkAddress"
                    value={infoForm.values.linkAddress}
                    onChange={infoForm.handleChange}
                    onBlur={infoForm.handleBlur}
                    placeholder="Enter Google Map link"
                    className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 ${
                      isFilled(infoForm.values.linkAddress) &&
                      !infoForm.errors.linkAddress
                        ? "bg-red-50"
                        : "bg-white"
                    }`}
                  />
                  {infoForm.errors.linkAddress &&
                    infoForm.touched.linkAddress && (
                      <div className="text-red-500 text-sm mt-1">
                        {infoForm.errors.linkAddress}
                      </div>
                    )}
                </div>
              </section>

              <div className="flex gap-6 items-center self-end mt-10">
                <button
                  type="button"
                  className="px-6 py-2 text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={infoForm.isSubmitting}
                  className="px-6 py-2 text-white font-medium rounded-md border border-gray-300 bg-accent_1 hover:bg-primary transition-colors duration-200"
                >
                  {infoForm.isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>

            {/* Password Update Form */}
            <form onSubmit={passwordFormik.handleSubmit} className="px-6">
              <h3 className="text-xl md:text-2xl font-semibold text-red-600 mb-6">
                Change Password
              </h3>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-1">
                    Old Password
                  </label>
                  <input
                    type={passwordVisible.oldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={passwordFormik.values.oldPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    placeholder="Enter old password"
                    className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 ${
                      isFilled(passwordFormik.values.oldPassword) &&
                      !passwordFormik.errors.oldPassword
                        ? "bg-red-50"
                        : "bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                    onClick={() => togglePasswordVisibility("oldPassword")}
                  >
                    {passwordVisible.oldPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                  {passwordFormik.errors.oldPassword &&
                    passwordFormik.touched.oldPassword && (
                      <div className="text-red-500 text-sm mt-1">
                        {passwordFormik.errors.oldPassword}
                      </div>
                    )}
                </div>

                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-1">
                    New Password
                  </label>
                  <input
                    type={passwordVisible.newPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordFormik.values.newPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    placeholder="Enter new password"
                    className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 ${
                      isFilled(passwordFormik.values.newPassword) &&
                      !passwordFormik.errors.newPassword
                        ? "bg-red-50"
                        : "bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                    onClick={() => togglePasswordVisibility("newPassword")}
                  >
                    {passwordVisible.newPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                  {passwordFormik.errors.newPassword &&
                    passwordFormik.touched.newPassword && (
                      <div className="text-red-500 text-sm mt-1">
                        {passwordFormik.errors.newPassword}
                      </div>
                    )}
                </div>

                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type={passwordVisible.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordFormik.values.confirmPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    placeholder="Confirm new password"
                    className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 ${
                      isFilled(passwordFormik.values.confirmPassword) &&
                      !passwordFormik.errors.confirmPassword
                        ? "bg-red-50"
                        : "bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    {passwordVisible.confirmPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                  {passwordFormik.errors.confirmPassword &&
                    passwordFormik.touched.confirmPassword && (
                      <div className="text-red-500 text-sm mt-1">
                        {passwordFormik.errors.confirmPassword}
                      </div>
                    )}
                </div>
              </section>

              <div className="flex gap-6 items-center self-end mt-10">
                <button
                  type="button"
                  className="px-6 py-2 text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={infoForm.isSubmitting}
                  className="px-6 py-2 text-white font-medium rounded-md border border-gray-300 bg-accent_1 hover:bg-primary transition-colors duration-200"
                >
                  {infoForm.isSubmitting ? "Saving..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;
