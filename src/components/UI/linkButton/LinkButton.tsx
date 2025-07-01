export const LinkButton = ({ onClick, label, icon: Icon }: any) => {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <span style={{ color: "var(--primary-color)", fontWeight: "bold" }}>
        {label}
      </span>
      <Icon size={18} color="var(--primary-color)" />
    </button>
  );
};
