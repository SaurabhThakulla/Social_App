import { getSyncRequests, getUserSyncs, syncUser } from "@/api/api";
import { useStories, useUsers } from "@/api/queries";
import { Storiessk } from "@/components/skeltons/stories";
import { SuggestionsSkeleton } from "@/components/skeltons/suggestions";
import Advertisement from "@/components/ui/advertisment";
import { Button } from "@/components/ui/button";
import { useAuthUserId } from "@/hooks/useAuthUserId";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { User } from "@/lib/types/types";

type SyncRequest = {
    id: string;
    requester_id: string;
    target_id: string;
    status: string;
    created_at: string;
};

const Stories = () => {
    const authUserId = useAuthUserId();
    const { data: stories, isLoading: storiesLoading } = useStories();
    const { data: users, isLoading: suggestionLoading } = useUsers();
    const { data: syncs } = useQuery<User[]>({
        queryKey: ["user-syncs", authUserId, "suggestions"],
        queryFn: () => getUserSyncs(authUserId ?? "", 200, 0),
        enabled: Boolean(authUserId),
    });
    const { data: outgoingRequests } = useQuery<SyncRequest[]>({
        queryKey: ["sync-requests", authUserId, "outgoing", "pending"],
        queryFn: () => getSyncRequests(authUserId ?? "", "outgoing", "pending"),
        enabled: Boolean(authUserId),
    });
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleOpenProfile = (userId: string) => {
        if (!userId) return;
        navigate(`/profile/${userId}`);
    };

    const syncMutation = useMutation({
        mutationFn: async (targetUserId: string) => {
            if (!authUserId) {
                throw new Error("User not authenticated");
            }
            return syncUser(targetUserId, authUserId);
        },
        onSuccess: (_data, targetUserId) => {
            queryClient.invalidateQueries({
                queryKey: ["profile", targetUserId],
            });
            if (authUserId) {
                queryClient.invalidateQueries({
                    queryKey: ["profile", authUserId],
                });
                queryClient.invalidateQueries({
                    queryKey: ["user-syncs", authUserId, "suggestions"],
                });
                queryClient.invalidateQueries({
                    queryKey: ["sync-requests", authUserId, "outgoing", "pending"],
                });
            }
        },
    });

    const syncedIds = new Set((syncs ?? []).map((user) => user.id));
    const pendingIds = new Set(
        (outgoingRequests ?? []).map((request) => request.target_id)
    );

    const suggestionUsers = (users ?? []).filter(
        (user) => user.id !== authUserId && !syncedIds.has(user.id)
    );

    return (
        <aside className="home-creators">
            {/* Stories */}
            {storiesLoading ? (
                <Storiessk />
            ) : (
                <>
                    <h3 className="small-semibold">Stories</h3>

                    <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-3">
                        <button
                            type="button"
                            onClick={() =>
                                window.alert("Add Story will be available soon")
                            }
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="h-14 w-14 rounded-xl bg-dark-4 border border-dark-3 flex-center text-sm font-bold text-light-2">
                                +
                            </div>
                            <p className="tiny-medium text-light-4">Add Story</p>
                        </button>
                        {stories?.map(function (e) {
                            return (
                                <div
                                    key={e.id}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div className="h-14 w-14 rounded-xl bg-primary-500 flex-center text-sm font-bold">
                                        {e.userId[0]}
                                    </div>
                                    <p className="tiny-medium text-light-4">
                                        {e.userId}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* SUGGESTIONS */}
            {suggestionLoading ? (
                <SuggestionsSkeleton />
            ) : (
                <>
                    <h3 className="small-semibold">Suggestions</h3>
                    <div className="flex flex-col gap-4">
                        {suggestionUsers.slice(0, 3).map(function (e) {
                            return (
                                <div
                                    key={e.id}
                                    className="flex-between cursor-pointer"
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => handleOpenProfile(e.id)}
                                    onKeyDown={(event) =>
                                        event.key === "Enter"
                                            ? handleOpenProfile(e.id)
                                            : undefined
                                    }
                                >
                                    <div className="flex-start gap-3">
                                        <img
                                            src={e.avatar}
                                            alt="userlogo"
                                            className="h-14 w-14 rounded-full bg-dark-4 flex-center text-xs"
                                        />
                                        <p>{e.username}</p>
                                    </div>
                                    <div
                                        onClick={(event) => event.stopPropagation()}
                                        onMouseDown={(event) => event.stopPropagation()}
                                    >
                                        <Button
                                            type="button"
                                            className="shad-button_primary px-6 rounded-full"
                                            disabled={
                                                syncMutation.isPending ||
                                                pendingIds.has(e.id)
                                            }
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                event.preventDefault();
                                                if (pendingIds.has(e.id)) {
                                                    return;
                                                }
                                                if (!authUserId) {
                                                    window.alert("Please login to sync");
                                                    return;
                                                }
                                                syncMutation.mutate(e.id);
                                            }}
                                        >
                                            {pendingIds.has(e.id)
                                                ? "Waiting"
                                                : syncMutation.isPending
                                                  ? "Syncing..."
                                                  : "Sync"}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* See More Button */}
                    {suggestionUsers.length > 3 && (
                        <Button
                            variant="ghost"
                            className="w-full text-sm text-primary-500"
                            onClick={() => {
                                alert(
                                    "This button functionality will be added soon"
                                );
                            }}
                        >
                            See More
                        </Button>
                    )}
                </>
            )}

            {/* Advertisement */}
            <Advertisement />
        </aside>
    );
};

export default Stories;





