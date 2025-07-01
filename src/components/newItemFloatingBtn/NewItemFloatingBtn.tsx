import { IconPlus } from "@tabler/icons-react";

function NewItemFloatingBtn({ onClick }: { onClick: () => void }) {
  return (
    <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
      <button
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          cursor: "pointer",
          border: "none",
        }}
        onClick={onClick}
      >
        <IconPlus size={30} stroke={3} />
      </button>
    </div>
  );
}

export default NewItemFloatingBtn;
