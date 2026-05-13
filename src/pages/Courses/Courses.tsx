import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authorization/useAuth";
import type { CourseReponseDTO } from "../../contracts/Course/CourseResponseDTO";
import { courseService } from "../../Services/CourseService";
import "./Courses.css";

export default function Lessons() {
  const context = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<CourseReponseDTO[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await courseService.leesCourses();

      if (result !== null) {
        setCourses(result);
      } else {
        setMessage("Fout bij het ophalen van de courses.");
      }
    };

    fetchCourses();
  }, []);

  const startLesson = (course: CourseReponseDTO) => {
    navigate(`/course/${course.courseID}`);
  };

  return (
    <div className="lessons-page">

      <div className="lessons-header">
        <h1 className="lessons-title">Select a Course</h1>

        {context?.user?.role === "TEACHER" && (
          <button
            className="create-button"
            onClick={() => navigate("/create_courses")}
          >
            + Create New Course
          </button>
        )}
      </div>

      {message && <p className="message">{message}</p>}

      <div className="courses-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.courseID}>

            <h2 className="course-title">
              {course.titel}
            </h2>

            <button
              className="start-button"
              onClick={() => startLesson(course)}
            >
              Start Course
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}