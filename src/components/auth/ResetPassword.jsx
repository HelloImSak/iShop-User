import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";
import * as Yup from "yup";
import {
  useResendResetPasswordCodeMutation,
  useResetPasswordMutation,
} from "../../redux/features/auth/authSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

  const [resetPassword, { isLoading, isError, error }] =
    useResetPasswordMutation();

  const [resendResetPasswordCode] = useResendResetPasswordCodeMutation();

  const [timer, setTimer] = useState(300);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formik = useFormik({
    initialValues: {
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .required("Verification code is required")
        .length(6, "Code must be exactly 6 digits"),
      newPassword: Yup.string()
        .required("New password is required")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      try {
        await resetPassword({
          email,
          code: values.code,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        }).unwrap();
        toast.success("Password reset successfully!");
        navigate("/login");
      } catch (error) {
        toast.error(error?.data?.message || "Failed to reset password");
      }
    },
  });

  const handleResendCode = async () => {
    if (!formik.values.code) {
      toast.error("Please enter your expired code first.");
      return;
    }
    try {
      await resendResetPasswordCode({
        email,
        oldToken: formik.values.code,
      }).unwrap();
      setTimer(300);
      toast.success("New verification code sent!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to resend code");
    }
  };

  return (
    <div className="shadow-2xl flex justify-center items-center min-h-screen bg-gray-100 rounded-lg">
      <div className="w-[400px] bg-white p-8 rounded-lg shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] dark:bg-gray-800 dark:border dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Reset Your Password
        </h2>
        <p className="text-gray-500 text-center mt-4 text-sm dark:text-gray-400">
          Enter the 6-digit code sent to{" "}
          <span className="text-accent_1">{email}</span> and set a new password.
        </p>

        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              placeholder="Enter 6-digit code"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full mt-2 p-3 border ${
                formik.touched.code && formik.errors.code
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white`}
              required
            />
            {formik.touched.code && formik.errors.code && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.code}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full mt-2 p-3 border ${
                formik.touched.newPassword && formik.errors.newPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white`}
              required
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.newPassword}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full mt-2 p-3 border ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white`}
              required
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 flex justify-center items-center gap-2 bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition duration-300 disabled:opacity-50"
            aria-label="Reset Password"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            {timer > 0
              ? `Code expires in ${formatTime(timer)}`
              : "Code expired."}
          </p>

          <button
            onClick={handleResendCode}
            disabled={isLoading || !formik.values.code}
            className="text-blue-500 hover:underline disabled:text-gray-400"
          >
            Resend Code
          </button>

          {isError && (
            <p className="mt-2 text-red-500 text-sm">
              {error?.data?.message || "An error occurred"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
