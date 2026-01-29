import {
    Home,
    Mail,
    MessageCircle,
    Users,
    Image,
    Settings,
} from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">

            {/* Top Section */}
            <div>
                {/* Profile */}
                <div className="flex items-center gap-3 mb-8">
                    <img
                        src="https://i.pravatar.cc/100"
                        className="w-12 h-12 rounded-full object-cover"
                        alt="profile"
                    />
                    <div>
                        <h3 className="font-semibold">Bogdan Nikitin</h3>
                        <p className="text-sm text-gray-500">@nikitenam</p>
                    </div>
                </div>

                {/* Menu */}
                <nav className="space-y-2">

                    <MenuItem icon={<Home size={18} />} label="News Feed" active badge={undefined} />

                    <MenuItem
                        icon={<Mail size={18} />}
                        label="Messages"
                        badge="6" active={undefined}/>

                    <MenuItem
                        icon={<MessageCircle size={18} />}
                        label="Forums" badge={undefined} active={undefined}/>

                    <MenuItem
                        icon={<Users size={18} />}
                        label="Friends"
                        badge="8" active={undefined}/>

                    <MenuItem
                        icon={<Image size={18} />}
                        label="Media" badge={undefined} active={undefined}/>

                    <MenuItem
                        icon={<Settings size={18} />}
                        label="Settings" badge={undefined} active={undefined}/>

                </nav>
            </div>

            {/* Bottom Card */}
            <div className="border-2 border-dashed rounded-xl p-4 text-center">
                <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl"></div>
                </div>
                <p className="text-sm font-medium">Download the App</p>
            </div>

        </aside>
    );
}


function MenuItem({ icon, label, badge, active }) {
    return (
        <div
            className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition
        ${active
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
        >
            <div className="flex items-center gap-3">
                {icon}
                <span className="text-sm">{label}</span>
            </div>

            {badge && (
                <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">
                    {badge}
                </span>
            )}
        </div>
    );
}
