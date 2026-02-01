function FeedLoader() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">

      {[...Array(3)].map((_, i) => (
        <div key={i} className="post-card space-y-5">

          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-dark-4 rounded-full" />

            <div className="space-y-2 flex-1">
              <div className="h-4 bg-dark-4 rounded w-1/3" />
              <div className="h-3 bg-dark-4 rounded w-1/4" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <div className="h-4 bg-dark-4 rounded w-full" />
            <div className="h-4 bg-dark-4 rounded w-5/6" />
            <div className="h-4 bg-dark-4 rounded w-3/4" />
          </div>

          {/* Image */}
          <div className="h-64 bg-dark-4 rounded-xl" />

          {/* Actions */}
          <div className="flex gap-6">
            <div className="h-4 w-14 bg-dark-4 rounded" />
            <div className="h-4 w-14 bg-dark-4 rounded" />
            <div className="h-4 w-14 bg-dark-4 rounded" />
          </div>

        </div>
      ))}

    </div>
  );
}

export default FeedLoader;
