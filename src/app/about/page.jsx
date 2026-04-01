"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Photo() {
  const [errored, setErrored] = useState(false);
  return (
    <div
      className="overflow-hidden rounded-[10px]"
      style={{
        aspectRatio: "4/5",
        background: errored ? "#E4DBD2" : "transparent",
      }}
    >
      {!errored && (
        <img
          src="/images/portrait1.jpg"
          alt="Prudence Theuri"
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}

export default function About() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const onLoad = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <div className="min-h-screen bg-[#F9F2ED] text-[#2A2A2A]">

      {/* ─── HERO ───────────────────────────────────────────────────────────── */}
      <section
        className="px-6 lg:px-10 border-b border-[#E0D8D0]"
        style={{ paddingTop: "calc(64px + 56px)", paddingBottom: "64px" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[0.65fr_1fr] gap-10 lg:gap-16 items-center">

            <div style={onLoad(60)}>
              <Photo />
            </div>

            <div style={onLoad(160)}>
              <p style={{ fontSize: "10px", fontWeight: 500, color: "#BA063D", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>
                Nairobi, Kenya
              </p>
              <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "28px" }}>
                Prudence Theuri
              </h1>
              <p style={{ fontSize: "15px", color: "#666666", lineHeight: 1.8, maxWidth: "420px" }}>
                Designer and strategist building a practice around work that is strategic, not just visual. UX, brand, product, and IoT. Based in Nairobi.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── BIO ────────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-16 border-b border-[#E0D8D0]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-16">
            <div />
            <div className="space-y-6" style={{ maxWidth: "560px" }}>
              <FadeUp>
                <p style={{ fontSize: "15px", color: "#2A2A2A", lineHeight: 1.85 }}>
                  The thread running through the work is strategy: not what something looks like, but what it is doing, who it is for, and what happens because of it. I tend to start before the brief, in the market context or the structural problem, rather than at the brief itself.
                </p>
              </FadeUp>
              <FadeUp delay={80}>
                <p style={{ fontSize: "15px", color: "#2A2A2A", lineHeight: 1.85 }}>
                  I follow business strategy and geopolitics for the same reason I care about design: both are about how decisions get made and what they produce in the world. That interest shapes how I read a brief and where I think the real problem usually sits.
                </p>
              </FadeUp>
              <FadeUp delay={160}>
                <p style={{ fontSize: "15px", color: "#2A2A2A", lineHeight: 1.85 }}>
                  I am building a practice around work that is strategic rather than decorative. Not the kind of work that calls itself impactful because it looks good in a deck. The kind that has a clear theory of what it is trying to do and follows that through.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AVAILABILITY ───────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-16">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-16 items-center">
              <p style={{ fontSize: "10px", fontWeight: 500, color: "#BA063D", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Open to work
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <p style={{ fontSize: "15px", color: "#2A2A2A", lineHeight: 1.8 }}>
                  Available for full-time roles and the right client partnerships. If the work is interesting, let's talk.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap"
                  style={{ background: "#BA063D", color: "#fff", fontSize: "12px", fontWeight: 500, textDecoration: "none" }}
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
