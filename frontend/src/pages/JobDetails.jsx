import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobApi, authApi } from "../services/api";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);
  const [success, setSuccess] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  const seekerId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJobAndUser = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch Job Details
        const jobRes = await jobApi.get(`/jobs/${id}`);
        setJob(jobRes.data);

        // Fetch User profile for resume details if logged in
        if (token && seekerId) {
          const userRes = await authApi.get(`/auth/users/${seekerId}`);
          setUserProfile(userRes.data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobAndUser();
  }, [id, token, seekerId]);

  const handleApply = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    setApplying(true);
    setSuccess("");
    setError("");

    try {
      await jobApi.post("/applications", {
        jobId: job.id,
        seekerId: seekerId,
        seekerName: userProfile?.fullName || localStorage.getItem("fullName") || "Job Seeker",
        email: userProfile?.email || localStorage.getItem("email") || "",
        resumePath: userProfile?.resumePath || "",
      });
      setSuccess("Application submitted successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to submit application. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow border-0 rounded-3">
        <div className="card-body p-5">
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold text-dark mb-1">{job.title}</h2>
              <p className="lead text-primary fw-semibold mb-0">{job.company}</p>
            </div>
            <span className="badge bg-secondary p-2 fs-6">{job.jobType || "Full-time"}</span>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <strong>Location:</strong>
              <p className="text-muted">{job.location}</p>
            </div>
            <div className="col-md-4">
              <strong>Salary:</strong>
              <p className="text-muted">{job.salary}</p>
            </div>
            <div className="col-md-4">
              <strong>Experience:</strong>
              <p className="text-muted">{job.experience}</p>
            </div>
          </div>

          <div className="mb-4">
            <strong>Category:</strong>
            <p className="text-muted">{job.category}</p>
          </div>

          <div className="mb-4">
            <strong>Job Description:</strong>
            <p style={{ whiteSpace: "pre-wrap" }} className="text-muted">
              {job.description || "No description provided."}
            </p>
          </div>

          {job.lastDate && (
            <div className="mb-4 text-danger fw-semibold">
              Apply Before: {job.lastDate}
            </div>
          )}

          <button
            onClick={handleApply}
            className="btn btn-primary btn-lg"
            disabled={applying}
          >
            {applying ? "Applying..." : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
