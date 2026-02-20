function Settings() {
    return (
        <div className="min-h-screen bg-black text-white p-4">

            {/* Page Title */}
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            {/* Profile Section */}
            <div className="bg-zinc-900 rounded-xl p-4 mb-4">
                <h2 className="text-lg font-semibold mb-3">Profile</h2>

                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full bg-zinc-800 p-3 rounded-lg outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-zinc-800 p-3 rounded-lg outline-none"
                    />
                    <button className="w-full bg-blue-600 py-3 rounded-lg font-medium">
                        Update Profile
                    </button>
                </div>
            </div>

            {/* Account Section */}
            <div className="bg-zinc-900 rounded-xl p-4 mb-4">
                <h2 className="text-lg font-semibold mb-3">Account</h2>

                <div className="space-y-3">
                    <button className="w-full bg-zinc-800 p-3 rounded-lg text-left">
                        Change Password
                    </button>
                    <button className="w-full bg-zinc-800 p-3 rounded-lg text-left">
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Privacy Section */}
            <div className="bg-zinc-900 rounded-xl p-4 mb-4">
                <h2 className="text-lg font-semibold mb-3">Privacy</h2>

                <div className="flex justify-between items-center">
                    <span>Private Account</span>
               </div>
            </div>

            {/* Logout */}
            <button className="w-full bg-red-600 py-3 rounded-xl font-semibold">
                Logout
            </button>

        </div>
    );
}

export default Settings;
