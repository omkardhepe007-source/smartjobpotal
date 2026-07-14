import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jobApi } from "../services/api";

export default function ManageApplications() {
  const [applications, setApplications] = useState([]);
  const [jobsMap, setJobsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch all applications
      const appsRes = await jobApi.get("/applications");
      
      // Fetch all jobs to map details
      const jobsRes = await jobApi.get("/jobs");
      const mapping = {};
      jobsRes.data.forEach((job) => {
        mapping[job.id] = job;
      });

      setJobsMap(mapping);
      setApplications(appsRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || role !== "ADMIN") {
      navigate("/login");
      return;
    }
    fetchData();
  }, [token, role, navigate]);

  const handleUpdateStatus = async (id, status) => {
    setError("");
    setSuccess("");
    try {
      await jobApi.put(`/applications/${id}/status`, null, {
        params: { status },
      });
      setSuccess(`Application status updated to ${status}!`);
      fetchData();
    } catch (err) {
      console.error(err);
      setError("Failed to update status.");
    }
  };

  if (loading && applications.length === 0) {
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
      <h2 className="mb-4 fw-bold text-dark">Manage Applications</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card shadow border-0 rounded-3">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-dark">
                <tr>
                  <th className="py-3 ps-4">Applicant</th>
                  <th className="py-3">Job Title</th>
                  <th className="py-3">Company</th>
                  <th className="py-3">Resume</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-5">
                      No applications submitted yet.
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
                        <td className="py-3 ps-4">
                          <div className="fw-semibold text-dark">{app.seekerName}</div>
                          <div className="small text-muted">{app.email}</div>
                        </td>
                        <td className="py-3">{job.title || `Job ID: ${app.jobId}`}</td>
                        <td className="py-3 text-muted">{job.company || "N/A"}</td>
                        <td className="py-3">
                          {app.resumePath ? (
                            <span className="text-success small">📄 Resume Attached</span>
                          ) : (
                            <span className="text-muted small">No Resume</span>
                          )}
                        </td>
                        <td className="py-3">
                          <span className={`badge ${badgeClass} p-2 rounded-pill`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3 text-end pe-4">
                          {app.status === "PENDING" && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(app.id, "SHORTLISTED")}
                                className="btn btn-sm btn-success me-2"
                              >
                                Shortlist
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(app.id, "REJECTED")}
                                className="btn btn-sm btn-danger"
                              >
                                Reject
                              </button>
                            </>
                          )}
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
