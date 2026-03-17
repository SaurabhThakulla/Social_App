import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "./button";
import { useNoti } from "@/api/queries/index";
import { NotificationSkeleton } from "../skeltons/notification";
import { formatDistanceToNow } from "date-fns";
import { useAuthUserId } from "@/hooks/useAuthUserId";
import {
    acceptSyncRequest,
    declineSyncRequest,
} from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function NotificationIcon() {
    const [filter, setFilter] = useState<"all" | "unread">("all");
    const userId = useAuthUserId();
    const { data: noti, isLoading } = useNoti(userId ?? undefined);
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const filteredNoti =
        filter === "unread"
            ? noti?.filter((n) => !n.isRead)
            : noti;

    const acceptMutation = useMutation({
        mutationFn: (requesterId: string) => {
            if (!userId) throw new Error("User not authenticated");
            return acceptSyncRequest(userId, requesterId);
        },
        onSuccess: (_data, requesterId) => {
            queryClient.invalidateQueries({ queryKey: ["noti", userId] });
            queryClient.invalidateQueries({ queryKey: ["profile", userId] });
            queryClient.invalidateQueries({
                queryKey: ["profile", requesterId],
            });
            queryClient.invalidateQueries({
                queryKey: ["sync-requests", userId, "incoming", "pending"],
            });
        },
    });

    const declineMutation = useMutation({
        mutationFn: (requesterId: string) => {
            if (!userId) throw new Error("User not authenticated");
            return declineSyncRequest(userId, requesterId);
        },
        onSuccess: (_data, requesterId) => {
            queryClient.invalidateQueries({ queryKey: ["noti", userId] });
            queryClient.invalidateQueries({
                queryKey: ["sync-requests", userId, "incoming", "pending"],
            });
        },
    });

    return (
        <div className="relative cursor-pointer">
            {/* Bell */}
            <div onClick={() => setOpen(!open)}>
                <Bell size={19} className="text-light-1" />
            </div>

            {/* Red Dot */}
            {noti && (
                <span className="absolute -top-1 -right-1 
                         bg-primary-500 
                         w-2 h-2 rounded-full" />
            )}

            {/* Dropdown */}
            {open &&(    
                         
                <div className="absolute right-0 mt-3 w-[30rem] bg-dark-2 border border-dark-4 rounded-3xl shadow-lg p-6 z-50 overflow-y-scroll custom-scrollbar">
                    {isLoading ? (
                           <NotificationSkeleton />
                    ) : (
                            <>
                    <div>
                        <p className="small-semibold mb-[0.25rem]">Notifications</p>
                        <Button
                            onClick={() => setFilter("all")}
                            className={`${filter === "all" ? "bg-primary-600" : "bg-light-2"} text-black mr-3`}
                        >
                            All
                        </Button>
                        <Button
                            onClick={() => setFilter("unread")}
                            className={`${filter === "unread" ? "bg-primary-600" : "bg-light-2"} text-black`}
                        >
                            Unread
                        </Button>
                   </div>
                    <div>
                        <div className="flex flex-col custom-scrollbar max-h-72 overflow-y-auto">
                            {filteredNoti?.map((e) => {
                                const { id, user, type, isRead, createdAt } = e;
                                const timeAgo = formatDistanceToNow(new Date(createdAt), {
                                    addSuffix: true,
                                });
                                return (
                                    <div
                                        key={id}
                                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${!isRead ? "bg-dark-3" : "hover:bg-dark-3"}`}
                                    >
                                        {/* Avatar */}
                                        <div className="w-9 h-9 rounded-full bg-primary-500 flex-center small-semibold text-white">
                                            {user.name[0]}
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1">
                                            <p className="small-regular text-light-1">
                                                <span className="small-semibold">
                                                    {user.name}
                                                </span>{" "}
                                                {
                                                    type === "sync_request" ? "sent you a sync request" :
                                                        type === "sync_accepted" ? "accepted your sync request" :
                                                            type === "sync_declined" ? "declined your sync request" :
                                                                type === "follow" ? "synced with you" :
                                                                type === "like_post" ? "liked your post" :
                                                                    type === "comment" ? "commented on your post" :
                                                                        type === "reply" ? "replied to your comment" :
                                                                            type === "tag" ? "tagged you in a post" :
                                                                                type === "message" ? "sent you a message" :
                                                                                    "You have a new notification"
                                                }
                                            </p>
                                            <p className="tiny-medium text-light-4 mt-1">
                                                {timeAgo}
                                            </p>
                                        </div>
                                        {type === "sync_request" && userId && !isRead && (
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    className="shad-button_primary px-3 py-1 text-xs"
                                                    disabled={acceptMutation.isPending}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        acceptMutation.mutate(user.id);
                                                    }}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    className="border border-dark-4 bg-dark-3 px-3 py-1 text-xs"
                                                    disabled={declineMutation.isPending}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        declineMutation.mutate(user.id);
                                                    }}
                                                >
                                                    Decline
                                                </Button>
                                            </div>
                                        )}

                                        {/* Unread Dot */}
                                        {!isRead && (
                                            <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                                </div>
                            </>
                    )}
                </div>
            )}
        </div>
    );
}

export default NotificationIcon;

