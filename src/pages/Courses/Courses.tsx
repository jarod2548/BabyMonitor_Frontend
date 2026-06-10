import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authorization/useAuth";
import type { CourseReponseDTO } from "../../contracts/Course/CourseResponseDTO";
import { useEffect, useState } from "react";
import { courseService } from "../../Services/CourseService";

export default function Lessons() {
  const context = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseReponseDTO[]>([]);

  const startLesson = (course : CourseReponseDTO) => {
    console.log("Start lesson:", course);
    navigate(`/course/${course.id}`);
  };

  useEffect(() => {
    const fetchCourses = async() =>{
      const data = await courseService.leesCourses();
      setCourses(data);
    };
    fetchCourses(); 
  }, [])

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
  <div key={course.id} className="course-row">
    {course.titel}

    <button onClick={() => startLesson(course)}>
      Start
    </button>

    {context?.user?.role === "TEACHER" && (
      <>
        <button
          onClick={() => navigate(`/edit_course/${course.id}`)}
        >
          Pas de course aan
        </button>
      </>
    )}
  </div>
))}
    </div>
  );
}