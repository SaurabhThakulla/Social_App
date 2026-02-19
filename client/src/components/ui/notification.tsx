import { useState } from "react";
import { Bell } from "lucide-react";

function NotificationIcon() {
    const [open, setOpen] = useState(false);
    const noti = true; // example unread state

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
            {open && (
                <div className="absolute right-30 mt-3 w-64 
                        bg-dark-2 border border-dark-4 
                        rounded-md shadow-lg p-6 z-50">

                    <p className="small-semibold mb-3">Notifications</p>

                    <div className="flex flex-col gap-3 small-regular text-light-3">
                        <p>Someone liked your post</p>
                        <p>New comment on your photo</p>
                        <p> New follower</p>
                    </div>

                </div>
            )}
        </div>
    );
}

export default NotificationIcon;
