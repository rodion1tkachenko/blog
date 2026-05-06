import { useState } from "react";
import { Navigate } from "react-router-dom";
import { createPost } from "../api/postApi";

export default function Admin() {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) return;

        await createPost({ title, content });
        setTitle("");
        setContent("");
        alert("Post created!");
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>Админка автора</h1>

                <div style={styles.card}>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Название поста..."
                        style={styles.input}
                    />

                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Напишите ваши мысли сюда..."
                        style={styles.textarea}
                    />

                    <button onClick={handleSubmit} style={styles.button}>
                        Create post
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        background: "#eef1f5",
        minHeight: "100vh",
        padding: "40px 0",
        fontFamily: "Arial, sans-serif"
    },

    container: {
        maxWidth: "600px",
        margin: "0 auto"
    },

    title: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#111827",
        fontSize: "22px",
        fontWeight: "600"
    },

    card: {
        background: "#fafafa",
        padding: "20px",
        borderRadius: "14px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)"
    },

    input: {
        width: "100%",
        padding: "10px 12px",
        marginBottom: "12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        fontSize: "14px"
    },

    textarea: {
        width: "100%",
        height: "180px",
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        fontSize: "14px",
        resize: "vertical"
    },

    button: {
        width: "100%",
        padding: "10px",
        background: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer"
    }
};