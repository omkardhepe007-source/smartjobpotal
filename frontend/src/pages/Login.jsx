export default function Login() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="mb-3">Login</h3>
              <form>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input className="form-control" type="email" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input className="form-control" type="password" />
                </div>
                <button className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
