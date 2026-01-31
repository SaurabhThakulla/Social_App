const BASE_URL = "http://localhost:3000";

// Users
export const getUsers = async () => {
    const res = await fetch(`${BASE_URL}/users?_sort=id&_order=desc`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
};

// Posts
export const getPosts = async () => {
    const res = await fetch(`${BASE_URL}/posts?_sort=id&_order=desc`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
};

// Stories
export const getStories = async () => {
    const res = await fetch(`${BASE_URL}/stories?_sort=id&_order=desc`);
    if (!res.ok) throw new Error("Failed to fetch stories");
    return res.json();
};

// Suggestions
export const getSuggestions = async () => {
    const res = await fetch(`${BASE_URL}/suggestions?_sort=id&_order=desc`);
    if (!res.ok) throw new Error("Failed to fetch suggestions");
    return res.json();
};

// Tags
export const getTags = async () => {
    const res = await fetch(`${BASE_URL}/tags?_sort=id&_order=desc`);
    if (!res.ok) throw new Error("Failed to fetch tags");
    return res.json();
};




// npx json-server --watch src/api/data.json --port 3000