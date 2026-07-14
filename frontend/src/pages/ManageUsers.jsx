export default function ManageUsers() {
  return (
    <div className="container py-5">
      <h2>Manage Users</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Omkar Dhepe</td>
            <td>omkar@example.com</td>
            <td>JOB_SEEKER</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
