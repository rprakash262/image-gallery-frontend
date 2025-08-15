import { useNavigate } from "react-router";
import { IconBrandGithubFilled } from "@tabler/icons-react";

import Button from "../../components/UI/button/Button";
import Header from "../../components/header/Header";

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div>
        <div
          style={{
            height: "58px",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <Header showGithubBtn={true} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "calc(100vh - 59px)",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
            Welcome to the Image Gallery
          </h1>
          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            Explore your photos and albums. Login to get started.
          </p>
          <Button
            onClick={() => navigate("/login")}
            label="Login"
            btnType="primary"
            style={{ width: "15%", }}
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
