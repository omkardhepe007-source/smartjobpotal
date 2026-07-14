import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jobApi } from "../services/api";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await jobApi.get("/jobs", {
        params: {
          keyword,
          category,
          location,
          experience,
        },
      });
      setJobs(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Available Jobs</h2>

      {/* Filter and Search Form */}
      <form onSubmit={handleSearchSubmit} className="row g-3 mb-5 p-4 bg-light rounded shadow-sm">
        <div className="col-md-3">
          <label className="form-label">Search Keyword</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Java, React"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Software, Finance"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Pune, Mumbai, Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="col-md-3 d-flex align-items-end">
          <button type="submit" className="btn btn-primary w-100">
            Search Jobs
          </button>
        </div>
      </form>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {jobs.length === 0 ? (
            <div className="col-12 text-center text-muted py-5">
              <h5>No jobs found matching your criteria.</h5>
            </div>
          ) : (
            jobs.map((job) => (
              <div className="col-md-4" key={job.id}>
                <div className="card h-100 shadow-sm border-0 rounded-3">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-dark">{job.title}</h5>
                    <p className="text-primary fw-semibold mb-2">{job.company}</p>
                    <p className="card-text mb-1">
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Salary:</strong> {job.salary}
                    </p>
                    <p className="card-text mb-3">
                      <strong>Experience:</strong> {job.experience}
                    </p>
                    <Link to={`/jobs/${job.id}`} className="btn btn-outline-primary mt-auto">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
