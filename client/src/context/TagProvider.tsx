import { useContext, useState } from "react";
import { TagContext } from "./TagContext";

export function TagProvider({ children }: { children: React.ReactNode }) {
    const [activeTag, setActiveTag] = useState<string | null>(null);

    return (
        <TagContext.Provider value={{ activeTag, setActiveTag }}>
            {children}
        </TagContext.Provider>
    );
}

export function useTag() {
    const context = useContext(TagContext);

    if (!context) {
        throw new Error("useTag must be used inside TagProvider");
    }

    return context;
}
