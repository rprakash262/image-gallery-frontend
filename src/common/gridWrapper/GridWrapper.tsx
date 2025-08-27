function GridWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 200px)",
        gap: "20px",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      { children }
    </div>
  )
}

export default GridWrapper;