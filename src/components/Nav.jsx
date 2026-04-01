"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current < 10 || current < lastScrollY) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      style={{
        opacity: mounted ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: mounted
          ? "opacity 0.5s ease, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
          : "none",
      }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#F9F2ED]/90 backdrop-blur-md border-b border-[#E0D8D0]"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-[#2A2A2A] hover:text-[#BA063D] transition-colors duration-200"
        >
          prudencetheuri
        </Link>
        <div className="flex items-center gap-8">
          {["Works", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm text-[#888888] hover:text-[#cc1d52] transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
