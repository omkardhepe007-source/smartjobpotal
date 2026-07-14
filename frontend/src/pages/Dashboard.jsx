export default function Dashboard() {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Job Seeker Dashboard</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Profile</h5>
              <p>Manage your personal details and resume.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Applied Jobs</h5>
              <p>View your application history instantly.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Interview Prep</h5>
              <p>Generate interview questions from your resume.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
