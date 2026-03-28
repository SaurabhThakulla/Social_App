import { useMemo } from "react";

type WithTag = { tag?: string };

export function usePreferredFeed<T extends WithTag>(
    posts: T[] = [],
    activeTag?: string
) {
    return useMemo(() => {
        if (!activeTag) return posts;

        const preferred = posts.filter((p) => p.tag === activeTag);
        const others = posts.filter((p) => p.tag !== activeTag);

        return [...preferred, ...others];
    }, [posts, activeTag]);
}
