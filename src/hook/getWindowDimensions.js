"use client"
import { useEffect, useState } from "react";

// Hook
function useWindowDimensions() {
  const [windowSize, setWindowSize] = useState({
    width: 1024, // Default width
    height: 768, // Default height
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowDimensions;
