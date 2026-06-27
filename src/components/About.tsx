import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <div className="about-paragraphs">
          <p className="para">
            I build things that sit at the intersection of AI and real-world
            use — Flutter apps with smart backends, deep learning pipelines,
            and full-stack systems that actually ship. I'm drawn to problems
            where good engineering makes a visible difference.
          </p>
          <p className="para">
            Right now I'm deepening my work in NLP and computer vision through
            research and side projects, while expanding my Flutter architecture
            skills beyond state management into production-grade deployment.
          </p>
          <p className="para">
            I'm open to internships, research collaborations, and freelance
            mobile/AI projects. If you're building something that needs
            someone who can own both the model and the UI — let's talk.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
