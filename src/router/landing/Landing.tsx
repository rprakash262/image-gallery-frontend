import { useNavigate } from "react-router";
import Button from "../../components/UI/button/Button";

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <img src="/assets/logo.jpg" style={{ width: "25%", display: "block", margin: "auto", marginBottom: "20px" }} />
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Welcome to the Image Gallery</h1>
      <p style={{ textAlign: "center", marginBottom: "10px" }}>Explore your photos and albums.</p>
      <p style={{ textAlign: "center", marginBottom: "10px" }}>Login to get started.</p>
      <div style={{ width: "30%", margin: "auto" }}>
        <Button
          onClick={() => navigate("/login")}
          label="Login"
          btnType="primary"
        />
      </div>
    </div>
  );
}

export default Landing;
