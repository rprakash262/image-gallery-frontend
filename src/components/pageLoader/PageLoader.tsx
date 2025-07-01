function PageLoader() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        // padding: "10px",
        // boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div id="spinner" />
      {/* <p style={{ textAlign: "center" }}>Loading...</p> */}
    </div>
  );
}

export default PageLoader;
