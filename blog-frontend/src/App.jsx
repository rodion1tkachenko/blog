import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

export default function App() {
    return (
        <BrowserRouter>
            <nav style={styles.nav}>
                <Link to="/">Home</Link>

                {!token && <Link to="/login">Login</Link>}

                {token && (
                    <>
                        <Link to="/admin">Admin</Link>
                        <button onClick={handleLogout} style={styles.button}>
                            Logout
                        </button>
                    </>
                )}
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
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
        gap: 20,
        padding: 10,
        background: "#111",
    },
    button: {
        background: "red",
        color: "white",
        border: "none",
        padding: "6px 10px",
        cursor: "pointer",
        borderRadius: 4
    }
};
