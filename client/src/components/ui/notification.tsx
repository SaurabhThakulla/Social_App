import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "./button";

function NotificationIcon() {
    const [open, setOpen] = useState(false);
    const noti = true; 
    const [read, setRead ]= useState(true)
    const [unread, setUnread ]= useState(false)

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
                <div className="absolute right-30 mt-3 w-[30rem] bg-dark-2 border border-dark-4 rounded-md shadow-lg p-6 z-50">
                    <div className="mb-1">
                        <p className="small-semibold mb-1">Notifications</p>
                        <Button onClick={() => {
                            setUnread(false);
                            setRead(true);
                        }} className={`${read ? "bg-primary-600" : "bg-light-2"} text-black mr-3 mb-2`}>
                            All
                        </Button>
                        <Button onClick={() => {
                            setUnread(true);
                            setRead(false);
                        }} className={`${unread ? "bg-primary-600" : "bg-light-2"}  text-black`}>
                            unRead
                        </Button>
                   </div>
                    <div>
                        <div className="flex flex-col custom-scrollbar max-h-72 overflow-y-auto">
                            {/* Unread Notification */}
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-dark-3 cursor-pointer">
                                {/* Avatar */}
                                <div className="w-9 h-9 rounded-full bg-primary-500 flex-center small-semibold text-white">
                                    NM
                                </div>
                                {/* Text */}
                                <div className="flex-1">
                                    <p className="small-regular text-light-1">
                                        <span className="small-semibold text-light-1">neonmind</span> liked your post
                                    </p>
                                    <p className="tiny-medium text-light-4 mt-1">2h ago</p>
                                </div>
                                {/* Unread Dot */}
                                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                            </div>
                            {/* Read Notification */}
                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-3 transition cursor-pointer">
                                <div className="w-9 h-9 rounded-full bg-dark-4 flex-center small-semibold text-light-1">
                                    VE
                                </div>
                                <div className="flex-1">
                                    <p className="small-regular text-light-1">
                                        <span className="small-semibold text-light-1">voidecho</span> commented on your post
                                    </p>
                                    <p className="tiny-medium text-light-4 mt-1">5h ago</p>
                                </div>
                            </div>
                            {/* Follow Notification */}
                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-3 transition cursor-pointer">
                                <div className="w-9 h-9 rounded-full bg-dark-4 flex-center small-semibold text-light-1">
                                    LV
                                </div>
                                <div className="flex-1">
                                    <p className="small-regular text-light-1">
                                        <span className="small-semibold text-light-1">lunarvibes</span> started following you
                                    </p>
                                    <p className="tiny-medium text-light-4 mt-1">1 day ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotificationIcon;
