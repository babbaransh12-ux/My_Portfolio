import { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { smoother } from "./Navbar";
import "./styles/BackToTop.css";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (smoother) {
      smoother.scrollTo("#landingDiv", true);
    } else {
      document.querySelector("#landingDiv")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      className={`back-to-top${visible ? " back-to-top-visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      data-cursor="disable"
      tabIndex={visible ? 0 : -1}
    >
      <MdKeyboardArrowUp />
    </button>
  );
};

export default BackToTop;
