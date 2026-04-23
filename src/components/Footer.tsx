import { CONTACT, ORDER_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="border-t border-white/[0.06]"
      style={{ background: "transparent" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 pt-10 pb-5 lg:px-12 lg:pt-12 lg:pb-6">
        <div className="mb-10 flex items-start justify-end gap-4">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--color-ivory)] transition-opacity hover:opacity-65"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.8">
              <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--color-ivory)] transition-opacity hover:opacity-65"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
              <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073c0 6.026 4.388 11.02 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.03 1.792-4.703 4.533-4.703 1.313 0 2.686.236 2.686.236v2.973h-1.513c-1.49 0-1.956.93-1.956 1.885v2.272h3.328l-.532 3.49h-2.796V24C19.612 23.093 24 18.099 24 12.073Z" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-20">
          <div>
            <div className="mb-4 text-[color:var(--color-ivory)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.7">
                <path d="M4 5.5h16v11H8l-4 4v-15Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 className="mb-2 font-sans text-[clamp(1.6rem,2.5vw,2rem)] leading-tight text-[color:var(--color-ivory)]">
              Find your way here
            </h4>
            <p className="font-sans text-[15px] leading-[1.6] text-[color:var(--color-ivory)]">
              Everyday:
            </p>
            <p className="mb-1 font-sans text-[15px] leading-[1.6] text-[color:var(--color-ivory)]">
              8:30 am to 11 pm
            </p>
            <p className="max-w-[340px] font-sans text-[15px] leading-[1.6] text-[color:var(--color-ivory)]">
              {CONTACT.address}
            </p>
          </div>

          <div>
            <div className="mb-4 text-[color:var(--color-ivory)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.7">
                <rect x="4" y="5" width="16" height="14" rx="3" />
                <path d="M8 9h8" strokeLinecap="round" />
                <path d="M9.5 5v2" strokeLinecap="round" />
                <path d="M14.5 5v2" strokeLinecap="round" />
              </svg>
            </div>
            <h4 className="mb-2 font-sans text-[clamp(1.6rem,2.5vw,2rem)] leading-tight text-[color:var(--color-ivory)]">
              Contact Us
            </h4>
            <p className="font-sans text-[15px] leading-[1.6] text-[color:var(--color-ivory)]">
              Whatsapp:
            </p>
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-sans text-[15px] leading-[1.6] text-[color:var(--color-ivory)] transition-opacity hover:opacity-65"
            >
              {CONTACT.whatsapp}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="block font-sans text-[15px] leading-[1.6] text-[color:var(--color-ivory)] transition-opacity hover:opacity-65"
            >
              {CONTACT.email}
            </a>
          </div>

          <div>
            <div className="mb-4 text-[color:var(--color-ivory)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 20s6-5.5 6-10a6 6 0 1 0-12 0c0 4.5 6 10 6 10Z" />
                <circle cx="12" cy="10" r="2.3" />
              </svg>
            </div>
            <h4 className="mb-2 font-sans text-[clamp(1.6rem,2.5vw,2rem)] leading-tight text-[color:var(--color-ivory)]">
              Order Now
            </h4>
            <ul className="space-y-1">
              <li>
                <a
                  href={ORDER_LINKS.direct}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[15px] leading-[1.6] text-[color:var(--color-ivory)] transition-opacity hover:opacity-65"
                >
                  Direct
                </a>
              </li>
              <li>
                <a
                  href={ORDER_LINKS.zomato}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[15px] leading-[1.6] text-[color:var(--color-ivory)] transition-opacity hover:opacity-65"
                >
                  Zomato
                </a>
              </li>
              <li>
                <a
                  href={ORDER_LINKS.swiggy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[15px] leading-[1.6] text-[color:var(--color-ivory)] transition-opacity hover:opacity-65"
                >
                  Swiggy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-20 text-center lg:pt-24">
          <p className="font-display text-[clamp(3rem,8vw,5.8rem)] leading-none tracking-[-0.04em] text-[color:var(--color-ivory)]">
            WHITE TEAK COFFEE ROASTERS
            <span className="align-top text-[0.62em]">®</span>
          </p>
          <p className="mt-3 font-sans text-[12px] leading-relaxed text-[color:var(--color-ivory)]/40">
            ©Copyright 2024. White Teak Coffee Roasters. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
