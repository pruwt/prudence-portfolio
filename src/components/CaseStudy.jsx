"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

// ─── Animation ────────────────────────────────────────────────────────────────

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

// ─── Primitives ───────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p style={{ fontSize: "10px", fontWeight: 500, color: "#BA063D", letterSpacing: "0.1em", textTransform: "uppercase" }}>
      {children}
    </p>
  );
}

function TagPill({ children }) {
  return (
    <span className="px-[10px] py-[4px] rounded-full text-[10px]" style={{ color: "#BA063D", background: "rgba(186,6,61,0.07)" }}>
      {children}
    </span>
  );
}

function Lightbox({ src, caption, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6 md:p-16 cursor-zoom-out"
      style={{
        background: visible ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(6px)" : "blur(0px)",
        transition: "background 0.25s ease, backdrop-filter 0.25s ease",
      }}
      onClick={onClose}
    >
      <img
        src={src}
        alt={caption || ""}
        style={{
          maxWidth: "100%",
          maxHeight: "90vh",
          objectFit: "contain",
          borderRadius: "8px",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.92)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
        }}
      />
      {caption && (
        <p
          className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.45)",
            fontStyle: "italic",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.4s ease 0.15s",
          }}
        >
          {caption}
        </p>
      )}
    </div>,
    document.body
  );
}

function CaseImg({ src, caption, aspect = "aspect-video", fullBleed = false, contain = false, objectPosition = "center" }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const radius = fullBleed ? "" : "rounded-[10px]";
  const bg = contain ? "bg-[#EFE8E0]" : "";
  return (
    <figure>
      <div
        className={`overflow-hidden ${radius} ${aspect} ${bg} ${src ? "cursor-zoom-in" : ""}`}
        onClick={() => src && setLightboxOpen(true)}
      >
        {src ? (
          <img
            src={src}
            alt={caption || ""}
            style={!contain ? { objectPosition } : undefined}
            className={contain
              ? "w-full h-full object-contain p-6"
              : "w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
            }
          />
        ) : (
          <div className="w-full h-full bg-[#E4DBD2] flex items-center justify-center">
            <span className="text-[11px] text-[#999999] text-center px-4">{caption || "Image placeholder"}</span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2" style={{ fontSize: "11px", color: "#999999", fontStyle: "italic" }}>
          {caption}
        </figcaption>
      )}
      {lightboxOpen && <Lightbox src={src} caption={caption} onClose={() => setLightboxOpen(false)} />}
    </figure>
  );
}

function ImageGroup({ group }) {
  const { layout, items = [], aspect: customAspect, wide } = group;
  const breakout = wide ? "mx-[-2rem] lg:mx-[-5rem]" : "";

  if (layout === "full") {
    return <div className={breakout}><CaseImg {...items[0]} aspect={customAspect || "aspect-video"} /></div>;
  }
  if (layout === "full-bleed") {
    return <CaseImg {...items[0]} aspect={customAspect || "aspect-video"} fullBleed />;
  }
  if (layout === "inset") {
    return (
      <div className="px-8 py-6 bg-[#EFE8E0] rounded-[10px]">
        <CaseImg {...items[0]} aspect={customAspect || "aspect-video"} />
      </div>
    );
  }
  if (layout === "two-col") {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${breakout}`}>
        {items.map((item, i) => (
          <CaseImg key={i} {...item} aspect={customAspect || "aspect-[4/3]"} />
        ))}
      </div>
    );
  }
  if (layout === "three-col") {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${breakout}`}>
        {items.map((item, i) => (
          <CaseImg key={i} {...item} aspect={customAspect || "aspect-square"} />
        ))}
      </div>
    );
  }
  return null;
}

// ─── Section renderers ────────────────────────────────────────────────────────

function TextSection({ section }) {
  return (
    <FadeUp>
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-16">
        <SectionLabel>{section.label}</SectionLabel>
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: 500, color: "#2A2A2A", letterSpacing: "-0.02em", marginBottom: "14px" }}>
            {section.heading}
          </h2>
          <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.8 }}>
            {section.body}
          </p>
        </div>
      </div>
    </FadeUp>
  );
}

function QuoteSection({ section }) {
  return (
    <FadeUp>
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-16">
        <div />
        <blockquote>
          <p style={{ fontSize: "16px", fontStyle: "italic", color: "#2A2A2A", lineHeight: 1.7, borderLeft: "2px solid #BA063D", paddingLeft: "20px" }}>
            "{section.text}"
          </p>
          {section.attribution && (
            <p className="mt-3" style={{ fontSize: "11px", color: "#888888", paddingLeft: "22px" }}>
              {section.attribution}
            </p>
          )}
        </blockquote>
      </div>
    </FadeUp>
  );
}

function ImagesSection({ section }) {
  return (
    <>
      {section.intro && (
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-16 mb-12">
            <SectionLabel>{section.label || "The work"}</SectionLabel>
            <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.8 }}>
              {section.intro}
            </p>
          </div>
        </FadeUp>
      )}
      <div className="space-y-8">
        {(section.groups || []).map((group, gi) => (
          <FadeUp key={gi} delay={gi * 80}>
            <ImageGroup group={group} />
          </FadeUp>
        ))}
      </div>
    </>
  );
}

function CalloutSection({ section }) {
  return (
    <FadeUp>
      <div style={{ background: "rgba(186,6,61,0.03)", borderRadius: "10px", padding: "40px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-16">
          <SectionLabel>{section.label}</SectionLabel>
          <p style={{ fontSize: "15px", fontStyle: "italic", color: "#2A2A2A", lineHeight: 1.75 }}>
            {section.body}
          </p>
        </div>
      </div>
    </FadeUp>
  );
}

// ─── Prototype CTAs ───────────────────────────────────────────────────────────

function PrototypeBanner({ url }) {
  if (!url) return null;
  return (
    <FadeUp>
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-8 py-6 rounded-[10px]"
        style={{ background: "rgba(186,6,61,0.05)", border: "1px solid rgba(186,6,61,0.15)" }}
      >
        <div>
          <p style={{ fontSize: "10px", fontWeight: 500, color: "#BA063D", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "5px" }}>
            Live prototype
          </p>
          <p style={{ fontSize: "13px", color: "#666666" }}>
            Built in React and Vite. Open it on your phone.
          </p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap"
          style={{ background: "#BA063D", color: "#fff", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}
        >
          View live prototype →
        </a>
      </div>
    </FadeUp>
  );
}

function PrototypeFooter({ url }) {
  if (!url) return null;
  return (
    <section className="px-6 lg:px-10 py-14 border-b border-[#E0D8D0]">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <p style={{ fontSize: "11px", color: "#888888", marginBottom: "12px" }}>Live prototype</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "clamp(36px, 5.5vw, 56px)", fontWeight: 500, color: "#BA063D", letterSpacing: "-0.03em", textDecoration: "none" }}
            className="hover:opacity-75 transition-opacity duration-200 inline-block"
          >
            Open in your browser →
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section dispatcher ───────────────────────────────────────────────────────

function RenderSection({ section, index }) {
  const wrap = (children) => (
    <section className="px-6 lg:px-10 py-16 border-b border-[#E0D8D0]">
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  );

  switch (section.type) {
    case "text":    return wrap(<TextSection section={section} />);
    case "quote":   return wrap(<QuoteSection section={section} />);
    case "images":  return wrap(<ImagesSection section={section} />);
    case "callout":
      return (
        <section className="px-6 lg:px-10 py-16 border-b border-[#E0D8D0]">
          <div className="max-w-5xl mx-auto">
            <CalloutSection section={section} />
          </div>
        </section>
      );
    default: return null;
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CaseStudy({ study, nextStudy }) {
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

  const metaCells = [
    { label: "Role",        value: study.meta?.role },
    { label: "Year",        value: study.meta?.year },
    { label: "Tools",       value: study.meta?.tools },
    { label: "Deliverable", value: study.meta?.deliverable },
  ];

  return (
    <div className="min-h-screen bg-[#F9F2ED] text-[#2A2A2A]">

      {/* ─── 01. HOOK ──────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 border-b border-[#E0D8D0]" style={{ paddingTop: "calc(64px + 56px)", paddingBottom: "48px" }}>
        <div className="max-w-5xl mx-auto">
          <div style={onLoad(60)}>
            <Link href="/works" className="text-[12px] text-[#BA063D] hover:underline inline-block mb-10">
              ← Back to works
            </Link>
          </div>
          <div style={onLoad(140)}>
            <p style={{ fontSize: "26px", fontWeight: 500, fontStyle: "italic", maxWidth: "560px", lineHeight: 1.55, color: "#2A2A2A" }}>
              "{study.hook}"
            </p>
          </div>
          <div style={onLoad(260)} className="flex flex-wrap gap-2 mt-6">
            {study.tags.map((tag) => <TagPill key={tag}>{tag}</TagPill>)}
          </div>
        </div>
      </section>

      {/* ─── 02a. META STRIP ───────────────────────────────────────────────── */}
      <FadeUp>
        <div className="border-b border-[#E0D8D0]">
          <div
            className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4"
            style={{ borderLeft: "0.5px solid #E0D8D0", borderTop: "0.5px solid #E0D8D0" }}
          >
            {metaCells.map((cell) => (
              <div
                key={cell.label}
                className="px-6 py-[18px]"
                style={{ borderRight: "0.5px solid #E0D8D0", borderBottom: "0.5px solid #E0D8D0" }}
              >
                <p style={{ fontSize: "10px", fontWeight: 500, color: "#BA063D", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "5px" }}>
                  {cell.label}
                </p>
                <p style={{ fontSize: "13px", fontWeight: 500, color: "#2A2A2A" }}>
                  {cell.value || "—"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ─── 02b. TITLE + INTRO + COVER ────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-16 border-b border-[#E0D8D0]">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-16 items-start mb-14">
              <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 500, color: "#2A2A2A", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                {study.title}
              </h1>
              <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.8, paddingTop: "6px" }}>
                {study.intro}
              </p>
            </div>
          </FadeUp>

          {/* Cover image */}
          <FadeUp delay={100}>
            {study.coverImage ? (
              <div className="overflow-hidden rounded-[10px]" style={{ aspectRatio: "16/7" }}>
                <img
                  src={study.coverImage}
                  alt={study.title}
                  style={{ objectPosition: study.coverImagePosition || "center" }}
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="bg-[#E4DBD2] rounded-[10px] flex items-center justify-center" style={{ aspectRatio: "16/7" }}>
                <span className="text-[11px] text-[#999999]">{study.title} — cover image</span>
              </div>
            )}
          </FadeUp>

          {/* Prototype banner — top */}
          {study.prototypeUrl && (
            <div className="mt-10">
              <PrototypeBanner url={study.prototypeUrl} />
            </div>
          )}
        </div>
      </section>

      {/* ─── FLEXIBLE SECTIONS ─────────────────────────────────────────────── */}
      {(study.sections || []).map((section, i) => (
        <RenderSection key={i} section={section} index={i} />
      ))}

      {/* ─── PROTOTYPE FOOTER — bottom ─────────────────────────────────────── */}
      {study.prototypeUrl && <PrototypeFooter url={study.prototypeUrl} />}

      {/* ─── NEXT PROJECT ──────────────────────────────────────────────────── */}
      {nextStudy && (
        <section className="px-6 lg:px-10 py-16">
          <div className="max-w-5xl mx-auto">
            <FadeUp>
              <Link href={`/works/${nextStudy.slug}`} className="group block">
                <div className="hover:-translate-y-[2px] transition-transform duration-300 inline-block">
                  <p style={{ fontSize: "11px", color: "#888888", marginBottom: "10px" }}>Next project</p>
                  <p style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, color: "#2A2A2A", letterSpacing: "-0.02em" }}>
                    {nextStudy.title} →
                  </p>
                </div>
              </Link>
            </FadeUp>
          </div>
        </section>
      )}

    </div>
  );
}
