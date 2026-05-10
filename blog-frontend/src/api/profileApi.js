const BASE_URL = "http://localhost:8080/api";

export async function getProfile() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/profile`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
        }
    });

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
            "Accept": "application/json",
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(profile)
    });

    if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`);
    }

    return response.json();
}