function FeedLoader() {
    return (
        <div className="space-y-4 animate-pulse">
            {[...Array(2)].map((_, i) => (
                <div
                    key={i}
                    className="bg-dark-2 border border-dark-4 rounded-xl p-4 space-y-4"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-dark-4 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <div className="h-3 bg-dark-4 rounded w-1/3" />
                            <div className="h-2 bg-dark-4 rounded w-1/4" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <div className="h-3 bg-dark-4 rounded w-full" />
                        <div className="h-3 bg-dark-4 rounded w-5/6" />
                        <div className="h-3 bg-dark-4 rounded w-2/3" />
                    </div>

                    {/* Image */}
                    <div className="h-48 bg-dark-4 rounded-lg" />

                    {/* Actions */}
                    <div className="flex gap-4">
                        <div className="h-4 w-10 bg-dark-4 rounded" />
                        <div className="h-4 w-10 bg-dark-4 rounded" />
                        <div className="h-4 w-10 bg-dark-4 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FeedLoader;
