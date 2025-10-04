import { useUIStore } from "@/store/uiStore";
import React, { useEffect } from "react";

const Backdrop = () => {
  const activeOverlay = useUIStore((state) => state.activeOverlay);
  const setActiveOverlay = useUIStore((state) => state.setActiveOverlay);

  useEffect(() => {
    if (activeOverlay) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [activeOverlay]);

  if (!activeOverlay) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-zinc-900/40 backdrop-blur-xs"
      onClick={() => setActiveOverlay(null)}
    />
  );
};

export default Backdrop;
