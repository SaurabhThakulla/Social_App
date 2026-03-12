import { useQuery } from "@tanstack/react-query";
import {
    getNoti,
    getPosts,
    getStories,
    getUsers,
} from "@/api/api";

import { shuffleArray } from "@/lib/hooks/shuffle";
import type { Noti, Post, Story, User } from "@/lib/types/types";


// ================= POSTS =================

export const usePosts = (limit = 10, offset = 0) => {
    return useQuery<Post[]>({
        queryKey: ['posts', limit, offset],
        queryFn: () => getPosts(limit, offset),
        select: (data) => shuffleArray(data)
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