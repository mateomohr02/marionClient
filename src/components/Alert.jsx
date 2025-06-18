// components/GlobalAlert.jsx
"use client";
import { useEffect, useState } from "react";
import { hideAlert } from "@/redux/slices/alertSlice";
import { useDispatch, useSelector } from "react-redux";

const Alert = () => {
  const dispatch = useDispatch()
  const { message, visible } = useSelector((state) => state.alert);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(() => dispatch(hideAlert()), 500);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-0 w-full z-50 transform bg-gradient-to-br from-gradientLeft to-gradientRight opacity-90 h-20 shadow-lg transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="flex items-center justify-center text-2xl h-full px-4 text-center text-white font-thin font-poppins">
        {message}
      </div>
    </div>
  );
};

export default Alert;
