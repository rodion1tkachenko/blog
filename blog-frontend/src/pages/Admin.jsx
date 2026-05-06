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
        await createPost({ title, content });
        setTitle("");
        setContent("");
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Admin</h1>

            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="title"
            />

            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="content"
            />

            <button onClick={handleSubmit}>Create</button>
        </div>
    );
}