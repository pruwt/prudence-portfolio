"use client";

import { useState } from "react";

const icons = {
  LinkedIn: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Behance: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.49-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.69.747-.63.144-1.29.218-1.96.218H0V4.503h6.938zm-.32 4.943c.586 0 1.072-.14 1.44-.425.367-.28.55-.71.55-1.3 0-.33-.06-.61-.18-.84-.12-.22-.29-.4-.5-.53-.21-.14-.45-.22-.73-.27-.28-.04-.57-.06-.87-.06H3.24v3.42h3.38zm.162 5.184c.323 0 .63-.03.913-.09.28-.06.53-.17.74-.31.21-.14.38-.34.5-.59.12-.25.18-.57.18-.96 0-.76-.21-1.3-.64-1.63-.43-.32-.99-.48-1.69-.48H3.24v4.06h3.54zm9.884-1.68c.36.35.878.52 1.56.52.487 0 .906-.123 1.254-.368.35-.245.563-.507.642-.787h2.568c-.41 1.27-1.04 2.18-1.89 2.73-.85.55-1.878.82-3.08.82-.836 0-1.588-.13-2.258-.4a4.92 4.92 0 0 1-1.69-1.13 5.06 5.06 0 0 1-1.07-1.73c-.247-.67-.37-1.4-.37-2.19 0-.77.126-1.48.38-2.15.253-.67.617-1.25 1.088-1.73.473-.48 1.04-.855 1.698-1.13.66-.272 1.395-.41 2.2-.41.9 0 1.686.174 2.363.522.676.35 1.232.82 1.666 1.41.434.592.75 1.27.944 2.04.196.77.27 1.58.22 2.44h-7.65c.033.795.243 1.38.6 1.73zm2.74-4.68c-.29-.32-.748-.48-1.373-.48-.4 0-.73.067-.993.2-.263.133-.474.3-.633.5-.16.2-.27.41-.333.63-.063.22-.1.42-.11.6h4.09c-.097-.66-.357-1.13-.648-1.45zM15.123 5.18h5.403v1.37h-5.403V5.18z"/>
    </svg>
  ),
  Email: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
};

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/prudence-theuri-654807208/", display: "linkedin.com/in/prudencetheuri" },
  { label: "Behance",  href: "https://behance.net/prudencetheuri",      display: "behance.net/prudencetheuri" },
  { label: "Email",    href: "https://mail.google.com/mail/?view=cm&to=prudencetheuri@gmail.com", display: "prudencetheuri@gmail.com" },
];

export default function Contact() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function update(e) {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, honeypot: "" }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
        setFields({ name: "", email: "", message: "" });
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #C8C0B8",
    padding: "10px 0",
    fontSize: "14px",
    color: "#2A2A2A",
    outline: "none",
    fontFamily: "inherit",
    borderRadius: 0,
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontSize: "10px",
    fontWeight: 500,
    color: "#BA063D",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "6px",
  };

  return (
    <div className="min-h-screen bg-[#F9F2ED] text-[#2A2A2A]">
      <section
        className="px-6 lg:px-10"
        style={{ paddingTop: "calc(64px + 72px)", paddingBottom: "80px" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">

            {/* ─── LEFT: info ─────────────────────────────────────────────── */}
            <div>
              <p style={{ fontSize: "10px", fontWeight: 500, color: "#BA063D", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>
                Get in touch
              </p>
              <h1 style={{ fontSize: "clamp(32px, 4.5vw, 48px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "24px" }}>
                Let's talk.
              </h1>
              <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.8, marginBottom: "48px", maxWidth: "320px" }}>
                Whether it's a project, a role, or just an interesting conversation about the work. Feel free to reach out.
              </p>

              <div className="flex flex-col gap-5">
                {SOCIALS.map(({ label, href, display }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}
                    className="group"
                  >
                    <span
                      style={{
                        width: "36px", height: "36px", borderRadius: "50%",
                        background: "rgba(186,6,61,0.07)", color: "#BA063D",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, transition: "background 0.2s",
                      }}
                      className="group-hover:bg-[#BA063D] group-hover:text-white"
                    >
                      {icons[label]}
                    </span>
                    <span className="group-hover:underline" style={{ fontSize: "13px", color: "#666666" }}>
                      {display}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* ─── RIGHT: form ────────────────────────────────────────────── */}
            <div>
              {status === "success" ? (
                <div style={{ paddingTop: "48px" }}>
                  <p style={{ fontSize: "20px", fontWeight: 500, color: "#2A2A2A", letterSpacing: "-0.02em", marginBottom: "12px" }}>
                    Message sent.
                  </p>
                  <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.8 }}>
                    Thanks for reaching out. I'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot — hidden from humans, visible to bots */}
                  <input
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
                    onChange={() => {}}
                  />

                  <div className="flex flex-col gap-10">
                    <div>
                      <label htmlFor="name" style={labelStyle}>Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        value={fields.name}
                        onChange={update}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderBottomColor = "#BA063D")}
                        onBlur={(e) => (e.target.style.borderBottomColor = "#C8C0B8")}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" style={labelStyle}>Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="your@email.com"
                        value={fields.email}
                        onChange={update}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderBottomColor = "#BA063D")}
                        onBlur={(e) => (e.target.style.borderBottomColor = "#C8C0B8")}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" style={labelStyle}>Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="What's on your mind?"
                        value={fields.message}
                        onChange={update}
                        style={{ ...inputStyle, resize: "none" }}
                        onFocus={(e) => (e.target.style.borderBottomColor = "#BA063D")}
                        onBlur={(e) => (e.target.style.borderBottomColor = "#C8C0B8")}
                      />
                    </div>

                    {errorMsg && (
                      <p style={{ fontSize: "12px", color: "#BA063D", marginTop: "-16px" }}>
                        {errorMsg}
                      </p>
                    )}

                    <div>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full"
                        style={{
                          background: status === "loading" ? "#D4A0B0" : "#BA063D",
                          color: "#fff",
                          fontSize: "12px",
                          fontWeight: 500,
                          border: "none",
                          cursor: status === "loading" ? "not-allowed" : "pointer",
                          transition: "background 0.2s",
                          fontFamily: "inherit",
                        }}
                      >
                        {status === "loading" ? "Sending..." : "Send message"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
