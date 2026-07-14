import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/api";

export default function InterviewQuestions() {
  const [questions, setQuestions] = useState({ technical: [], hr: [], project: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const seekerId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchQuestions = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await authApi.get(`/auth/users/${seekerId}/interview-questions`);
        setQuestions(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load interview questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [seekerId, token, navigate]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-dark">Tailored Interview Questions</h2>
      <p className="text-muted mb-5">
        These questions are dynamically generated based on the skills in your profile/uploaded resume.
      </p>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      <div className="row g-4">
        {/* Technical Questions */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 rounded-3">
            <div className="card-header bg-primary text-white py-3">
              <h5 className="mb-0 fw-bold">Technical Questions</h5>
            </div>
            <div className="card-body">
              {questions.technical.length === 0 ? (
                <p className="text-muted">No technical questions generated.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {questions.technical.map((q, idx) => (
                    <li className="list-group-item px-0 py-3" key={idx}>
                      {q}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* HR Questions */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 rounded-3">
            <div className="card-header bg-success text-white py-3">
              <h5 className="mb-0 fw-bold">HR Questions</h5>
            </div>
            <div className="card-body">
              {questions.hr.length === 0 ? (
                <p className="text-muted">No HR questions generated.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {questions.hr.map((q, idx) => (
                    <li className="list-group-item px-0 py-3" key={idx}>
                      {q}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Project Questions */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 rounded-3">
            <div className="card-header bg-dark text-white py-3">
              <h5 className="mb-0 fw-bold">Project-Based Questions</h5>
            </div>
            <div className="card-body">
              {questions.project.length === 0 ? (
                <p className="text-muted">No project-based questions generated.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {questions.project.map((q, idx) => (
                    <li className="list-group-item px-0 py-3" key={idx}>
                      {q}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
