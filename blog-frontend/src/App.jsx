import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

export default function App() {
    return (
        <BrowserRouter>
            <nav style={styles.nav}>
                <div style={styles.left}>
                    <Link to="/" style={styles.link}>Home</Link>
                </div>

                <div style={styles.right}>
                    {!token && (
                        <Link to="/login" style={styles.button}>
                            Login
                        </Link>
                    )}

                    {token && (
                        <>
                            <Link to="/admin" style={styles.buttonSecondary}>
                                Admin
                            </Link>

                            <button onClick={handleLogout} style={styles.logoutButton}>
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}
const token = localStorage.getItem("token");

const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        background: "#111827"
    },

    left: {
        display: "flex",
        alignItems: "center",
        gap: "12px"
    },

    right: {
        display: "flex",
        alignItems: "center",
        gap: "10px"
    },

    link: {
        color: "white",
        textDecoration: "none",
        fontWeight: "500"
    },

    button: {
        background: "#3b82f6",
        color: "white",
        padding: "6px 12px",
        borderRadius: "8px",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "500"
    },

    buttonSecondary: {
        background: "#6b7280",
        color: "white",
        padding: "6px 12px",
        borderRadius: "8px",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "500"
    },

    logoutButton: {
        background: "#ef4444",
        color: "white",
        border: "none",
        padding: "6px 12px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500"
    }
};
