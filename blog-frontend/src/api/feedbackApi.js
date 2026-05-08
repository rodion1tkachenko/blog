export async function sendFeedback(data) {

    const response = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Failed to send feedback");
    }
}

export async function getFeedback() {

    const response = await fetch("http://localhost:8080/api/feedback");

    if (!response.ok) {
        throw new Error("Failed to fetch feedback");
    }

    return response.json();
}