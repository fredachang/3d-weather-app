import { useEffect, useState } from "react";

export const useDetectScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [orientation, setOrientation] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
      if (window.innerWidth < window.innerHeight) {
        setOrientation("portrait");
      }
      if (window.innerWidth > window.innerHeight) {
        setOrientation("landscape");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = screenWidth < 700;
  const isPortrait = orientation === "portrait";

  return {
    isPortrait,
    isMobile,
    screenWidth,
    screenHeight,
  };
};
