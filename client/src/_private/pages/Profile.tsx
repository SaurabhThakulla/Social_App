import { Button } from "@/components/ui/button";

function Profile() {
  const img = 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&auto=format&fit=crop&q=80';
  return (
    <section className="profile-container">
      {/* Profile Header */}
      <div className="profile-inner_container">
        {/* Avatar */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <img
            src={img}
            alt="profile"
            className="h-32 w-32 md:h-36 md:w-36 rounded-full object-cover border-2 border-dark-4"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col gap-5 flex-1 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="h2-bold">Saurav Thakulla</h2>
              <p className="small-regular text-light-4">@saurav</p>
            </div>

            <Button className="shad-button_primary px-6 py-2 rounded-lg">
              Edit Profile
            </Button>
          </div>

          <p className="base-regular text-light-3 max-w-2xl">
            Developer | Anime lover | Building cool stuff with React & Tailwind 🚀
          </p>

          {/* Stats */}
          <div className="flex gap-8">
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
        <Button className="profile-tab text-primary-500">
          <span className="base-medium">Posts</span>
        </Button>
        <Button className="profile-tab">
          <span className="base-medium">Saved</span>
        </Button>
      </div>

      {/* Posts Grid */}
      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="grid-post_link">
            <img
              src={`https://picsum.photos/500/500?random=${item}`}
              alt="post"
              className="w-full aspect-square object-cover hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Profile;
