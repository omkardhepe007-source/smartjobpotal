import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../services/api";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [parsedSkills, setParsedSkills] = useState("");
  const navigate = useNavigate();

  const seekerId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSuccess("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
      return;
    }
    if (!file) {
      setError("Please select a PDF resume file to upload.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await authApi.post(`/auth/users/${seekerId}/resume`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Resume uploaded and parsed successfully!");
      if (response.data.skills) {
        setParsedSkills(response.data.skills);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to upload resume. Please make sure it is a valid file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow border-0 rounded-3">
        <div className="card-body p-5">
          <h3 className="mb-3 fw-bold text-dark">Upload Resume</h3>
          <p className="text-muted">
            Upload a PDF resume to analyze your profile and automatically generate tailored, AI-based interview questions.
          </p>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && (
            <div className="alert alert-success">
              {success}
              {parsedSkills && (
                <div className="mt-2">
                  <strong>Automatically extracted skills:</strong> {parsedSkills}
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleUpload}>
            <div className="mb-4">
              <input
                className="form-control form-control-lg"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>

            <div className="d-flex align-items-center gap-3">
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? "Uploading and Analyzing..." : "Upload and Analyze"}
              </button>
              {success && (
                <Link to="/interview-questions" className="btn btn-success btn-lg">
                  Prepare for Interview
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
