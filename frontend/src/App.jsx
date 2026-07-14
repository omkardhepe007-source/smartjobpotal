import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AppliedJobs from "./pages/AppliedJobs";
import ResumeUpload from "./pages/ResumeUpload";
import InterviewQuestions from "./pages/InterviewQuestions";
import AdminDashboard from "./pages/AdminDashboard";
import ManageJobs from "./pages/ManageJobs";
import ManageUsers from "./pages/ManageUsers";
import ManageApplications from "./pages/ManageApplications";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-vh-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applied-jobs" element={<AppliedJobs />} />
          <Route path="/resume-upload" element={<ResumeUpload />} />
          <Route path="/interview-questions" element={<InterviewQuestions />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/jobs" element={<ManageJobs />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/applications" element={<ManageApplications />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
