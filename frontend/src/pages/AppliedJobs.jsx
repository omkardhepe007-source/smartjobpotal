import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jobApi } from "../services/api";

export default function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [jobsMap, setJobsMap] = useState({});
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

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch seeker applications
        const appsRes = await jobApi.get(`/applications/seeker/${seekerId}`);
        const apps = appsRes.data;

        // Fetch all jobs to build a lookup mapping
        const jobsRes = await jobApi.get("/jobs");
        const jobs = jobsRes.data;
        const mapping = {};
        jobs.forEach((job) => {
          mapping[job.id] = job;
        });

        setJobsMap(mapping);
        setApplications(apps);
      } catch (err) {
        console.error(err);
        setError("Failed to load application history.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
      <h2 className="mb-4 fw-bold text-dark">Applied Jobs</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow border-0 rounded-3">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-dark">
                <tr>
                  <th className="py-3 ps-4">Job Title</th>
                  <th className="py-3">Company</th>
                  <th className="py-3">Location</th>
                  <th className="py-3 pe-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-5">
                      You haven't applied to any jobs yet.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => {
                    const job = jobsMap[app.jobId] || {};
                    const statusColors = {
                      PENDING: "bg-warning text-dark",
                      SHORTLISTED: "bg-success text-white",
                      REJECTED: "bg-danger text-white",
                    };
                    const badgeClass = statusColors[app.status] || "bg-secondary text-white";

                    return (
                      <tr key={app.id}>
                        <td className="py-3 ps-4 fw-semibold text-dark">
                          {job.title || `Job ID: ${app.jobId}`}
                        </td>
                        <td className="py-3 text-muted">{job.company || "Unknown Company"}</td>
                        <td className="py-3">{job.location || "N/A"}</td>
                        <td className="py-3 pe-4">
                          <span className={`badge ${badgeClass} p-2 px-3 rounded-pill`}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
