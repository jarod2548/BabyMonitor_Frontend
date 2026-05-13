import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import type { CourseDTO } from "../../../contracts/Course/CourseDTO";
import { courseService } from "../../../Services/CourseService";
import { useNavigate } from "react-router-dom";
import type { CourseReponseDTO } from "../../../contracts/Course/CourseResponseDTO";
import "./CreateCourses.css";
export default function CreateLessons() {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState<CourseDTO>({
    titel: ""
    // Add other fields from VraagDTO here
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseData(prev => ({ ...prev, titel : e.target.value }));
  };

 const handleSubmit = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const error = courseService.validateCourse(courseData);

    if (error) {
      setMessage(error);
    } else {
      saveCourse();
    }
  };

  const saveCourse = async () => {
    const result : CourseReponseDTO | null = await courseService.maakCourse(courseData);
    if(result != null){
      navigate(`/create_vragen/${result.courseID}`);
    }
    else {
    setMessage("Fout bij het aanmaken van de cursus.");
    }
    
  }

return (
  <div className="mmc-page">
    <div className="mmc-card">
      <h2>Maak een nieuwe course</h2>

      <form onSubmit={handleSubmit} className="mmc-form">
        <label>
          Titel
          <input
            type="text"
            name="titel"
            value={courseData.titel}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Sla Course op</button>
      </form>

      {message && <p className="login-message">{message}</p>}
    </div>
  </div>
);
}