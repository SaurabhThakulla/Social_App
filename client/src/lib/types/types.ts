export type User = {
    id: string;
    username: string;
    avatar?: string;
};

export type Profile = {
    id: string;
    name: string;
    username: string;
    avatar?: string | null;
    bio?: string | null;
    created_at: string;
    posts_count: number;
    followers_count: number;
    following_count: number;
};
export type Post = {
    id: string;
    authorId: string;
    content: string;
    createdAt: string;
    image: string;
    metrics: {
        likes: number;
        comments: number;
        shares: number;
    };
    tag: string;
};
export type Story = {
    id: string;
    userId: string;
    expiresAt: string;
};

export type Noti = {
    id: string;
    user: {
        name: string;
        avatar: string;
    }
    type: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export type PostMedia = {
    url: string;
    type: string | null;
};

export type FeedPost = {
    id: string;
    user_id?: string;
    name?: string;
    username: string;
    avatar?: string | null;
    content: string;
    created_at: string;
    likes_count: number;
    comments_count: number;
    liked_by_user?: boolean;
    media?: PostMedia[];
};

export type PostComment = {
    id: string;
    comment: string;
    created_at: string;
    username: string;
    avatar?: string | null;
};
