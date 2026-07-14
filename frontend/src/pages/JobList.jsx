const sampleJobs = [
  {
    id: 1,
    title: "Java Full Stack Developer",
    company: "TechNova",
    location: "Pune",
    category: "Software",
    experience: "0-1 years",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CodeBridge",
    location: "Mumbai",
    category: "Backend",
    experience: "1-2 years",
  },
  {
    id: 3,
    title: "UI Developer",
    company: "PixelWorks",
    location: "Remote",
    category: "Frontend",
    experience: "0-1 years",
  },
];

export default function JobList() {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Available Jobs</h2>
      <div className="row g-4">
        {sampleJobs.map((job) => (
          <div className="col-md-4" key={job.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <p className="text-muted">{job.company}</p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Category:</strong> {job.category}
                </p>
                <p>
                  <strong>Experience:</strong> {job.experience}
                </p>
                <a href={`/jobs/${job.id}`} className="btn btn-outline-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
