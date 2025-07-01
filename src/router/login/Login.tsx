import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";

import FormControl from "../../components/UI/formControl/FormControl";
import Button from "../../components/UI/button/Button";
import { userApi } from "../../apis/userApi";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || "/photos";

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await userApi.login(email, password);

      const accessToken = response.data.accessToken;
      const user = response.data.user;

      login(user, accessToken);
      // window.location.reload();
      navigate("/")
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return user?._id ? (
    <Navigate to={redirectPath} />
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "350px" }}>
        <h4 style={{ textAlign: "center", marginBottom: "20px" }}>
          Please fill all the details
        </h4>
        <FormControl
          label="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          style={{ marginBottom: "20px" }}
          placeholder="Enter email..."
        />
        <FormControl
          label="Password"
          inputType="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          style={{ marginBottom: "20px" }}
          placeholder="Enter password..."
        />
        <div>
          <Button
            label="Submit"
            btnType="primary"
            onClick={onSubmit}
            isLoading={isLoading}
          />
          <p style={{ fontSize: "14px", marginTop: "5px" }}>
            Not registered?{" "}
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "14px",
              }}
              onClick={() => navigate("/register")}
            >
              Register Here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
