const BASE_URL = "http://localhost:8080/api";

export async function getPosts() {
    const res = await fetch(`${BASE_URL}/posts`);
    return res.json();
}

// export async function createPost(post) {
//     const res = await fetch(`${BASE_URL}/admin/posts`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Basic " + btoa("admin:password")
//         },
//         body: JSON.stringify(post)
//     });
//
//     return res.json();
// }
export async function createPost(post) {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8080/api/admin/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(post)
    });

    return res.json();
}
