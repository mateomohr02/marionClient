"use client"

import { useEffect, useState } from "react";
import HeroHeader from "../../components/HeroHeader";
import HomeContent from "../../components/HomeContent";
import HomeAbout from "../../components/HomeAbout";
import HomeBanner from "../../components/HomeBanner";

const Page = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // 👈 nuevo estado

  useEffect(() => {
    // Aparece con fade-in luego de montar
    setTimeout(() => setIsVisible(true), 50); // pequeño delay para suavidad

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 300;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroStyle = {
    opacity: 1 - scrollProgress,
    transform: `translateY(-${scrollProgress * 50}px)`,
    transition: "opacity 0.3s ease, transform 0.3s ease",
    zIndex: 10,
  };

  const contentStyle = {
    transform: `translateY(-${scrollProgress * 200}px)`,
    transition: "transform 0.3s ease",
  };

  const pageFadeInStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(40px)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  };

  return (
    <div style={pageFadeInStyle} className="flex flex-col z-10">
      <div style={heroStyle}>
        <HeroHeader />
      </div>
      <div style={contentStyle}>
        <HomeContent />
        <HomeAbout />
        <HomeBanner />
      </div>
    </div>
  );
};

export default Page;
