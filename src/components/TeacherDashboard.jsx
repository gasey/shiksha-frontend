import { useEffect, useState } from "react";
import api from "../api/apiClient";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/courses/?mine=true")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Failed to load teacher courses", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading your courses...</p>;

  return (
    <div className="dashboard">
      <h2>Your Courses</h2>

      {courses.length === 0 && (
        <p>You have not created any courses yet.</p>
      )}

      {courses.map((course) => (
        <div key={course.id} className="course-card">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}

      <button style={{ marginTop: 20 }}>
        + Create New Course
      </button>
    </div>
  );
};

export default TeacherDashboard;
