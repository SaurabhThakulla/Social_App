import { NavLink, useNavigate } from "react-router-dom";

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
        <aside className="hidden min-[1020px]:flex flex-col min-w-[14vw] bg-dark-2 p-6">

            {/* Profile */}
            <div
                className="flex items-center gap-3 mb-10 cursor-pointer"
                onClick={() => navigate("/profile")}
            >
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
                <SidebarItem to="/home" label="Home" />
                <SidebarItem to="/explore" label="Explore" />
                <SidebarItem to="/profile" label="Profile" />
                <SidebarItem to="/settings" label="Settings" />
            </nav>
        </aside>
    );
};

const SidebarItem = ({ to, label }: { to: string; label: string }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `px-4 py-3 rounded-lg transition ${isActive
                    ? "bg-primary-500 text-white"
                    : "hover:bg-dark-3 text-light-1"
                }`
            }
        >
            {label}
        </NavLink>
    );
};

export default Sidebar;
