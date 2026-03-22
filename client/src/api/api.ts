const BASE_URL = "http://localhost:5000/api";


// ================= POSTS (FEED) =================

export const getPosts = async function (
    limit = 10,
    offset = 0,
    userId?: string
) {
    const params = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
    });

    if (userId) {
        params.set("userId", userId);
    }

    const res = await fetch(`${BASE_URL}/posts?${params.toString()}`);

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

// ================= DELETE POST =================

export const deletePost = async function (postId: string, userId: string) {
    const res = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    });

    if (!res.ok) throw new Error("Failed to delete post");

    return res.json();
};


// ================= USERS =================

export const getUsers = async function () {
    const res = await fetch(`${BASE_URL}/users`);

    if (!res.ok) throw new Error("Failed to fetch users");

    return res.json();
};

// ================= PROFILE =================

export const getProfile = async function (userId: string) {
    const res = await fetch(`${BASE_URL}/users/${userId}`);

    if (!res.ok) {
        const message = await res.text();
        throw new Error(
            message || `Failed to fetch profile (${res.status})`
        );
    }

    return res.json();
};

export const updateProfile = async function (
    userId: string,
    payload: {
        name?: string;
        username?: string;
        bio?: string | null;
        avatar?: string | null;
    }
) {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to update profile");

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

export const getNoti = async function (userId?: string) {
    const params = new URLSearchParams();
    if (userId) {
        params.set("userId", userId);
    }

    const query = params.toString();
    const res = await fetch(
        `${BASE_URL}/notifications${query ? `?${query}` : ""}`
    );

    if (!res.ok) throw new Error("Failed to fetch notifications");

    return res.json();
};

// ================= SYNC USER =================

export const syncUser = async function (
    targetUserId: string,
    userId: string
) {
    const res = await fetch(`${BASE_URL}/users/${targetUserId}/sync`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    });

    if (!res.ok) throw new Error("Failed to sync user");

    return res.json();
};

// ================= SYNC REQUESTS =================

export const getSyncRequests = async function (
    userId: string,
    direction: "outgoing" | "incoming" = "outgoing",
    status: "pending" | "accepted" | "declined" | "all" = "pending"
) {
    const params = new URLSearchParams({
        userId,
        direction,
        status,
    });
    const res = await fetch(
        `${BASE_URL}/users/${userId}/sync-requests?${params.toString()}`
    );

    if (!res.ok) throw new Error("Failed to fetch sync requests");

    return res.json();
};

export const acceptSyncRequest = async function (
    userId: string,
    requesterId: string
) {
    const res = await fetch(
        `${BASE_URL}/users/${userId}/sync-requests/${requesterId}/accept`,
        { method: "POST" }
    );

    if (!res.ok) throw new Error("Failed to accept sync request");

    return res.json();
};

export const declineSyncRequest = async function (
    userId: string,
    requesterId: string
) {
    const res = await fetch(
        `${BASE_URL}/users/${userId}/sync-requests/${requesterId}/decline`,
        { method: "POST" }
    );

    if (!res.ok) throw new Error("Failed to decline sync request");

    return res.json();
};

export const cancelSyncRequest = async function (
    requesterId: string,
    targetUserId: string
) {
    const res = await fetch(
        `${BASE_URL}/users/${requesterId}/sync-requests/${targetUserId}`,
        { method: "DELETE" }
    );

    if (!res.ok) throw new Error("Failed to cancel sync request");

    return res.json();
};
// ================= USER SYNCS =================

export const getUserSyncs = async function (
    userId: string,
    limit = 20,
    offset = 0
) {
    const params = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
    });
    const res = await fetch(
        `${BASE_URL}/users/${userId}/syncs?${params.toString()}`
    );

    if (!res.ok) throw new Error("Failed to fetch syncs");

    return res.json();
};

export const unsyncUser = async function (
    userId: string,
    targetUserId: string
) {
    const res = await fetch(
        `${BASE_URL}/users/${userId}/syncs/${targetUserId}`,
        { method: "DELETE" }
    );

    if (!res.ok) throw new Error("Failed to unsync user");

    return res.json();
};

