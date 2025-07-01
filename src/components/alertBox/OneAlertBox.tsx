import { IconX } from "@tabler/icons-react";
import { useEffect } from "react";

function OneAlertBox({
  alertMsgText,
  alertMsgType,
  removeAlertBoxMsg,
  timeout,
}: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeAlertBoxMsg();
    }, timeout ?? 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      style={{
        width: "300px",
        height: "50px",
        borderRadius: "4px",
        border: "1px solid var(--border-color)",
        borderLeft: `5px solid ${
          alertMsgType === "success"
            ? "var(--success-color)"
            : "var(--error-color)"
        }`,
        display: "flex",
        alignItems: "center",
        paddingLeft: "5px",
        position: "relative",
      }}
    >
      <IconX
        // stroke={1}
        size={20}
        onClick={removeAlertBoxMsg}
        style={{
          position: "absolute",
          right: "5px",
          top: "5px",
          cursor: "pointer",
        }}
      />
      <p style={{ fontSize: "14px" }}>{alertMsgText}</p>
    </div>
  );
}

export default OneAlertBox;
