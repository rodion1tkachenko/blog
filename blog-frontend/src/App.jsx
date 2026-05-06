import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

export default function App() {
    return (
        <BrowserRouter>
            <nav style={styles.nav}>
                <Link to="/">Home</Link>
                <Link to="/admin">Admin</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

const styles = {
    nav: {
        display: "flex",
        gap: 20,
        padding: 10,
        background: "#111",
    }
};
