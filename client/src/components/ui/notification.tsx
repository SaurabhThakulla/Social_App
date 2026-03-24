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
    updateNotificationReadStatus,
} from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function NotificationIcon() {
    const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
    const userId = useAuthUserId();
    const { data: noti, isLoading } = useNoti(userId ?? undefined, filter);
    const { data: unreadNoti } = useNoti(userId ?? undefined, "unread");
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const unreadCount = unreadNoti?.length ?? 0;

    const acceptMutation = useMutation({
        mutationFn: (requesterId: string) => {
            if (!userId) throw new Error("User not authenticated");
            return acceptSyncRequest(userId, requesterId);
        },
        onSuccess: (_data, requesterId) => {
            queryClient.invalidateQueries({ queryKey: ["noti", userId ?? null] });
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
            queryClient.invalidateQueries({ queryKey: ["noti", userId ?? null] });
            queryClient.invalidateQueries({
                queryKey: ["sync-requests", userId, "incoming", "pending"],
            });
        },
    });

    const toggleReadMutation = useMutation({
        mutationFn: (variables: { id: string; isRead: boolean }) => {
            if (!userId) throw new Error("User not authenticated");
            return updateNotificationReadStatus(
                variables.id,
                userId,
                variables.isRead
            );
        },
        onSuccess: (_data, variables) => {
            // Refresh cached notifications for this user without touching other data
            queryClient.invalidateQueries({ queryKey: ["noti", userId ?? null] });
            // Optimistically adjust the currently visible list for snappier UI
            queryClient.setQueryData(["noti", userId ?? null, filter], (current: typeof noti) =>
                current?.map((item) =>
                    item.id === variables.id
                        ? { ...item, isRead: variables.isRead }
                        : item
                )
            );
        },
    });

    return (
        <div className="relative cursor-pointer">
            {/* Bell */}
            <div onClick={() => setOpen(!open)}>
                <Bell size={19} className="text-light-1" />
            </div>

            {/* Unread Badge */}
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-dark-1 w-5 h-5 rounded-full flex-center text-[11px] font-semibold">
                    {unreadCount > 9 ? "9+" : unreadCount}
                </span>
            )}

            {/* Dropdown */}
            {open && (
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
                        <Button
                            onClick={() => setFilter("read")}
                            className={`${filter === "read" ? "bg-primary-600" : "bg-light-2"} text-black ml-3`}
                        >
                            Read
                        </Button>
                   </div>
                    <div>
                        <div className="flex flex-col custom-scrollbar max-h-72 overflow-y-auto">
                            {noti?.map((e) => {
                                const { id, user, type, isRead, createdAt } = e;
                                const timeAgo = formatDistanceToNow(new Date(createdAt), {
                                    addSuffix: true,
                                });
                                const message =
                                    type === "sync_request" ? "sent you a sync request" :
                                        type === "sync_accepted" ? "accepted your sync request" :
                                            type === "sync_declined" ? "declined your sync request" :
                                                type === "follow" ? "synced with you" :
                                                    type === "like_post" ? "liked your post" :
                                                        type === "comment" ? "commented on your post" :
                                                            type === "reply" ? "replied to your comment" :
                                                                type === "tag" ? "tagged you in a post" :
                                                                    type === "message" ? "sent you a message" :
                                                                        "You have a new notification";

                                return (
                                    <div
                                        key={id}
                                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer border border-dark-4 ${!isRead ? "bg-dark-3" : "bg-dark-2"} hover:bg-dark-3 transition`}
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
                                                {message}
                                            </p>
                                            <p className="tiny-medium text-light-4 mt-1">
                                                {timeAgo}
                                            </p>
                                            <div className="mt-2 flex items-center gap-2">
                                                {!isRead && (
                                                    <span className="px-2 py-[3px] rounded-full bg-primary-500 text-dark-1 text-[11px] font-semibold">
                                                        Unread
                                                    </span>
                                                )}
                                                {isRead && (
                                                    <span className="px-2 py-[3px] rounded-full bg-dark-4 text-light-3 text-[11px]">
                                                        Read
                                                    </span>
                                                )}
                                            </div>
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

                                        <div className="flex items-center gap-2">
                                            <Button
                                                className="border border-dark-4 bg-dark-1 px-3 py-1 text-xs"
                                                disabled={toggleReadMutation.isPending}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    toggleReadMutation.mutate({
                                                        id,
                                                        isRead: !isRead,
                                                    });
                                                }}
                                            >
                                                {isRead ? "Mark Unread" : "Mark Read"}
                                            </Button>
                                        </div>
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

