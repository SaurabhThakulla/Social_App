import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types/types";

type ProfileHeaderProps = {
  profile: Profile;
  coverImage: string;
  avatar: string;
};

const ProfileHeader = ({ profile, coverImage, avatar }: ProfileHeaderProps) => {
  return (
    <div className="w-full bg-dark-2 border border-dark-4 rounded-2xl overflow-hidden">
      <div
        className="h-56 md:h-64 bg-center bg-cover"
        style={{ backgroundImage: `url(${coverImage})` }}
      />
      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-14">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-dark-2 overflow-hidden bg-dark-3">
            <img src={avatar} alt="profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h2 className="h2-bold">{profile.name}</h2>
            <p className="small-regular text-light-4">
              @{profile.username}
            </p>
            <div className="flex gap-6 mt-2 text-light-3">
              <p>
                <span className="body-bold">{profile.posts_count}</span> Posts
              </p>
              <p>
                <span className="body-bold">{profile.followers_count}</span>{" "}
                Followers
              </p>
              <p>
                <span className="body-bold">{profile.following_count}</span>{" "}
                Following
              </p>
            </div>
          </div>
          <Button className="shad-button_primary px-6 py-2 rounded-lg">
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
