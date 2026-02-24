import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "/assets/images/logo.svg";

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => navigate("/"), 7000);
        return () => clearTimeout(t);
    }, [navigate]);

    return (
        <div className="relative w-full h-screen flex-center overflow-hidden bg-dark-1">

            {/* 🌈 ambient gradient glow */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 bg-gradient-to-br from-primary-500 via-purple-600 to-pink-500 blur-3xl"
            />

            {/* 🌌 floating lights (mobile-safe motion) */}
            <motion.div
                animate={{ y: [0, -40, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-24 left-20 w-72 h-72 bg-primary-500/30 rounded-full blur-3xl"
            />

            <motion.div
                animate={{ y: [0, 50, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
            />

            {/* 🎬 main content */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center px-6"
            >
                {/* 🧬 AURA logo */}
                <motion.img
                    src={logo}
                    alt="AURA"
                    initial={{ scale: 0.8, rotate: -8 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-40 h-40 mb-6 drop-shadow-[0_0_40px_rgba(168,85,247,0.8)]"
                />

                <h1 className="h2-bold mb-2">
                    Page not found
                </h1>

                <p className="base-regular text-light-4 max-w-md">
                    You’ve stepped outside the AURA universe.
                </p>

                <p className="tiny-medium text-light-4 mt-2">
                    Redirecting you Sigin
                </p>

                <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/")}
                    className="mt-8 px-8 py-3 rounded-full
            bg-dark-4 border border-dark-4
            hover:bg-primary-500
            transition-all
            base-medium"
                >
                    Go Sigin →
                </motion.button>
            </motion.div>
        </div>
    );
}
