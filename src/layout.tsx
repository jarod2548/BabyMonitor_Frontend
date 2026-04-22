import { Outlet } from "react-router-dom";

function Layout() {
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
        <Outlet />
      </div>
    </>
  );
}

export default Layout;