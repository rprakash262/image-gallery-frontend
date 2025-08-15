interface ButtonProps {
  label: string;
  btnType: "primary" | "secondary";
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick: () => void;
  style?: any;
}

function Button({
  label,
  btnType,
  isDisabled,
  isLoading,
  onClick,
  style,
}: ButtonProps) {
  return (
    <button
      style={{
        width: "100%",
        padding: "10px",
        cursor: isDisabled || isLoading ? "no-drop" : "pointer",
        borderRadius: "4px",
        border: "none",
        backgroundColor:
          btnType === "primary"
            ? "var(--primary-color)"
            : "var(--secondary-color)",
        color: btnType === "primary" ? "#fff" : "#000",
        // marginBottom: "10px",
        ...style,
      }}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? "Please Wait..." : label}
    </button>
  );
}

export default Button;
