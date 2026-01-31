import { useQuery } from "@tanstack/react-query";
import {
    getPosts,
    getStories,
    getSuggestions,
    getTags,
    getUsers
} from "@/api/api";
import { shuffleArray } from "@/lib/shuffle";

export const usePosts = () => {
     return useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        select: (data) => shuffleArray(data)
        
    })
}

export const useStories = () => {
    return useQuery({
        queryKey: ['stories'],
        queryFn: getStories,
        select:(data)=> shuffleArray(data)
    })
}

export const useSuggestions = () => {
    return useQuery({
        queryKey:['suggestions'],
        queryFn: getSuggestions,
        select:(data)=>shuffleArray(data)
    })
}

export const useTags = ()=> {
    return useQuery({
        queryKey: ['tags'],
        queryFn: getTags,
        select:(data)=>shuffleArray(data)
    })
}

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        select: (data) => shuffleArray(data)
    })
}
