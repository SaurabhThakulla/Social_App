import { Button } from "@/components/ui/button";
import { useState } from "react";

const Stories = () => {
    const [active, setActive] = useState<string | null>(null);


    return (
        <aside className="home-creators">

            {/* Stories */}
            <div>
                <h3 className="small-semibold mb-4">Stories</h3>
                <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-14 w-14 rounded-full bg-primary-500 flex-center text-sm font-bold">
                            AP
                        </div>
                        <p className="tiny-medium text-light-4">Anatoly</p>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className="h-14 w-14 rounded-full bg-dark-4 flex-center text-sm font-bold">
                            LE
                        </div>
                        <p className="tiny-medium text-light-4">Lolita</p>
                    </div>
                </div>
            </div>

            {/* Suggestions */}
            <div>
                <h3 className="small-semibold mb-4">Suggestions</h3>

                <div className="flex-between mb-3">
                    <div className="flex-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary-500 flex-center text-xs font-bold">
                            NS
                        </div>
                        <p className="small-medium">Nick Shelburne</p>
                    </div>
                    <Button className="shad-button_dark_4 rounded-full small-medium px-3">
                        Sync
                    </Button>
                </div>

                <div className="flex-between mb-3">
                    <div className="flex-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-dark-4 flex-center text-xs font-bold">
                            BL
                        </div>
                        <p className="small-medium">Brittni Lando</p>
                    </div>
                    <Button className="shad-button_dark_4 rounded-full small-medium px-3">
                        Sync
                    </Button>
                </div>

                <p className="tiny-medium text-light-4 cursor-pointer">See all</p>
            </div>

            {/* Recommendations */}
            <div>
                <h3 className="small-semibold mb-4">Recommendations</h3>
                <div className="flex gap-3 flex-wrap">
                    <Button
                        onClick={() => setActive("UI/UX")}
                        className={`px-4 py-2 rounded-full small-medium transition ${active === "UI/UX" ? "bg-primary-500" : "bg-dark-4 hover:bg-dark-3"}`}
                    >
                        UI/UX
                    </Button>

                    <Button
                        onClick={() => setActive("Music")}
                        className={`px-4 py-2 rounded-full small-medium transition ${active === "Music" ? "bg-primary-500" : "bg-dark-4 hover:bg-dark-3"}`}
                    >
                        Music
                    </Button>

                    <Button
                        onClick={() => setActive("Cooking")}
                        className={`px-4 py-2 rounded-full small-medium transition ${active === "Cooking" ? "bg-primary-500" : "bg-dark-4 hover:bg-dark-3"}`}
                    >
                        Cooking
                    </Button>

                    <Button
                        onClick={() => setActive("Hiking")}
                        className={`px-4 py-2 rounded-full small-medium transition ${active === "Hiking" ? "bg-primary-500" : "bg-dark-4 hover:bg-dark-3"}`}
                    >
                        Hiking
                    </Button>
                </div>
            </div>

        </aside>
    );
};

export default Stories;
