function Profile() {
  const img = 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&auto=format&fit=crop&q=80';
  return (
    <section className="profile-container">
      {/* Profile Header */}
      <div className="profile-inner_container">
        {/* Avatar */}
        <img
          src={img}
          alt="profile"
          className="h-36 w-36 rounded-full object-cover border border-dark-4"
        />

        {/* User Info */}
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex-between">
            <div>
              <h2 className="h2-bold">Saurav Thakulla</h2>
              <p className="small-regular text-light-4">@saurav</p>
            </div>

            <button className="shad-button_primary px-6 py-2 rounded-lg">
              Edit Profile
            </button>
          </div>

          <p className="base-regular text-light-3 max-w-xl">
            Developer | Anime lover | Building cool stuff with React & Tailwind 🚀
          </p>

          {/* Stats */}
          <div className="flex gap-6">
            <p className="base-medium">
              <span className="body-bold">120</span> Posts
            </p>
            <p className="base-medium">
              <span className="body-bold">1.8k</span> Followers
            </p>
            <p className="base-medium">
              <span className="body-bold">210</span> Following
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex w-full max-w-5xl gap-4">
        <button className="profile-tab text-primary-500">
          <span className="base-medium">Posts</span>
        </button>
        <button className="profile-tab">
          <span className="base-medium">Saved</span>
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid-container">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="grid-post_link">
            <img
              src={`https://picsum.photos/500/500?random=${item}`}
              alt="post"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Profile;
