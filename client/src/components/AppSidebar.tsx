import { useState } from "react";

const Sidebar = () => {
    const user = {
        name: "Aura User",
        avatar: null,
    };
    const [open, setOpen] = useState(true);

    const initials = user?.name
        ?.split(" ")
        .map(n => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <aside
            className={`bg-dark-2 h-screen transition-all duration-300
      ${open ? "w-64" : "w-16"} flex flex-col`}
        >
            {/* Profile / Hamburger */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-center h-16 border-b border-dark-4"
            >
                {user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt="profile"
                        className="h-10 w-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center font-bold">
                        {initials}
                    </div>
                )}
            </button>

            {/* Navigation */}
            <nav className="flex flex-col gap-2 mt-4 px-2">
                <SidebarItem label="Feed" open={open} />
                <SidebarItem label="Explore" open={open} />
                <SidebarItem label="Profile" open={open} />
                <SidebarItem label="Settings" open={open} />
            </nav>
        </aside>
    );
};

const SidebarItem = ({ label, open }) => (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-dark-4 cursor-pointer">
        <span className="h-2 w-2 bg-light-1 rounded-full" />
        {open && <span className="text-sm">{label}</span>}
    </div>
);

export default Sidebar;
