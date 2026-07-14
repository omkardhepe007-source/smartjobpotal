export default function InterviewQuestions() {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Interview Questions</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Technical Questions</h5>
              <ul>
                <li>Explain Spring Boot dependency injection.</li>
                <li>What is Java 21 virtual threads?</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>HR Questions</h5>
              <ul>
                <li>Tell me about yourself.</li>
                <li>Why do you want this role?</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Project-Based Questions</h5>
              <ul>
                <li>Describe your portfolio project architecture.</li>
                <li>How did you implement JWT security?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
