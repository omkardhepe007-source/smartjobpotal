import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-dark">Job Seeker Dashboard</h2>
      <div className="row g-4">
        {/* Profile Card */}
        <div className="col-md-4">
          <Link to="/profile" className="text-decoration-none text-dark">
            <div className="card h-100 shadow-sm border-0 rounded-3">
              <div className="card-body p-4">
                <h5 className="fw-bold text-primary mb-2">My Profile</h5>
                <p className="text-muted mb-0">Manage your personal details, qualifications, and skills.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Applied Jobs Card */}
        <div className="col-md-4">
          <Link to="/applied-jobs" className="text-decoration-none text-dark">
            <div className="card h-100 shadow-sm border-0 rounded-3">
              <div className="card-body p-4">
                <h5 className="fw-bold text-success mb-2">Applied Jobs</h5>
                <p className="text-muted mb-0">View your applications list and track shortlist status.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Interview Prep / Resume Upload Card */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 rounded-3">
            <div className="card-body p-4 d-flex flex-column">
              <h5 className="fw-bold text-dark mb-2">Interview Preparation</h5>
              <p className="text-muted mb-3">Upload your resume to get dynamic questions tailored to your skills.</p>
              <div className="mt-auto d-grid gap-2">
                <Link to="/resume-upload" className="btn btn-outline-primary btn-sm">
                  Upload Resume
                </Link>
                <Link to="/interview-questions" className="btn btn-outline-dark btn-sm">
                  Interview Questions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
