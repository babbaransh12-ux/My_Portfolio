import { MdArrowOutward } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Get in Touch</h3>
        <p className="contact-tagline">
          Open to internships, freelance projects, and collaborations.
        </p>

        <div className="contact-cta-wrapper">
          <a
            href="mailto:babbaransh12@gmail.com"
            className="contact-cta-btn"
            data-cursor="disable"
          >
            Email Me <MdArrowOutward />
          </a>
        </div>

        <div className="contact-flex">
          <div className="contact-box">
            <h4>Education</h4>
            <p className="contact-edu-desc">
              B.Tech in CSE (AI/ML)
              <br />
              Akal University
            </p>
          </div>
          <div className="contact-box">
            <h4>Socials</h4>
            <div className="contact-social-links">
              <a
                href="https://github.com/babbaransh12-ux"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                Github <MdArrowOutward />
              </a>
              <a
                href="https://www.linkedin.com/in/ansh-kumar"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                Linkedin <MdArrowOutward />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
