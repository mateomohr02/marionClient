"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { sendRecoveryEmail } from "@/utils/sendRecoveryEmail";

const page = () => {
  const t = useTranslations("Other");

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await sendRecoveryEmail(email, t.locale);

    if (response.status === "success") {
      setShowAlert(true);
      setMessage(t("Recovery.SuccessAlert"));
      setEmail("");
    }
    
  };

  return (
    <>
      {showAlert ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center min-h-[calc(100vh-20rem)] px-4"
        >
          <div className="max-w-[calc(24rem+2px)] bg-gradient-to-br from-gradientLeft to-gradientRight rounded-[1rem] p-1">
            <div
              className="p-8 rounded-xl w-[calc(24rem-1rem)] bg-pastelPink/70"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 font-poppins">
                {t("Recovery.Title")}
              </h2>
              <div>
                <p className="text-center">
                  {message}
                </p>
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
                {t("Recovery.Title")}
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 font-poppins mb-1"
                >
                  {t("Recovery.Email")}
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 font-poppins ${"border-gray-300 focus:ring-blue-400 focus:border-blue-400"}`}
                  value={email}
                  placeholder={t("Recovery.EmailPlaceholder")}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative w-full mx-auto group mt-4">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-500 blur-sm opacity-70 group-hover:blur-md group-hover:opacity-90 transition-all duration-500 rounded-md" />
                <button
                  type="submit"
                  className="relative z-10 w-full inline-block py-3 bg-snow/90 hover:bg-snow text-base font-bold font-poppins rounded-md backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 ease-in-out whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("Recovery.SendRecoveryEmail")}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default page;
