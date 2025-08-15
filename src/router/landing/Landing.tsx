import { useNavigate } from "react-router";
import Button from "../../components/UI/button/Button";

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      padding: "20px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <img src="/assets/logo.jpg" style={{ width: "25%", marginBottom: "20px" }} />
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
        Welcome to the Image Gallery
      </h1>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Explore your photos and albums. Login to get started
      </p>
      <Button
        onClick={() => navigate("/login")}
        label="Login"
        btnType="primary"
        style={{ width: "30%", }}
      />
    </div>
  );
}

export default Landing;
