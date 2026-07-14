import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/api";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "ADMIN") {
      navigate("/login");
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await authApi.get("/auth/users");
        setUsers(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch registered users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token, role, navigate]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-dark">Manage Users</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow border-0 rounded-3">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-dark">
                <tr>
                  <th className="py-3 ps-4">Name</th>
                  <th className="py-3">Email Address</th>
                  <th className="py-3">Mobile</th>
                  <th className="py-3">Skills</th>
                  <th className="py-3 pe-4">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-5">
                      No users registered yet.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => {
                    const roleName = u.roles?.length > 0 ? u.roles[0].name : "N/A";
                    return (
                      <tr key={u.id}>
                        <td className="py-3 ps-4 fw-semibold text-dark">{u.fullName}</td>
                        <td className="py-3 text-muted">{u.email}</td>
                        <td className="py-3">{u.phone || "N/A"}</td>
                        <td className="py-3 text-truncate" style={{ maxWidth: "250px" }}>
                          {u.skills || "N/A"}
                        </td>
                        <td className="py-3 pe-4">
                          <span className={`badge ${roleName === "ADMIN" ? "bg-success" : "bg-info"} p-2`}>
                            {roleName}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
