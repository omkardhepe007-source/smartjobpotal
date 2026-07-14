export default function ManageApplications() {
  return (
    <div className="container py-5">
      <h2>Manage Applications</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Job</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Omkar</td>
            <td>Java Full Stack Developer</td>
            <td>PENDING</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
