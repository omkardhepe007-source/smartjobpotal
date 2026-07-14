export default function AdminDashboard() {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Manage Jobs</h5>
              <p>Create and update job postings.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Manage Users</h5>
              <p>Review registered job seekers.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Applications</h5>
              <p>Track applications and shortlist candidates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
