import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authorization/useAuth";
import type { CourseReponseDTO } from "../../contracts/Course/CourseResponseDTO";

export default function Lessons() {
  const context = useAuth();
  const navigate = useNavigate();
  const courses: CourseReponseDTO[] = [{titel : "Titel", courseID : 1}];

  const startLesson = (course : CourseReponseDTO) => {
    console.log("Start lesson:", course);
    navigate(`/course/${course.courseID}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Only show the "Create" button if the user is a Teacher */}
        {context?.user?.role === "TEACHER" && (
          <button 
            className="pill create-button" 
            onClick={() => navigate("/create_courses")}
          >
            + Create New Course
          </button>
        )}
      </div>
      <h1>Select a Course</h1>

      {courses.map((course) => (
        <div key={course.courseID}>
          {course.titel}
          <button onClick={() => startLesson(course)}>
            Start
          </button>
        </div>
      ))}
    </div>
  );
}