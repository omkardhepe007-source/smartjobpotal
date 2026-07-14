export default function ResumeUpload() {
  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-body p-4">
          <h3 className="mb-3">Upload Resume</h3>
          <p>Upload a PDF resume to generate AI-based interview questions.</p>
          <input
            className="form-control"
            type="file"
            accept="application/pdf"
          />
          <button className="btn btn-primary mt-3">Upload and Analyze</button>
        </div>
      </div>
    </div>
  );
}
