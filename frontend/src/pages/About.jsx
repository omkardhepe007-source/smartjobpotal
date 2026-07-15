export default function About() {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-6">
          <h1 className="display-6 fw-bold">About RojgarSetu</h1>
          <p className="lead">
            This project is built as a complete Java full stack portfolio
            application for a fresher developer.
          </p>
          <p>
            It demonstrates authentication, job management, applications, user
            profile management, admin workflows, and AI-powered interview
            question generation from resumes.
          </p>
        </div>
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Developer Details</h5>
              <p>
                <strong>Name:</strong> Omkar Dhepe
              </p>
              <p>
                <strong>Role:</strong> Java Full Stack Developer
              </p>
              <p>
                <strong>Email:</strong> omkardhepe007@gmail.com
              </p>
              <p>
                <strong>Phone:</strong> +91 9322347102
              </p>
              <a
                href="https://www.linkedin.com/in/omkar-dhepe-b57a56311"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
