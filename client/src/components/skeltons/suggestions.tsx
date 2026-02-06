export const SuggestionsSkeleton = () => {
    return (
        <div className="animate-pulse">

            {[1, 2].map(function (_, i) {
                return (
                    <div key={i} className="flex-between mb-3">
                        <div className="flex-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-dark-4"></div>
                            <div className="w-28 h-3 bg-dark-4 rounded"></div>
                        </div>

                        <div className="w-14 h-7 bg-dark-4 rounded-full"></div>
                    </div>
                );
            })}

            <div className="w-12 h-3 bg-dark-4 rounded mt-2"></div>
        </div>
    );
};
