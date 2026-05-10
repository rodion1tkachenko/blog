import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api/postApi";
import { sendFeedback } from "../api/feedbackApi";
import { getProfile } from "../api/profileApi";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [profile, setProfile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await sendFeedback(form);

            alert("Message sent!");

            setForm({
                name: "",
                email: "",
                message: ""
            });

        } catch (err) {
            console.error(err);
            alert("Error sending message");
        }
    };
    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Delete this post?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deletePost(id);

            setPosts(posts.filter(post => post.id !== id));

        } catch (err) {

            console.error(err);
            alert("Failed to delete post");
        }
    };
    useEffect(() => {

        getPosts()
            .then(data => {

                const sorted = [...data].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setPosts(sorted);

            })
            .catch(console.error);

        getProfile()
            .then(data => setProfile(data))
            .catch(console.error);

    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.container}>

                <h1 style={styles.header}>My Blog</h1>

                {profile && (

                    <div style={styles.profileCard}>

                        <h2 style={styles.profileName}>
                            {profile.fullName || "Unknown author"}
                        </h2>

                        <div style={styles.profileUniversity}>
                            <strong>University:</strong> {profile.university}
                        </div>

                        <p style={styles.profileBio}>
                            <strong>About:</strong> {profile.bio}
                        </p>

                        <div style={styles.profileTelegram}>
                            <strong>Contact:</strong> {profile.telegram}
                        </div>

                    </div>
                )}

                {posts.map(post => (
                    <div key={post.id} style={styles.card}>

                        <div style={styles.meta}>
                            #{post.id} • {new Date(post.createdAt).toLocaleString()}
                        </div>

                        <h2 style={styles.title}>
                            {post.title}
                        </h2>

                        <p style={styles.content}>
                            {post.content}
                        </p>

                        {token && (
                            <button
                                onClick={() => handleDelete(post.id)}
                                style={styles.deleteButton}
                            >
                                Delete
                            </button>
                        )}

                    </div>
                ))}

                <div style={styles.feedbackCard}>

                   <h2 style={{ color: "#111827", fontWeight: "700" }}>
                       Поделись мнением с автором блога
                   </h2>

                    <form onSubmit={handleSubmit} style={styles.form}>

                        <input
                            type="text"
                            placeholder="Your name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({...form, name: e.target.value})
                            }
                            style={styles.input}
                        />

                        <input
                            type="email"
                            placeholder="Your email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({...form, email: e.target.value})
                            }
                            style={styles.input}
                        />

                        <textarea
                            placeholder="Your message"
                            value={form.message}
                            onChange={(e) =>
                                setForm({...form, message: e.target.value})
                            }
                            style={styles.textarea}
                        />

                        <button type="submit" style={styles.sendButton}>
                            Send
                        </button>

                    </form>

                </div>

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
    },
    feedbackCard: {
        background: "#ffffff",
        padding: "20px",
        borderRadius: "14px",
        marginTop: "30px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        fontSize: "14px"
    },

    textarea: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        minHeight: "120px",
        fontSize: "14px",
        resize: "vertical"
    },

    sendButton: {
        background: "#111827",
        color: "white",
        border: "none",
        padding: "12px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600"
    },
    deleteButton: {
        marginTop: "14px",
        background: "#ef4444",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600"
    },
    profileCard: {
        background: "#ffffff",
        padding: "24px",
        borderRadius: "16px",
        marginBottom: "20px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)"
    },

    profileName: {
        margin: 0,
        fontSize: "28px",
        color: "#111827"
    },

    profileUniversity: {
        marginTop: "8px",
        color: "#6b7280",
        fontWeight: "600"
    },

    profileBio: {
        marginTop: "16px",
        lineHeight: "1.7",
        color: "#374151"
    },

    profileTelegram: {
        marginTop: "14px",
        color: "#2563eb",
        fontWeight: "600"
    },
};

