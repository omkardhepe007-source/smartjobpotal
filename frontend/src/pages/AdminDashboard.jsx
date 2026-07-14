import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-dark">Admin Dashboard</h2>
      <div className="row g-4">
        {/* Manage Jobs Card */}
        <div className="col-md-4">
          <Link to="/admin/jobs" className="text-decoration-none text-dark">
            <div className="card h-100 shadow-sm border-0 rounded-3">
              <div className="card-body p-4">
                <h5 className="fw-bold text-primary mb-2">Manage Jobs</h5>
                <p className="text-muted mb-0">Create, review, update, and delete job postings.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Manage Users Card */}
        <div className="col-md-4">
          <Link to="/admin/users" className="text-decoration-none text-dark">
            <div className="card h-100 shadow-sm border-0 rounded-3">
              <div className="card-body p-4">
                <h5 className="fw-bold text-success mb-2">Manage Users</h5>
                <p className="text-muted mb-0">Review all registered users and candidates.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Manage Applications Card */}
        <div className="col-md-4">
          <Link to="/admin/applications" className="text-decoration-none text-dark">
            <div className="card h-100 shadow-sm border-0 rounded-3">
              <div className="card-body p-4">
                <h5 className="fw-bold text-dark mb-2">Applications</h5>
                <p className="text-muted mb-0">Track applications and shortlist candidates.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
