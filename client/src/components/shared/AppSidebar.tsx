const Sidebar = () => {
    const user = {
        name: "Aura User",
        avatar: null,
    };

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();


    return (
        <aside className="leftsidebar">
            {/* Profile */}
            <div className="flex items-center gap-3 mb-10">
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt="profile"
                        className="h-12 w-12 rounded-full object-cover"
                    />
                ) : (
                    <div className="h-12 w-12 rounded-full bg-primary-500 flex-center font-bold">
                        {initials}
                    </div>
                )}

                <div>
                    <p className="base-semibold">{user.name}</p>
                    <p className="small-regular text-light-4">View profile</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
                <SidebarItem  label="Home" />
                <SidebarItem label="Explore" />
                <SidebarItem label="Profile" />
                <SidebarItem label="Settings" />
            </nav>
        </aside>
    );
};

const SidebarItem = ({ label }: { label: string }) => (
    <div className="leftsidebar-link px-4 py-3 cursor-pointer">
        {label}
    </div>
);

export default Sidebar;
