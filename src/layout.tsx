function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      {/* Global Banner */}
      <div style={{
        width: "100%",
        backgroundColor: "#ffcc00",
        padding: "10px",
        textAlign: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000
      }}>
        🚧 This is a global banner
      </div>

      {/* Page content */}
      <div style={{ marginTop: "50px" }}>
        {children}
      </div>
    </>
  );
}

export default Layout;