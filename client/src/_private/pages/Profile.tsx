const Profile = () => {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <h1 className="font-semibold text-lg">gamer_tag</h1>
          <div className="flex gap-4 text-xl">
            <span>➕</span>
            <span>☰</span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-700" />
            <div className="flex justify-around flex-1 text-center">
              <div>
                <p className="font-semibold">124</p>
                <p className="text-xs text-gray-400">Posts</p>
              </div>
              <div>
                <p className="font-semibold">1.2k</p>
                <p className="text-xs text-gray-400">Followers</p>
              </div>
              <div>
                <p className="font-semibold">180</p>
                <p className="text-xs text-gray-400">Following</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-3 text-sm">
            <p className="font-semibold">Saurav 👾</p>
            <p className="text-gray-300">Competitive Gamer | FPS 🎯</p>
            <p className="text-blue-400">twitch.tv/gamertag</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-4">
            <button className="flex-1 py-1.5 rounded-lg bg-gray-800 text-sm font-medium">
              Edit Profile
            </button>
            <button className="flex-1 py-1.5 rounded-lg bg-gray-800 text-sm font-medium">
              Share Profile
            </button>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex gap-4 px-4 py-3 overflow-x-auto">
          {["Clips", "Ranked", "Setup", "IRL"].map((item) => (
            <div key={item} className="text-center">
              <div className="w-14 h-14 rounded-full bg-gray-700 mb-1" />
              <p className="text-xs">{item}</p>
            </div>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-[2px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-800"
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Profile;
