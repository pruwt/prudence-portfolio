"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

// ─── Filter definitions ───────────────────────────────────────────────────────

const FILTERS = [
  { label: "All",          match: null },
  { label: "Brand Design", match: "Brand Design" },
  { label: "UI/UX",        match: "UI/UX" },
  { label: "Product",      match: "Product" },
  { label: "Strategy",     match: "Strategy" },
];

function getFiltered(filter) {
  if (!filter) return projects;
  return projects.filter((p) => p.tags.some((t) => t.includes(filter)));
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function TagPill({ children }) {
  return (
    <span
      className="px-[10px] py-[4px] rounded-full text-[10px]"
      style={{ color: "#BA063D", background: "rgba(186,6,61,0.07)" }}
    >
      {children}
    </span>
  );
}

function ProjectImage({ image, label, className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      {image ? (
        <img src={image} alt={label} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-[#E4DBD2] flex items-center justify-center">
          <span className="text-[11px] text-[#999999]">{label}</span>
        </div>
      )}
    </div>
  );
}

// ─── Featured card ────────────────────────────────────────────────────────────

function FeaturedCard({ project }) {
  return (
    <Link href={`/works/${project.slug}`} className="group block">
      <div
        className="flex flex-col md:flex-row overflow-hidden rounded-xl bg-[#EFE8E0] hover:-translate-y-[3px] transition-transform duration-300"
        style={{ border: "0.5px solid #E0D8D0" }}
      >
        {/* Image — left on desktop, top on mobile */}
        <div className="md:w-1/2">
          <ProjectImage
            image={project.image}
            hoverImage={project.hoverImage}
            label={`${project.title} — cover image`}
            className="w-full aspect-[4/3]"
          />
        </div>

        {/* Info — right on desktop, below on mobile */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between min-h-[280px]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#BA063D] font-semibold mb-3">
              Featured
            </p>
            <h3
              className="font-medium text-[#2A2A2A] mb-3"
              style={{ fontSize: "22px", letterSpacing: "-0.02em" }}
            >
              {project.title}
            </h3>
            <p className="text-[13px] text-[#666666] leading-[1.6] mb-5">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
          </div>
          <p className="text-[12px] text-[#2A2A2A] mt-6 inline-block group-hover:translate-x-1 group-hover:text-[#BA063D] transition-all duration-200">
            View case study →
          </p>
        </div>
      </div>
    </Link>
  );
}

// ─── Small card ───────────────────────────────────────────────────────────────

function SmallCard({ project }) {
  return (
    <Link href={`/works/${project.slug}`} className="group block">
      <div
        className="overflow-hidden rounded-xl bg-[#EFE8E0] hover:-translate-y-[3px] transition-transform duration-300"
        style={{ border: "0.5px solid #E0D8D0" }}
      >
        <ProjectImage
          image={project.image}
          hoverImage={project.hoverImage}
          label={`${project.title} — cover image`}
          className="w-full aspect-video"
        />
        <div className="px-[18px] py-[16px]">
          <h3 className="text-sm font-medium text-[#2A2A2A] mb-2">{project.title}</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [displayFilter, setDisplayFilter] = useState("All");
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleFilter = (label) => {
    if (label === activeFilter) return;
    setActiveFilter(label);
    setFading(true);
    setTimeout(() => {
      setDisplayFilter(label);
      setFading(false);
    }, 220);
  };

  const activeMatch = FILTERS.find((f) => f.label === displayFilter)?.match;
  const filtered = getFiltered(activeMatch);

  const featuredProject = filtered.find((p) => p.featured);
  const otherProjects   = filtered.filter((p) => !p.featured);
  const isSingle        = filtered.length === 1;

  return (
    <div className="min-h-screen bg-[#F9F2ED] text-[#2A2A2A]">

      {/* ─── PAGE HERO ─────────────────────────────────────────────────────── */}
      <section
        className="px-10 border-b border-[#E0D8D0]"
        style={{
          paddingTop: "calc(64px + 48px)",
          paddingBottom: "32px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.08s, transform 0.7s ease 0.08s",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-baseline justify-between">
          <h1
            className="font-medium text-[#2A2A2A]"
            style={{ fontSize: "48px", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Selected work.
          </h1>
          <span className="text-[12px] text-[#BA063D]">{projects.length} projects</span>
        </div>
      </section>

      {/* ─── FILTER BAR ────────────────────────────────────────────────────── */}
      <section
        className="px-10 py-5 border-b border-[#E0D8D0]"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.7s ease 0.22s",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-2">
          {FILTERS.map(({ label }) => {
            const isActive = activeFilter === label;
            return (
              <button
                key={label}
                onClick={() => handleFilter(label)}
                className="rounded-full text-[11px] cursor-pointer hover:border-[#2A2A2A] hover:text-[#2A2A2A]"
                style={{
                  padding: "5px 14px",
                  color: isActive ? "#2A2A2A" : "#888888",
                  border: isActive ? "0.5px solid #2A2A2A" : "0.5px solid #C8BFB8",
                  transition: "color 0.15s ease, border-color 0.15s ease",
                  background: "transparent",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── PROJECT GRID ──────────────────────────────────────────────────── */}
      <section className="px-10 py-12">
        <div
          className="max-w-6xl mx-auto"
          style={{
            opacity: fading ? 0 : mounted ? 1 : 0,
            transition: fading
              ? "opacity 0.22s ease"
              : "opacity 0.4s ease 0.35s",
          }}
        >
          {filtered.length === 0 ? (
            <p className="text-sm text-[#888888] py-16">
              No projects match this filter.
            </p>

          ) : isSingle ? (
            /* Single result — always featured layout */
            <FeaturedCard project={filtered[0]} />

          ) : (
            <>
              {/* Featured card */}
              {featuredProject && (
                <div className="mb-6">
                  <FeaturedCard project={featuredProject} />
                </div>
              )}

              {/* Smaller cards — 2-col, equal if featured is hidden */}
              {otherProjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {otherProjects.map((project) => (
                    <SmallCard key={project.slug} project={project} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

    </div>
  );
}
