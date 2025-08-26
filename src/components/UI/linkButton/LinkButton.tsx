export const LinkButton = ({ onClick, label, icon: Icon, iconSize = 18, style }: any) => {
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
        ...style
      }}
    >
      <span style={{ color: "var(--primary-color)", fontWeight: "bold" }}>
        {label}
      </span>
      {Icon && (
        <Icon size={iconSize} color="var(--primary-color)" />
      )}
    </button>
  );
};
