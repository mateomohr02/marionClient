"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useTranslations } from "next-intl";
import { sendNewPassword } from "@/utils/sendNewPassword";
import { useParams } from "next/navigation";

const Page = () => {
  const t = useTranslations("Other");

  const token = useParams().token;

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const passwordRules = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[@$!%*?#&+]/.test(password),
  };

  const isPasswordValid = Object.values(passwordRules).every(Boolean);
  const passwordsMatch =
    password === repeatPassword && repeatPassword.length > 0;

  const isFormValid = isPasswordValid && passwordsMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setMessage(t("Recovery.ResetPassword.ErrorAlert"));
      setShowMessage(true);
      return;
    }

    const response = await sendNewPassword(password, token);

    if (response.status === "success") {
      setMessage(t("Recovery.ResetPassword.SuccessAlert"));
    } else {
      setMessage(t("Recovery.ResetPassword.ErrorAlert"));
    }

    setShowMessage(true);
  };

  return (
    <>
      {showMessage ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center min-h-[calc(100vh-20rem)] px-4"
        >
          <div className="max-w-[calc(24rem+2px)] bg-gradient-to-br from-gradientLeft to-gradientRight rounded-[1rem] p-1">
            <div className="p-8 rounded-xl w-[calc(24rem-1rem)] bg-pastelPink/70">
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 font-poppins">
                {t("Recovery.Title")}
              </h2>
              <div>
                <p className="text-center">{message}</p>
                <div className="relative w-full mx-auto group mt-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-500 blur-sm opacity-70 group-hover:blur-md group-hover:opacity-90 transition-all duration-500 rounded-md" />
                  <Link
                    href="/"
                    className="text-center relative z-10 w-full inline-block py-3 bg-snow/90 hover:bg-snow text-base font-bold font-poppins rounded-md backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 ease-in-out whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t("Recovery.GoHome")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center min-h-[calc(100vh-20rem)] px-4"
        >
          <div className="max-w-[calc(24rem+2px)] bg-gradient-to-br from-gradientLeft to-gradientRight rounded-[1rem] p-1">
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-xl w-[calc(24rem-1rem)] bg-pastelPink/70"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 font-poppins">
                {t("Recovery.ResetPassword.Title")}
              </h2>

              {/* PASSWORD */}
              <div className="mb-6 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 font-poppins mb-1"
                >
                  {t("Recovery.ResetPassword.Password")}
                </label>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 font-poppins border-gray-300 focus:ring-blue-400 focus:border-blue-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-sm text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>

                {/* REPEAT PASSWORD */}
                <div className="mb-6 relative mt-2">
                  <label
                    htmlFor="repeatPassword"
                    className="block text-sm font-medium text-gray-700 font-poppins mb-1"
                  >
                    {t("Recovery.ResetPassword.RepeatPassword")}
                  </label>

                  <input
                    id="repeatPassword"
                    type={showRepeatPassword ? "text" : "password"}
                    value={repeatPassword}
                    placeholder="********"
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 font-poppins border-gray-300 focus:ring-blue-400 focus:border-blue-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    className="absolute right-3 top-9 text-sm text-gray-600 hover:text-gray-800"
                  >
                    {showRepeatPassword ? <Eye /> : <EyeClosed />}
                  </button>

                  {repeatPassword.length > 0 && (
                    <p
                      className={`mt-2 text-sm font-poppins ${
                        passwordsMatch ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {passwordsMatch
                        ? t("Recovery.Validation.Match")
                        : t("Recovery.Validation.MissMatch")}
                    </p>
                  )}
                </div>
                {/* Requisitos */}
                <ul className="mt-3 space-y-1 text-sm font-poppins">
                  <li
                    className={
                      passwordRules.length ? "text-green-600" : "text-gray-500"
                    }
                  >
                    • {t("Recovery.Validation.CharCount")}
                  </li>
                  <li
                    className={
                      passwordRules.lowercase
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    • {t("Recovery.Validation.Lowercase")}
                  </li>
                  <li
                    className={
                      passwordRules.uppercase
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    • {t("Recovery.Validation.Uppercase")}
                  </li>
                  <li
                    className={
                      passwordRules.number ? "text-green-600" : "text-gray-500"
                    }
                  >
                    • {t("Recovery.Validation.Number")}
                  </li>
                  <li
                    className={
                      passwordRules.symbol ? "text-green-600" : "text-gray-500"
                    }
                  >
                    • {t("Recovery.Validation.SpecialChar")}
                  </li>
                </ul>
              </div>

              {/* BOTÓN */}
              <div className="relative w-full mx-auto group mt-4">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-500 blur-sm opacity-70 group-hover:blur-md group-hover:opacity-90 transition-all duration-500 rounded-md" />
                <button
                  type="submit"
                  className="relative z-10 w-full inline-block py-3 bg-snow/90 hover:bg-snow text-base font-bold font-poppins rounded-md backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 ease-in-out whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("Recovery.Title")}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Page;
