import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "./button";
import { useNoti } from "@/api/queries/index";
import { NotificationSkeleton } from "../skeltons/notification";

function NotificationIcon() {
    const [filter, setFilter] = useState<"all" | "unread">("all");
    const { data: noti, isLoading } = useNoti();
    const [open, setOpen] = useState(false);
    const filteredNoti =
        filter === "unread"
            ? noti?.filter((n) => !n.isRead)
            : noti;

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
                         
                <div className="absolute right-30 mt-3 w-[30rem] bg-dark-2 border border-dark-4 rounded-md shadow-lg p-6 z-50 overflow-y-scroll custom-scrollbar">
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
                                const { id, user, type, isRead } = e;
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
                                                    type === "follow" ? "started following you" :
                                                        type === "like_post" ? "liked your post" :
                                                            type === "comment" ? "commented on your post" :
                                                                type === "reply" ? "replied to your comment" :
                                                                    type === "tag" ? "tagged you in a post" :
                                                                        type === "message" ? "sent you a message" :
                                                                            "You have a new notification"
                                                }
                                            </p>
                                            <p className="tiny-medium text-light-4 mt-1">
                                                2h ago
                                            </p>
                                        </div>

                                        {/* Unread Dot */}
                                        {!isRead && (
                                            <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotificationIcon;

