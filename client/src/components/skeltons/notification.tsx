export function NotificationSkeleton() {
    return (
        <div>
            {Array.from({ length: 3 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg animate-pulse"
                >
                    <div className="w-9 h-9 rounded-full bg-dark-4"></div>

                    <div className="flex-1 space-y-2">
                        <div className="h-3 w-3/4 bg-dark-4 rounded"></div>
                        <div className="h-2 w-1/3 bg-dark-4 rounded"></div>
                    </div>

                    <div className="w-2 h-2 rounded-full bg-dark-4"></div>
                </div>
            ))}
        </div>
    );
}