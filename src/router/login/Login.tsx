import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { setAlertBoxMsg } from "../../store/slices/alertBoxSlice";
import FormControl from "../../components/UI/formControl/FormControl";
import Button from "../../components/UI/button/Button";
import { LinkButton } from "../../components/UI/linkButton/LinkButton";
import { userApi } from "../../apis/userApi";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirectPath = location.state?.path || "/photos";

  const validateFields = () => {
    if (!email) {
      dispatch(
        setAlertBoxMsg({
          alertMsgText: "Email is required.",
          alertMsgType: "error",
        })
      );

      return false;
    }

    if (!password) {
      dispatch(
        setAlertBoxMsg({
          alertMsgText: "Password is required.",
          alertMsgType: "error",
        })
      );

      return false;
    }

    return true;
  }

  const onSubmit = async () => {
    const fieldsValidated = validateFields();

    if (!fieldsValidated) return;

    try {
      setIsLoading(true);
      const response = await userApi.login(email, password);

      const accessToken = response.data.accessToken;
      const user = response.data.user;

      login(user, accessToken);
      navigate("/")
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onGithubClick = () => {
    window.open("https://github.com/rprakash262/image-gallery-frontend", "_blank")
  }

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
        <p style={{ marginBottom: "20px", textAlign: "center", fontSize: "12px" }}>
          <span style={{ color: "red" }}>*</span> 
          Demo credentials available on {" "}
          <LinkButton
            style={{ display: "inline-block" }}
            label="Github"
            onClick={onGithubClick}
          />
        </p>
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
