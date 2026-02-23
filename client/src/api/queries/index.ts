import { useQuery } from "@tanstack/react-query";
import {
    getnoti,
    getPosts,
    getStories,
    getUsers,
} from "@/api/api";
import { shuffleArray } from "@/lib/hooks/shuffle";
import type { Noti, Post, Story, User } from "@/lib/types/types";

export const usePosts = () => {
    return useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: getPosts,
         select: (data) => shuffleArray(data)
    })
}

export const useStories = () => {
    return useQuery<Story[]>({
        queryKey: ['stories'],
        queryFn: getStories,
        select:(data)=> shuffleArray(data)
    })
}

export const useUsers = () => {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: getUsers,
        select: (data) => shuffleArray(data)
    })
}

export const useNoti = () => {
    return useQuery<Noti[]>({
        queryKey: ['noti'],
        queryFn: getnoti,
    })
}
