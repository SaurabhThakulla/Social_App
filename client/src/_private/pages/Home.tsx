const Feed = () => {
  return (
    <section className="home-container">
      <div className="home-posts mx-auto">
        {/* Feed Header */}
        <h1 className="h2-bold w-full text-left">Feed</h1>

        {/* Single Post */}
        <div className="post-card">
          {/* User Info */}
          <div className="flex-between mb-3">
            <div className="flex-start gap-3">
              {/* Profile image / initials */}
              <div className="h-10 w-10 rounded-full bg-primary-500 flex-center font-bold">
                AU
              </div>

              <div>
                <p className="base-semibold">auravibe</p>
                <p className="tiny-medium text-light-4">just now</p>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <p className="base-regular mb-4">
            late night thoughts 🌙
          </p>

          {/* Actions */}
          <div className="flex-between mt-4">
            <div className="flex gap-6">
              <span className="small-medium cursor-pointer">✨ Aura</span>
              <span className="small-medium cursor-pointer">💬 Yap</span>
              <span className="small-medium cursor-pointer">🔁 Transmit</span>
            </div>
          </div>
        </div>

        {/* Duplicate post-card to simulate feed */}
        <div className="post-card">
          <p className="base-regular">quiet days hit different</p>
        </div>

      </div>
    </section>
  );
};

export default Feed;
