import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "./utils/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);

  // Close drawer on Escape key + focus trap
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      // Focus trap within the drawer
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Move focus into drawer on open
    drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Scroll helper — respects GSAP smoother on desktop, native on mobile
  const scrollToSection = (section: string) => {
    setMenuOpen(false);
    if (window.innerWidth > 1024 && smoother) {
      smoother.scrollTo(section, true, "top top");
    } else {
      document.querySelector(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "WORK", href: "#work" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          AK
        </a>
        <a
          href="mailto:babbaransh12@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          babbaransh12@gmail.com
        </a>

        {/* Desktop nav links */}
        <ul className="nav-desktop-links">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                data-href={href}
                href={href}
                onClick={(e) => {
                  if (window.innerWidth > 1024) {
                    e.preventDefault();
                    scrollToSection(href);
                  }
                }}
              >
                <HoverLinks text={label} />
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          ref={hamburgerRef}
          className={`hamburger-btn${menuOpen ? " hamburger-open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
          data-cursor="disable"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* Mobile nav drawer */}
      <div
        id="mobile-nav-drawer"
        ref={drawerRef}
        className={`mobile-nav-drawer${menuOpen ? " mobile-nav-open" : ""}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        <nav>
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(href);
              }}
              tabIndex={menuOpen ? 0 : -1}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Overlay backdrop */}
      {menuOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
