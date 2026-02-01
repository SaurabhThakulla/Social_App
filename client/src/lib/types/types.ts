export type User = {
    id: string;
    username: string;
    avatar?: string;
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
};
export type Story = {
    id: string;
    userId: string;
    expiresAt: string;
};
export type Suggestion = {
    id: string;
    username: string;
};
export type Tag = {
    id: string;
    label: string;
};
