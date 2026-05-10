import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { createPost } from "../api/postApi";
import { getFeedback } from "../api/feedbackApi";
import { getProfile, updateProfile } from "../api/profileApi";

export default function Admin() {
    const token = localStorage.getItem("token");
    const [feedbackList, setFeedbackList] = useState([]);
    const [profile, setProfile] = useState({
        fullName: "",
        university: "",
        bio: "",
        telegram: ""
    });
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

    const handleProfileSave = async () => {

        try {

            await updateProfile(profile);

            alert("Profile updated!");

        } catch (err) {

            console.error(err);

            alert("Failed to update profile");

        }

    };

    useEffect(() => {

        getFeedback()
            .then(data => setFeedbackList(data))
            .catch(console.error);

        getProfile()
            .then(data => {

                if (data) {
                    setProfile(data);
                }

            })
            .catch(console.error);

    }, []);

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
                <div style={styles.card}>

                    <h2 style={styles.sectionTitle}>
                        Edit profile
                    </h2>

                    <input
                        value={profile.fullName}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                fullName: e.target.value
                            })
                        }
                        placeholder="Full name"
                        style={styles.input}
                    />

                    <input
                        value={profile.university}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                university: e.target.value
                            })
                        }
                        placeholder="University"
                        style={styles.input}
                    />

                    <textarea
                        value={profile.bio}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                bio: e.target.value
                            })
                        }
                        placeholder="Bio"
                        style={styles.textarea}
                    />

                    <input
                        value={profile.telegram}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                telegram: e.target.value
                            })
                        }
                        placeholder="Telegram"
                        style={styles.input}
                    />

                    <button
                        onClick={handleProfileSave}
                        style={styles.button}
                    >
                        Save profile
                    </button>

                </div>

                <div style={styles.card}>
                    <h2>Feedback</h2>

                    {feedbackList.length === 0 && (
                        <p>No feedback yet</p>
                    )}

                    {feedbackList.map((item, index) => (
                        <div key={index} style={{
                            padding: "10px",
                            borderBottom: "1px solid #e5e7eb"
                        }}>
                            <div style={{ fontWeight: "600" }}>
                                {item.name} ({item.email})
                            </div>
                            <div style={{ fontSize: "14px", marginTop: "4px" }}>
                                {item.message}
                            </div>
                        </div>
                    ))}
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
    },
    sectionTitle: {
        marginBottom: "16px",
        color: "#111827"
    },
};