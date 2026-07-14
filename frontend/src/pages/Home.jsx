const jobs = [
  {
    title: "Java Full Stack Developer",
    company: "TechNova",
    location: "Pune",
    salary: "₹8L - ₹12L",
  },
  {
    title: "Backend Developer",
    company: "CodeBridge",
    location: "Mumbai",
    salary: "₹6L - ₹10L",
  },
  {
    title: "Frontend Developer",
    company: "PixelWorks",
    location: "Remote",
    salary: "₹5L - ₹9L",
  },
];

export default function Home() {
  return (
    <div>
      <section className="bg-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1 className="display-5 fw-bold">
                Find Your Dream Job with Smart Job Portal
              </h1>
              <p className="lead">
                A modern platform for freshers and professionals to explore
                opportunities, apply instantly, and prepare for interviews.
              </p>
              <a href="/jobs" className="btn btn-light btn-lg me-2">
                Browse Jobs
              </a>
              <a href="/register" className="btn btn-outline-light btn-lg">
                Create Account
              </a>
            </div>
            <div className="col-lg-5">
              <div className="card text-dark shadow">
                <div className="card-body">
                  <h5 className="card-title">Why Choose Us?</h5>
                  <ul className="mb-0">
                    <li>Secure JWT authentication</li>
                    <li>Easy job search and filters</li>
                    <li>Resume-based interview prep</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="mb-4">Featured Jobs</h2>
        <div className="row g-4">
          {jobs.map((job) => (
            <div className="col-md-4" key={job.title}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="text-muted mb-1">{job.company}</p>
                  <p className="mb-1">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="mb-0">
                    <strong>Salary:</strong> {job.salary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
