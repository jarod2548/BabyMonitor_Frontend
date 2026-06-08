import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Home from "./Home";
import Home_Docent from "./Home_Docent";
import Layout from "../../layout";
import Classes from "../Classes/Classes";
import Lessons from "../Courses/Courses";
import CreateLessons from "../Teacher/CreateCourses/CreateCourses";
import { ProtectedRoute } from "../../security/ProtectedRoute";
import CreateVragen from "../Teacher/CreateVragen/CreateVragen";
import Course from "../Course/Course";
import Profile from "../Profile/Profile";
import Class_Docent from "../Class_Docent/ClassDocent";
import Class_Student from "../Class_Student/Class_Student";

function App() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

      {/* Protected routes WITH layout */}
      <Route element={<Layout />}>
        <Route
          path="/teacher_class/:id"
          element={
          <ProtectedRoute roles={["TEACHER"]}>
            <Class_Docent />
          </ProtectedRoute>
        }
/>

                <Route
                    path="/home_docent"
                    element={
                        <ProtectedRoute roles={["TEACHER"]}>
                            <Home_Docent />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create_courses"
                    element={
                        <ProtectedRoute roles={["TEACHER"]}>
                            <CreateLessons />
                        </ProtectedRoute>
                    }
                />
                <Route path="/create_vragen">
                    <Route
                        path=":id"
                        element={
                            <ProtectedRoute roles={["TEACHER"]}>
                                <CreateVragen />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                <Route
                    path="/classes"
                    element={
                        <ProtectedRoute roles={["TEACHER", "USER"]}>
                            <Classes />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/lessons"
                    element={
                        <ProtectedRoute roles={["TEACHER", "USER"]}>
                            <Lessons />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student"
                    element={
                        <ProtectedRoute roles={["TEACHER", "USER"]}>
                            <Student />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute roles={["TEACHER", "USER"]}>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route path="/course">
                    <Route
                        path=":id"
                        element={
                            <ProtectedRoute roles={["USER", "TEACHER"]}>
                                <Course />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
