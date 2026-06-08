import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authorization/useAuth";

function Layout() {
    const context = useAuth();
    const navigate = useNavigate();

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "sans-serif" }}>

            {/* --- POLISHED HEADER --- */}
            <header style={{
                height: "60px",
                width: "100%",
                backgroundColor: "#ffffff",
                borderBottom: "2px solid #eef2f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 25px",
                position: "fixed",
                top: 0,
                zIndex: 1000,
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "20px", fontWeight: "bold", color: "#2d3436", letterSpacing: "-0.5px" }}>
                        BabyMonitor
                    </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <span style={{ fontSize: "14px", color: "#636e72" }}>{context?.user?.role}: <strong>{context?.user?.username || "Student"}</strong></span>
                    <div style={{ width: "35px", height: "35px", borderRadius: "50%", backgroundColor: "#dfe6e9" }}></div>
                </div>
            </header>

            <div style={{ display: "flex", flex: 1, marginTop: "60px" }}>

                {/* --- SIDEBAR --- */}
                <nav style={{
                    width: "240px",
                    backgroundColor: "#f8f9fa",
                    borderRight: "1px solid #eef2f5",
                    padding: "30px 15px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    position: "fixed",
                    height: "calc(100vh - 60px)",
                    left: 0
                }}>
                    <SidebarLink to="/home" icon="" label="Dashboard" />
                    <SidebarLink to="/classes" icon="" label="My Classes" />
                    <SidebarLink to="/lessons" icon="" label="Lessons" />
                    <SidebarLink to="/profile" icon="" label="Profile" />

                    <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: "1px solid #dfe6e9" }}>
                        <button
                            onClick={() => navigate("/login")}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "none",
                                backgroundColor: "#fff0f0",
                                color: "#ff7675",
                                fontWeight: "600",
                                cursor: "pointer",
                                textAlign: "left"
                            }}
                        >
                            🚪 Logout
                        </button>
                    </div>
                </nav>

                {/* --- CONTENT --- */}
                <main style={{
                    marginLeft: "240px",
                    flex: 1,
                    padding: "30px",
                    backgroundColor: "#ffffff",
                    minHeight: "100%"
                }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

// Helper component for Sidebar Links to keep code clean
function SidebarLink({ to, icon, label }: { to: string; icon: string; label: string }) {
    return (
        <Link to={to} style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 15px",
            textDecoration: "none",
            color: "#2d3436",
            fontWeight: "500",
            borderRadius: "10px",
            transition: "background 0.2s"
        }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eef2f5")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
            <span style={{ fontSize: "18px" }}>{icon}</span>
            {label}
        </Link>
    );
}

export default Layout;
