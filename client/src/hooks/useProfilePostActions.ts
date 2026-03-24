import { useLikePost } from "@/hooks/useLikePost";
import { useDeletePost } from "@/hooks/useDeletePost";
import { useState } from "react";

export function useProfilePostActions(userId: string | null) {
    const postsKey = ["posts", 50, 0, userId ?? null];

    const likeMutation = useLikePost(postsKey, userId ?? "");

    const deleteMutation = useDeletePost({
        userId
    });

    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

    return {
        likeMutation,
        deleteMutation,
        pendingDeleteId,
        setPendingDeleteId
    };
}