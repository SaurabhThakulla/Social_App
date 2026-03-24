import { useState } from "react";
import { getUserSyncs, unsyncUser } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/lib/types/types";

export function useProfileSyncs(userId: string | null, viewedUserId: string) {
    const [syncsOpen, setSyncsOpen] = useState(false);
    const [syncs, setSyncs] = useState<User[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const pageSize = 10;
    const queryClient = useQueryClient();

    const loadSyncs = async () => {
        if (loading) return;

        setLoading(true);

        const data = await getUserSyncs(viewedUserId, pageSize, offset);

        setSyncs(prev => [...prev, ...data]);
        setOffset(offset + data.length);
        setHasMore(data.length === pageSize);

        setLoading(false);
    };

    const unsyncMutation = useMutation({
        mutationFn: (targetUserId: string) => unsyncUser(userId!, targetUserId),

        onSuccess: (_, targetUserId) => {
            setSyncs(prev => prev.filter(u => u.id !== targetUserId));

            queryClient.invalidateQueries({
                queryKey: ["profile", userId]
            });
        }
    });

    return {
        syncsOpen,
        setSyncsOpen,
        syncs,
        loadSyncs,
        loading,
        hasMore,
        unsyncMutation
    };
}