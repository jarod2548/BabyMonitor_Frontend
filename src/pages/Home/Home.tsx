import { useNavigate } from "react-router-dom";
import { HomeDocentAction } from "./Home_Docent";
import Home_Student from "./Home_Student";
import { useAuth } from "../../authorization/useAuth";


function Home() {
    const navigate = useNavigate();
    const context = useAuth();

    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <div>
            <h1>Home</h1>
            <div className="button-group">
                {context?.user?.role === "TEACHER" && <HomeDocentAction embedded />}
                <Home_Student embedded />
                {context?.user ? <p>Welcome</p> : <button onClick={goToLogin}>Login</button>}
            </div>
        </div>
    );
}

export default Home;
