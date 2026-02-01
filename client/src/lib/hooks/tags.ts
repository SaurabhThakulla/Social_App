import { useMemo } from "react";

export function usePreferredFeed(posts, activeTag) {
    return useMemo(function () {

        // if nothing selected, return normal feed
        if (!activeTag) return posts;

        const preferred = posts.filter((p) => p.tag === activeTag);
        const others = posts.filter((p) => p.tag !== activeTag);

        // preferred posts first
        return [...preferred, ...others];

    }, [posts, activeTag]);
}
