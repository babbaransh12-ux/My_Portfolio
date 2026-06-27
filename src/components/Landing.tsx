import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { smoother } from "./Navbar";

const scrollToWork = () => {
  if (window.innerWidth > 1024 && smoother) {
    smoother.scrollTo("#work", true, "top top");
  } else {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  }
};

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2 className="landing-greeting">Hello! I'm</h2>
            <h1>
              ANSH
              <br />
              <span>KUMAR</span>
            </h1>
            <p className="landing-headline">
              I build AI-powered apps &amp; intelligent interfaces.
            </p>
            <p className="landing-sub">
              Flutter · AI/ML · Full-Stack — crafting intelligent systems and
              beautiful products for real-world impact.
            </p>
            <div className="landing-cta">
              <button
                className="cta-btn cta-primary"
                onClick={scrollToWork}
                data-cursor="disable"
                aria-label="View my projects"
              >
                View Projects
              </button>
              <a
                className="cta-btn cta-secondary"
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                aria-label="Download resume PDF"
              >
                Download Resume
              </a>
            </div>
          </div>
          <div className="landing-info">
            <h3>AI / ML &</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Mobile Developer</div>
              <div className="landing-h2-2">Full-Stack Dev</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Full-Stack Dev</div>
              <div className="landing-h2-info-1">Mobile Developer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
