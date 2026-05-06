import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
            .then(data => {
                const sorted = [...data].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setPosts(sorted);
            })
            .catch(console.error);
    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.header}>My Blog</h1>

                {posts.map(post => (
                    <div key={post.id} style={styles.card}>
                        <div style={styles.meta}>
                            #{post.id} • {new Date(post.createdAt).toLocaleString()}
                        </div>

                        <h2 style={styles.title}>{post.title}</h2>
                        <p style={styles.content}>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    page: {
        background: "#eef1f5",
        minHeight: "100vh",
        padding: "30px 0",
        fontFamily: "Arial, sans-serif"
    },

    container: {
        maxWidth: "650px",
        margin: "0 auto"
    },

    header: {
        textAlign: "center",
        marginBottom: "25px",
        fontSize: "30px",
        fontWeight: "700",
        color: "#111827"
    },

    card: {
        background: "#ffffff",
        padding: "18px",
        borderRadius: "14px",
        marginBottom: "14px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb"
    },

    meta: {
        fontSize: "12px",
        color: "#6b7280",
        marginBottom: "8px"
    },

    title: {
        margin: "0 0 10px 0",
        fontSize: "20px",
        fontWeight: "700",
        color: "#111827"   // 👈 ВАЖНО: теперь НЕ серый
    },

    content: {
        margin: 0,
        fontSize: "15px",
        lineHeight: "1.6",
        color: "#374151"
    }
};