import React from "react";
import NotificationIcon from "../ui/notification";

type NavbarProps = {
    children: React.ReactNode;
};

export const Navbar = ({ children }: NavbarProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-dark-1 border-b border-dark-4">
                <div className="max-w-[900px] mx-auto px-5 md:px-8 h-16 flex-between">
                    {/* Left */}
                    <h1 className="h3-bold">Feed</h1>

                    {/* Right */}
                    <ul className="flex items-center gap-6">
                        <li className="small-medium text-light-4 hover:text-white cursor-pointer transition">
                            Friends
                        </li>
                        <li className="small-medium text-light-4 hover:text-white cursor-pointer transition">
                            Leaderboards
                        </li>
                        <li className="small-medium text-light-4 hover:text-white cursor-pointer transition">
                            Message
                        </li>
                        <li className="ml-auto">
                            <NotificationIcon/>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Page Content */}
            <main className="home-container pt-6">
                {children}
            </main>
        </div>
    );
};

export default Navbar;
