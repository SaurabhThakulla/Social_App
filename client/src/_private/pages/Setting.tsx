import { useState } from "react";

function Settings() {

    const [privateAccount, setPrivateAccount] = useState(false);
    const [hideLikes, setHideLikes] = useState(false);
    const [allowComments, setAllowComments] = useState(true);
    const [emailNotif, setEmailNotif] = useState(true);

    return (
        <div className="min-h-screen bg-black text-white px-4 py-6 w-[50vw]">
            <div className="md:max-w-2xl w-full mx-auto space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Settings
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">
                        Control your account, privacy and preferences.
                    </p>
                </div>

                {/* Account Section */}
                <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4">

                    <h2 className="text-lg font-semibold">
                        Account
                    </h2>

                    <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition p-3 rounded-xl text-left">
                        Change Password
                    </button>

                    <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition p-3 rounded-xl text-left">
                        Manage Devices
                    </button>
                </div>

                {/* Privacy Section */}
                <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-5">

                    <h2 className="text-lg font-semibold">
                        Privacy
                    </h2>

                    {/* Private Account */}
                    <Toggle
                        label="Private Account"
                        state={privateAccount}
                        setState={setPrivateAccount}
                    />

                    {/* Hide Likes */}
                    <Toggle
                        label="Hide My Likes"
                        state={hideLikes}
                        setState={setHideLikes}
                    />

                    {/* Allow Comments */}
                    <Toggle
                        label="Allow Comments"
                        state={allowComments}
                        setState={setAllowComments}
                    />

                    <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition p-3 rounded-xl text-left">
                        Comment Controls
                    </button>

                    <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition p-3 rounded-xl text-left">
                        Story & Post Visibility
                    </button>
                </div>

                {/* Notifications Section */}
                <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-5">

                    <h2 className="text-lg font-semibold">
                        Notifications
                    </h2>

                    <Toggle
                        label="Email Notifications"
                        state={emailNotif}
                        setState={setEmailNotif}
                    />

                    <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition p-3 rounded-xl text-left">
                        Push Notification Settings
                    </button>
                </div>

                {/* Security Section */}
                <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4">

                    <h2 className="text-lg font-semibold">
                        Security
                    </h2>

                    <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition p-3 rounded-xl text-left">
                        Two-Factor Authentication
                    </button>

                    <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition p-3 rounded-xl text-left">
                        Login Activity
                    </button>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 space-y-4">

                    <h2 className="text-lg font-semibold text-red-400">
                        Danger Zone
                    </h2>

                    <button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 transition p-3 rounded-xl text-left">
                        Delete Account
                    </button>
                </div>

                {/* Logout */}
                <button className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-2xl font-semibold">
                    Logout
                </button>

            </div>
        </div>
    );
}

/* Toggle Component */
function Toggle({ label, state, setState }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-300">
                {label}
            </span>

            <div
                onClick={() => setState(!state)}
                className={`relative w-12 h-6 rounded-full cursor-pointer transition ${state ? "bg-white" : "bg-zinc-700"
                    }`}
            >
                <div
                    className={`absolute top-1 w-4 h-4 rounded-full transition ${state
                            ? "left-7 bg-black"
                            : "left-1 bg-white"
                        }`}
                ></div>
            </div>
        </div>
    );
}

export default Settings;