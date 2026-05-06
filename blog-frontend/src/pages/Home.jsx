import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then(setPosts).catch(console.error);
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>Blog</h1>

            {posts.map(post => (
                <div key={post.id} style={styles.card}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}

const styles = {
    card: {
        background: "white",
        padding: 16,
        marginBottom: 12,
        borderRadius: 10
    }
};