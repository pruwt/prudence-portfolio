import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E0D8D0] bg-[#F9F2ED]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Left: availability + copyright */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" style={{ boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }} />
            <span className="text-sm font-medium text-[#2A2A2A]">Available for work</span>
          </div>
          <p className="text-xs text-[#888888]">© 2026 Prudence Theuri. All rights reserved.</p>
        </div>

        {/* Right: social links */}
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/prudence-theuri-654807208/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[#888888] hover:text-[#2A2A2A] transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#BA063D] shrink-0">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <a
            href="https://behance.net/prudencetheuri"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[#888888] hover:text-[#2A2A2A] transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#BA063D] shrink-0">
              <path d="M7.803 5.731c.588 0 1.119.051 1.605.155.483.103.895.273 1.243.508.343.235.611.547.804.938.188.39.284.871.284 1.435 0 .617-.14 1.131-.425 1.547-.284.414-.7.753-1.248 1.011.751.218 1.312.599 1.677 1.142.366.541.551 1.196.551 1.962 0 .671-.129 1.255-.391 1.75-.26.497-.614.904-1.065 1.218-.447.315-.965.547-1.552.699-.586.148-1.197.224-1.836.224H0V5.731h7.803zm-.351 5.42c.48 0 .878-.114 1.19-.34.31-.228.463-.583.463-1.07 0-.271-.046-.497-.14-.675-.093-.179-.222-.318-.386-.42-.165-.1-.354-.171-.569-.213-.215-.04-.444-.062-.686-.062H2.963V11.15h4.489zm.184 5.664c.267 0 .521-.027.759-.08.238-.054.448-.141.631-.265.182-.121.33-.285.44-.49.11-.208.165-.462.165-.765 0-.613-.171-1.051-.514-1.315-.342-.264-.794-.395-1.355-.395H2.963v3.31h4.673zm9.188-9.048v1.446h-4.917V7.767h4.917zM17.3 9.855c-.178-1.136-.619-2.007-1.326-2.614-.706-.607-1.67-.911-2.893-.911-.586 0-1.12.089-1.604.267-.484.178-.904.432-1.261.763-.358.331-.636.729-.833 1.195-.198.465-.297.984-.297 1.556 0 .585.096 1.128.288 1.628.191.499.46.934.803 1.305.341.37.751.659 1.228.866.476.208 1.006.312 1.587.312 1.015 0 1.852-.238 2.511-.713.659-.474 1.115-1.174 1.368-2.1h-2.134c-.09.365-.272.645-.547.839-.277.192-.617.289-1.021.289-.599 0-1.054-.182-1.365-.549-.313-.366-.469-.81-.469-1.334h5.965zm-5.965-.45c.047-.502.218-.87.514-1.101.293-.231.664-.349 1.115-.349.32 0 .596.057.83.174.234.115.421.271.559.463.139.191.226.398.265.619.039.222.06.4.06.535H11.335V9.405z"/>
            </svg>
            Behance
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&to=prudencetheuri@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[#888888] hover:text-[#2A2A2A] transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BA063D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
