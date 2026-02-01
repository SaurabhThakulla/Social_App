import React from "react";

type NavbarProps = {
    children: React.ReactNode;
};

export const Navbar = ({ children }: NavbarProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="p-4">
                <h1 className="items-center">Feed</h1>
                <ul className="flex gap-6 justify-end">
                    <li>Friends</li>
                    <li>Leaderboards</li>
                </ul>
            </nav>

            {/* Page content */}
            <main className="flex-1  overflow-scroll custom-scrollbar">
                {children}
            </main>
        </div>
    );
};

export default Navbar;
