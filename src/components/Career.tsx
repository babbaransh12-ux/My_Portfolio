import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Lead Developer</h4>
                <h5>E-GatePass Management System</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Engineered the backend database architecture by replacing a single status update with dual-column timestamps for tracking distinct entry and exit events. Ensured the application logic maintained a persistent QR code on the dashboard until full termination.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Co-Author & Developer</h4>
                <h5>Project Phoenix</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Successfully developed the core model, achieving acceptance for a paper presentation at the ICISTM 2025 international conference. AI conversational research assistant platform built to unify fragmented marine datasets for CMLRE.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Team Leader</h4>
                <h5>Krishikalap (SIH Hackathon)</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Managed project files, coordinated team tasks in a shared SIH workspace, and oversaw the technical submission for agricultural problem statements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
