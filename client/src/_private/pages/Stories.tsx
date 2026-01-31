const Stories = () => {
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
                    <button className="shad-button_dark_4 small-medium px-3">
                        Sync
                    </button>
                </div>

                <div className="flex-between mb-3">
                    <div className="flex-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-dark-4 flex-center text-xs font-bold">
                            BL
                        </div>
                        <p className="small-medium">Brittni Lando</p>
                    </div>
                    <button className="shad-button_dark_4 small-medium px-3">
                        Sync
                    </button>
                </div>

                <p className="tiny-medium text-light-4 cursor-pointer">See all</p>
            </div>

            {/* Recommendations */}
            <div>
                <h3 className="small-semibold mb-4">Recommendations</h3>
                <div className="flex gap-3 flex-wrap">
                    <div className="px-4 py-2 rounded-full bg-dark-4 small-medium">UI/UX</div>
                    <div className="px-4 py-2 rounded-full bg-primary-500 small-medium">Music</div>
                    <div className="px-4 py-2 rounded-full bg-dark-4 small-medium">Cooking</div>
                    <div className="px-4 py-2 rounded-full bg-dark-4 small-medium">Hiking</div>
                </div>
            </div>

        </aside>
    );
};

export default Stories;
