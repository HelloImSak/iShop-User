import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import {
  useResendCodeMutation,
  useVerifyRegistrationMutation,
} from "../../redux/features/auth/authSlice";

const VerifyEmail = ({ email, oldToken }) => {
  const navigate = useNavigate();
  const [verifyRegistration, { isLoading, isError, isSuccess, error }] =
    useVerifyRegistrationMutation();
  const [
    resendCode,
    { isLoading: resendLoading, isError: resendIsError, error: resendError },
  ] = useResendCodeMutation();

  const [timer, setTimer] = useState(120);
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formik = useFormik({
    initialValues: {
      verificationCode: "",
    },
    validationSchema: Yup.object({
      verificationCode: Yup.string()
        .required("Verification code is required")
        .length(6, "Code must be exactly 6 digits"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await verifyRegistration(values.verificationCode).unwrap();
        console.log("Verification successful:", res);
        toast.success("Register Account Successful!", {
          icon: "✅",
        });
        navigate("/login");
      } catch (err) {
        console.error("Verification failed:", err);
        toast.error(err?.data?.message || "Verification failed");
      }
    },
  });

  const handleResendCode = async () => {
    try {
      console.log("Attempting to resend code with:", { email, oldToken });
      const response = await resendCode({ email, oldToken }).unwrap();
      console.log("Resend response:", response);
      setTimer(120);
      toast.success("Verification code resent successfully!");
    } catch (error) {
      console.error("Resend error:", error);
      if (error.status === 404) {
        toast.error(
          "Resend endpoint not found. Please check the API configuration."
        );
      } else {
        toast.error(error?.data?.message || "Failed to resend code");
      }
    }
  };

  const isFilled = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim() !== "";
    if (value instanceof File) return true;
    return false;
  };

  return (
    <div className="shadow-2xl flex justify-center items-center min-h-screen bg-gray-100 rounded-lg">
      <div className="w-[400px] bg-white p-8 rounded-lg shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] dark:bg-gray-800 dark:border dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Verify Your Email Address
        </h2>

        <p className="text-gray-500 text-center mt-4 text-sm dark:text-gray-400">
          Enter the 6-digit code sent to your email.
        </p>

        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="verificationCode"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Verification Code
            </label>

            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              placeholder="Enter verification code"
              value={formik.values.verificationCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full mt-2 p-3 border ${
                formik.touched.verificationCode &&
                formik.errors.verificationCode
                  ? "border-red-500"
                  : "border-gray-300"
              } ${
                isFilled(formik.values.verificationCode)
                  ? "bg-[#e8f0fe]"
                  : "bg-white"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white`}
              required
            />
            {formik.touched.verificationCode &&
              formik.errors.verificationCode && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.verificationCode}
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 flex justify-center items-center gap-2 bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition duration-300 disabled:opacity-50"
            aria-label="Verify me"
          >
            {isLoading ? "Verifying..." : "Verify Me"} <FaArrowRight />
          </button>
        </form>

        {/* Countdown Timer */}
        <div className="mt-4 text-center">
          {timer > 0 ? (
            <p className="text-gray-600">Resend available in {timer}s</p>
          ) : (
            <button
              onClick={handleResendCode}
              disabled={resendLoading}
              className="text-blue-500 hover:underline disabled:text-gray-400"
            >
              {resendLoading ? "Sending..." : "Resend Code"}
            </button>
          )}

          {(isError || resendIsError) && (
            <p className="mt-2 text-red-500 text-sm">
              {error?.data?.message ||
                resendError?.data?.message ||
                "An error occurred"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
