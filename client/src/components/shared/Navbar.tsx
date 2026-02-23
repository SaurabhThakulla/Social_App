import React from "react";
import NotificationIcon from "../ui/notification";
import logo from "../../../public/assets/images/logo.png"

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
                    <img src={logo} className="w-10 h-10 object-contain brightness-0 saturate-100 invert sepia hue-rotate-[200deg]" alt="logo" />

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
