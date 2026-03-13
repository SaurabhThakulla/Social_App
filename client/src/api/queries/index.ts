import { useQuery } from "@tanstack/react-query";
import {
    getNoti,
    getProfile,
    getPosts,
    getStories,
    getUsers,
} from "@/api/api";

import { shuffleArray } from "@/lib/hooks/shuffle";
import type { Noti, Post, Profile, Story, User } from "@/lib/types/types";


// ================= POSTS =================

export const usePosts = (
    limit = 10,
    offset = 0,
    userId?: string
) => {
    return useQuery<Post[]>({
        queryKey: ["posts", limit, offset, userId ?? null],
        queryFn: async () => {
            const data = await getPosts(limit, offset, userId);
            return shuffleArray(data); // shuffle only when fetching
        },
    });
};

// ================= STORIES =================

export const useStories = () => {
    return useQuery<Story[]>({
        queryKey: ['stories'],
        queryFn: getStories,
        select: (data) => shuffleArray(data)
    });
};


// ================= USERS =================

export const useUsers = () => {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: getUsers,
        select: (data) => shuffleArray(data)
    });
};


// ================= NOTIFICATIONS =================

export const useNoti = () => {
    return useQuery<Noti[]>({
        queryKey: ['noti'],
        queryFn: getNoti
    });
};

// ================= PROFILE =================

export const useProfile = (userId: string) => {
    return useQuery<Profile>({
        queryKey: ["profile", userId],
        queryFn: () => getProfile(userId),
        enabled: Boolean(userId),
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
