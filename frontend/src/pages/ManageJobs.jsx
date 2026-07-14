import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jobApi } from "../services/api";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [lastDate, setLastDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await jobApi.get("/jobs");
      setJobs(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || role !== "ADMIN") {
      navigate("/login");
      return;
    }
    fetchJobs();
  }, [token, role, navigate]);

  const handleOpenAddForm = () => {
    setEditingJobId(null);
    setTitle("");
    setCompany("");
    setDescription("");
    setLocation("");
    setSalary("");
    setExperience("");
    setCategory("");
    setJobType("Full-time");
    setLastDate("");
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const handleOpenEditForm = (job) => {
    setEditingJobId(job.id);
    setTitle(job.title || "");
    setCompany(job.company || "");
    setDescription(job.description || "");
    setLocation(job.location || "");
    setSalary(job.salary || "");
    setExperience(job.experience || "");
    setCategory(job.category || "");
    setJobType(job.jobType || "Full-time");
    setLastDate(job.lastDate || "");
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    const payload = {
      title,
      company,
      description,
      location,
      salary,
      experience,
      category,
      jobType,
      lastDate,
    };

    try {
      if (editingJobId) {
        await jobApi.put(`/jobs/${editingJobId}`, payload);
        setSuccess("Job updated successfully!");
      } else {
        await jobApi.post("/jobs", payload);
        setSuccess("Job created successfully!");
      }
      setShowForm(false);
      fetchJobs();
    } catch (err) {
      console.error(err);
      setError("Failed to save job posting. Please verify inputs.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) {
      return;
    }

    setError("");
    setSuccess("");
    try {
      await jobApi.delete(`/jobs/${id}`);
      setSuccess("Job posting deleted successfully!");
      fetchJobs();
    } catch (err) {
      console.error(err);
      setError("Failed to delete job posting.");
    }
  };

  if (loading && jobs.length === 0) {
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Manage Jobs</h2>
        <button onClick={handleOpenAddForm} className="btn btn-primary btn-lg">
          Add New Job
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Form Card overlay/display */}
      {showForm && (
        <div className="card shadow mb-5 border-0 rounded-3 bg-light">
          <div className="card-body p-4">
            <h4 className="fw-bold mb-4">{editingJobId ? "Edit Job Posting" : "Add New Job Posting"}</h4>
            <form onSubmit={handleFormSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Job Title</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Salary Range</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. ₹8L - ₹12L"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Experience Level</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 0-1 years"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Software, Finance"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Job Type</label>
                  <select
                    className="form-select"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Last Date to Apply</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="YYYY-MM-DD"
                    value={lastDate}
                    onChange={(e) => setLastDate(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Job Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 d-flex gap-2">
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? "Saving..." : "Save Job"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Jobs Table */}
      <div className="card shadow border-0 rounded-3">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-dark">
                <tr>
                  <th className="py-3 ps-4">Title</th>
                  <th className="py-3">Company</th>
                  <th className="py-3">Location</th>
                  <th className="py-3 text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-5">
                      No jobs posted yet.
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job.id}>
                      <td className="py-3 ps-4 fw-semibold text-dark">{job.title}</td>
                      <td className="py-3 text-muted">{job.company}</td>
                      <td className="py-3">{job.location}</td>
                      <td className="py-3 text-end pe-4">
                        <button
                          onClick={() => handleOpenEditForm(job)}
                          className="btn btn-sm btn-outline-warning me-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
