import { useNavigate } from "react-router-dom";
import { HomeDocentAction } from "./Home_Docent";
import Home_Student from "./Home_Student";
import { useAuth } from "./useAuth";

function Home() {
  const navigate = useNavigate();
  const loggedIn = useAuth();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1></h1>
      <div className="button-group">
        <HomeDocentAction embedded />
        <Home_Student embedded />
        {loggedIn ? <p>Welcome</p> : <button onClick={goToLogin}>Login</button>}
      </div>
    </div>
  );
}

export default Home;
