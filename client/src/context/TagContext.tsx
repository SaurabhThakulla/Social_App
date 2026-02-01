import { createContext } from "react";

export type TagContextType = {
    activeTag: string | null;
    setActiveTag: (tag: string | null) => void;
};

export const TagContext = createContext<TagContextType | null>(null);
