const BASE_URL = "http://localhost:8080/api";

export async function getProfile() {

    const response = await fetch(`${BASE_URL}/profile`);

    if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    return response.json();
}

export async function updateProfile(profile) {

    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/admin/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(profile)
    });

    if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`);
    }

    return response.json();
}