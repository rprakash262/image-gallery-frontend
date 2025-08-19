import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import FormControl from "../../components/UI/formControl/FormControl";
import Button from "../../components/UI/button/Button";
import { userApi } from "../../apis/userApi";
import { AppDispatch } from "../../store";
import { setAlertBoxMsg } from "../../store/slices/alertBoxSlice";

function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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

    if (!confirmPassword) {
      dispatch(
        setAlertBoxMsg({
          alertMsgText: "Confirm password is required.",
          alertMsgType: "error",
        })
      );

      return false;
    }

    if (password !== confirmPassword) {
      dispatch(
        setAlertBoxMsg({
          alertMsgText: "Passwords don't match.",
          alertMsgType: "error",
        })
      );

      return false;
    }

    return true;
  }

  const registerUser = async () => {
    const fieldsValidated = validateFields();

    if (!fieldsValidated) return;

    try {
      setIsLoading(true);
      await userApi.register(email, password);

      setIsLoading(false);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      dispatch(
        setAlertBoxMsg({
          alertMsgText: "Registration Successful.",
          alertMsgType: "success",
        })
      );
    } catch (error: any) {
      setIsLoading(false);
      dispatch(
        setAlertBoxMsg({
          alertMsgText: error.message,
          alertMsgType: "error",
        })
      );
    }
  };

  return (
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
        <FormControl
          label="Confirm Password"
          inputType="password"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          style={{ marginBottom: "20px" }}
          placeholder="Confirm password..."
        />
        <div>
          <Button
            label="Submit"
            btnType="primary"
            isLoading={isLoading}
            onClick={registerUser}
          />
          <p style={{ fontSize: "14px", marginTop: "5px" }}>
            Already registered?{" "}
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "14px",
              }}
              onClick={() => navigate("/login")}
            >
              Login Here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
