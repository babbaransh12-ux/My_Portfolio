import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";

const BASE = import.meta.env.BASE_URL;

const projects = [
  {
    title: "E-GatePass System",
    category: "Hostel Leave Management",
    problem: "Manual paper-based gate passes caused delays and audit gaps in hostel exit/entry tracking.",
    techBadges: ["Flutter", "FastAPI", "Supabase", "Twilio", "QR Code"],
    metric: "Deployed across university hostel — 0 manual errors post-launch",
    github: "https://github.com/babbaransh12-ux",
    demo: "",
    image: `${BASE}images/egatepass.png`,
  },
  {
    title: "Project Phoenix",
    category: "AI Research Assistant",
    problem: "Marine researchers lacked a unified platform to query and explore fragmented oceanographic datasets.",
    techBadges: ["Python", "NLP", "ML", "Marine Datasets"],
    metric: "Accepted for paper presentation at ICISTM 2025 international conference",
    github: "https://github.com/babbaransh12-ux",
    demo: "",
    image: `${BASE}images/phoenix.png`,
  },
  {
    title: "Krishikalap (SIH)",
    category: "Agricultural Hackathon",
    problem: "Indian farmers lacked accessible AI tools to improve crop yield decisions at scale.",
    techBadges: ["Python", "Git", "Data Preprocessing"],
    metric: "Top-tier SIH submission — led a team of 6 across 36-hour hackathon",
    github: "https://github.com/babbaransh12-ux",
    demo: "",
    image: `${BASE}images/krishikalap.png`,
  },
  {
    title: "Image Caption Generator",
    category: "Deep Learning Model",
    problem: "Automating descriptive captioning for images to assist accessibility and content indexing.",
    techBadges: ["TensorFlow", "VGG16", "LSTM", "NLTK", "BLEU Score"],
    metric: "Achieved BLEU-4 score of 0.58 on Flickr8k benchmark dataset",
    github: "https://github.com/babbaransh12-ux",
    demo: "",
    image: `${BASE}images/image_caption.png`,
  },
  {
    title: "Credit Card Analytics",
    category: "Financial Analytics",
    problem: "Credit card spending patterns were unstructured — making customer segmentation unreliable.",
    techBadges: ["Pandas", "NumPy", "Scikit-Learn", "Kaggle"],
    metric: "Identified 5 distinct customer clusters, improving targeting accuracy by ~30%",
    github: "https://github.com/babbaransh12-ux",
    demo: "",
    image: `${BASE}images/credit_card.png`,
  },
  {
    title: "BMI Calculator",
    category: "Python GUI App",
    problem: "No lightweight, offline-first health tracking tool with a clean Python GUI.",
    techBadges: ["Python", "Tkinter", "Health Tracking"],
    metric: "Tracks and stores BMI history locally — used as a teaching demo",
    github: "https://github.com/babbaransh12-ux",
    demo: "",
    image: `${BASE}images/bmi_calculator.png`,
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        {/* ── Desktop: Carousel ── */}
        <div className="carousel-wrapper carousel-desktop">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        <p className="carousel-problem">{project.problem}</p>
                        <div className="carousel-badges">
                          {project.techBadges.map((badge, i) => (
                            <span className="carousel-badge" key={i}>{badge}</span>
                          ))}
                        </div>
                        <p className="carousel-metric">↗ {project.metric}</p>
                        <div className="carousel-links">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="carousel-link-btn"
                              aria-label={`View ${project.title} on GitHub`}
                              data-cursor="disable"
                            >
                              <FaGithub />
                            </a>
                          )}
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="carousel-link-btn carousel-link-demo"
                              aria-label={`Live demo for ${project.title}`}
                              data-cursor="disable"
                            >
                              <MdArrowOutward />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>

        {/* ── Mobile: Stacked Cards ── */}
        <div className="project-cards-mobile">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-card-image">
                <WorkImage image={project.image} alt={project.title} link={project.demo || undefined} />
              </div>
              <div className="project-card-body">
                <div className="project-card-header">
                  <span className="project-card-num">0{index + 1}</span>
                  <h4>{project.title}</h4>
                  <p className="project-card-category">{project.category}</p>
                </div>
                <p className="project-card-problem">{project.problem}</p>
                <div className="carousel-badges">
                  {project.techBadges.map((badge, i) => (
                    <span className="carousel-badge" key={i}>{badge}</span>
                  ))}
                </div>
                <p className="carousel-metric">↗ {project.metric}</p>
                <div className="carousel-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="carousel-link-btn"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <FaGithub />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="carousel-link-btn carousel-link-demo"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <MdArrowOutward />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
