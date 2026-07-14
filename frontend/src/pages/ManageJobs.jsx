export default function ManageJobs() {
  return (
    <div className="container py-5">
      <h2>Manage Jobs</h2>
      <button className="btn btn-primary mb-3">Add New Job</button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Java Full Stack Developer</td>
            <td>TechNova</td>
            <td>Pune</td>
            <td>
              <button className="btn btn-sm btn-warning me-2">Edit</button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
