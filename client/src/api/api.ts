const BASE_URL = "http://localhost:3000";

// Users
export const getUsers = async () => {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
};

// Posts
export const getPosts = async () => {
    const res = await fetch(`${BASE_URL}/posts`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
};

// Stories
export const getStories = async () => {
    const res = await fetch(`${BASE_URL}/stories`);
    if (!res.ok) throw new Error("Failed to fetch stories");
    return res.json();
};

// Tags
export const getTags = async () => {
    const res = await fetch(`${BASE_URL}/tags`);
    if (!res.ok) throw new Error("Failed to fetch tags");
    return res.json();
};

//Notifications
export const getnoti = async () => {
    const res = await fetch(`${BASE_URL}/notification`);
    if (!res.ok) throw new Error("Failed to fetch Notification");
    return res.json();
}


// npx json-server --watch src/api/data.json --port 3000