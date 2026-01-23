import { useEffect, useState } from "react";
import api from "../api/apiClient";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/courses/")
      .then(res => setCourses(res.data))
      .catch(() => setError("Failed to load courses"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard">
      <h2>Available Courses</h2>

      {courses.length === 0 && <p>No courses available.</p>}

      {courses.map(course => (
        <div key={course.id} className="course-card">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default StudentDashboard;
