export default function Profile() {
  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-body p-4">
          <h3>My Profile</h3>
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Mobile</label>
                <input className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input className="form-control" />
              </div>
              <div className="col-12">
                <label className="form-label">Skills</label>
                <textarea className="form-control" rows="3" />
              </div>
            </div>
            <button className="btn btn-primary mt-3">Save Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
}
