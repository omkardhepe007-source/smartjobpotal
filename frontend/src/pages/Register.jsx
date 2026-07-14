export default function Register() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="mb-3">Create Account</h3>
              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input className="form-control" type="email" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input className="form-control" type="password" />
                </div>
                <button className="btn btn-success w-100">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
