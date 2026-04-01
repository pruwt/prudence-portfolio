"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "Neitha Collective",
    slug: "neitha",
    tags: ["Brand Design", "Identity", "Strategy"],
    image: "/images/neitha.jpg",
  },
  {
    title: "NSE Onboarding",
    slug: "nse",
    tags: ["UI/UX", "Product Design", "Strategy"],
    image: "/images/nse/nse-cover.png",
  },
  {
    title: "Mali",
    slug: "mali",
    tags: ["UX", "App Design"],
    image: "/images/mali2.png",
  },
];

// ─── Shared primitives ────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ImagePlaceholder({ label, className = "" }) {
  return (
    <div className={`bg-[#E4DBD2] flex items-end p-4 ${className}`}>
      <span className="text-xs text-[#888888] font-medium select-none">{label}</span>
    </div>
  );
}

function Tag({ children, variant = "neutral" }) {
  if (variant === "accent") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-[#BA063D]/10 text-[#BA063D] border border-[#BA063D]/20">
        {children}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-[#EFE8E0] text-[#2A2A2A] border border-[#E0D8D0]">
      {children}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // small delay so the transition is visible on load
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const heroStyle = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  });

  return (
    <div className="min-h-screen bg-[#F9F2ED] text-[#2A2A2A]">

      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto relative">

          {/* Left */}
          <div>
            <div style={heroStyle(80)}>
              <h1
                className="font-semibold leading-[0.92] text-[#2A2A2A] mb-8"
                style={{ fontSize: "clamp(58px, 8.5vw, 108px)" }}
              >
                Prudence 
                <br />
                <span className="text-[#BA063D]">Theuri.</span>
              </h1>
            </div>

            <div style={heroStyle(220)}>
              <p className="text-lg text-[#888888] leading-relaxed mb-7">
                Hi! I'm Prudence a Product and Brand Designer focused on making thoughtful digital experiences.
                For me, good design is about clarity, intention, and a deep understanding of the problem at hand. I love working across product, identity, and strategy to build brands that stand for something.
              </p>
            </div>

            <div style={heroStyle(360)} className="flex flex-wrap gap-2">
              {["Product Design", "Brand", "UX", "Strategy"].map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>

          {/* Portrait circle — top right */}
          <div style={heroStyle(60)} className="absolute top-0 right-0">
            <img
              src="/images/portrait1.jpg"
              alt="Prudence Theuri"
              className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── SELECTED WORK ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[#E0D8D0]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="flex items-end justify-between mb-12">
            <h2 className="text-2xl font-semibold tracking-tight">Selected Work</h2>
            <Link
              href="/works"
              className="text-sm text-[#888888] hover:text-[#BA063D] transition-colors duration-200"
            >
              View all →
            </Link>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <FadeUp key={project.slug} delay={i * 110}>
                <Link href={`/works/${project.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl mb-4">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <ImagePlaceholder
                        label={project.title}
                        className="w-full aspect-[4/3] group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                    )}
                  </div>
                  <h3 className="text-base font-semibold mb-2 group-hover:text-[#BA063D] transition-colors duration-200">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Tag key={tag} variant="accent">{tag}</Tag>
                    ))}
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO'S PRUDENCE ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#EFE8E0] border-t border-[#E0D8D0]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] gap-12 lg:gap-24 items-center">

          {/* Left: photo */}
          <FadeUp>
            <img
              src="/images/portrait2.jpg"
              alt="Prudence Theuri"
              className="w-full max-w-[420px] aspect-square object-cover rounded-2xl"
            />
          </FadeUp>

          {/* Right: text */}
          <div>
            <FadeUp delay={100}>
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#BA063D] mb-5">
                Who's Prudence
              </p>
            </FadeUp>
            <FadeUp delay={180}>
              <h2 className="text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-[#2A2A2A] mb-6">
                Design is thinking<br />made clear.
              </h2>
            </FadeUp>
            <FadeUp delay={260}>
              <p className="text-[#888888] leading-relaxed mb-8 max-w-md">
                I'm a product and brand designer focused on meaningful design. My work tries to blend visual storytelling, strategy, and user experience to help businesses and individuals bring their ideas to life with confidence.
              </p>
            </FadeUp>
            <FadeUp delay={340}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#2A2A2A] border border-[#2A2A2A] px-5 py-2.5 rounded-full hover:bg-[#2A2A2A] hover:text-[#F9F2ED] active:scale-[0.97] transition-all duration-200 cursor-pointer"
              >
                More about me →
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-36 px-6 text-center border-t border-[#E0D8D0]">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <h2
              className="font-semibold leading-[1.1] tracking-tight text-[#2A2A2A] mb-6"
              style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
            >
              Curious about what we can
              <br className="hidden sm:block" /> create together?
            </h2>
          </FadeUp>
          <FadeUp delay={140}>
            <p className="text-[#888888] text-lg mb-10 leading-relaxed">
              Whether you&apos;re building a product, launching a brand, or just need a creative partner, I&apos;d love to connect.
            </p>
          </FadeUp>
          <FadeUp delay={250}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#BA063D] text-white px-8 py-3.5 rounded-full text-sm font-medium border border-[#BA063D] hover:bg-white hover:text-[#BA063D] active:scale-[0.97] transition-all duration-200 cursor-pointer"
            >
              Get in touch →
            </Link>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
