import { Link, useNavigate } from "react-router-dom";

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


    const navigate = useNavigate();
    
    return (
        <aside className="leftsidebar">
            {/* Profile */}
            <div className="flex items-center gap-3 mb-10 cursor-pointer"
                onClick={() => navigate("/profile")}>
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
                <Link to="/home">
                    <SidebarItem label="Home" />
                </Link>

                <Link to="/explore">
                    <SidebarItem label="Explore" />
                </Link>

                <Link to="/profile">
                    <SidebarItem label="Profile" />
                </Link>

                <Link to="/settings">
                    <SidebarItem label="Settings" />
                </Link>
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
