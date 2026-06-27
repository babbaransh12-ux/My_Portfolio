import { MdCopyright } from "react-icons/md";
import "./styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <p className="footer-line1">Designed &amp; built by Ansh Kumar</p>
      <p className="footer-line2">
        <MdCopyright /> <span id="year">{currentYear}</span> ·{" "}
        <a
          href="https://github.com/babbaransh12-ux"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        ·{" "}
        <a
          href="https://www.linkedin.com/in/ansh-kumar"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </p>
    </footer>
  );
};

export default Footer;
