const BASE_URL = "http://localhost:5000/api";


// ================= POSTS (FEED) =================

export const getPosts = async function (limit = 10, offset = 0) {
    const res = await fetch(`${BASE_URL}/posts?limit=${limit}&offset=${offset}`);

    if (!res.ok) throw new Error("Failed to fetch posts");

    return res.json();
};


// ================= CREATE POST =================

export const createPost = async function (userId: string, content: string) {
    const res = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, content }),
    });

    if (!res.ok) throw new Error("Failed to create post");

    return res.json();
};


// ================= LIKE POST =================

export const likePost = async function (postId: string, userId: string) {
    const res = await fetch(`${BASE_URL}/posts/${postId}/like`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    });

    if (!res.ok) throw new Error("Failed to like post");

    return res.json();
};


// ================= UNLIKE POST =================

export const unlikePost = async function (postId: string, userId: string) {
    const res = await fetch(`${BASE_URL}/posts/${postId}/like`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    });

    if (!res.ok) throw new Error("Failed to unlike post");

    return res.json();
};


// ================= ADD COMMENT =================

export const addComment = async function (
    postId: string,
    userId: string,
    comment: string
) {
    const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, comment }),
    });

    if (!res.ok) throw new Error("Failed to add comment");

    return res.json();
};


// ================= GET COMMENTS =================

export const getComments = async function (postId: string) {
    const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);

    if (!res.ok) throw new Error("Failed to fetch comments");

    return res.json();
};


// ================= ADD MEDIA =================

export const addPostMedia = async function (
    postId: string,
    mediaUrl: string,
    mediaType: string
) {
    const res = await fetch(`${BASE_URL}/posts/${postId}/media`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ mediaUrl, mediaType }),
    });

    if (!res.ok) throw new Error("Failed to upload media");

    return res.json();
};


// ================= USERS =================

export const getUsers = async function () {
    const res = await fetch(`${BASE_URL}/users`);

    if (!res.ok) throw new Error("Failed to fetch users");

    return res.json();
};


// ================= STORIES (future) =================

export const getStories = async function () {
    const res = await fetch(`${BASE_URL}/stories`);

    if (!res.ok) throw new Error("Failed to fetch stories");

    return res.json();
};


// ================= TAGS (future) =================

export const getTags = async function () {
    const res = await fetch(`${BASE_URL}/tags`);

    if (!res.ok) throw new Error("Failed to fetch tags");

    return res.json();
};


// ================= NOTIFICATIONS =================

export const getNoti = async function () {
    const res = await fetch(`${BASE_URL}/notifications`);

    if (!res.ok) throw new Error("Failed to fetch notifications");

    return res.json();
};