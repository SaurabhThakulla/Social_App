import type { Profile } from "@/lib/types/types";

type ProfileIntroProps = {
  profile: Profile;
};

const ProfileIntro = ({ profile }: ProfileIntroProps) => {
  return (
    <div className="bg-dark-2 border border-dark-4 rounded-2xl p-5">
      <h3 className="base-semibold mb-3">Intro</h3>
      <p className="text-light-3 mb-3">{profile.bio || "No bio yet"}</p>
      <p className="text-light-4 text-sm">
        Joined{" "}
        {new Date(profile.created_at).toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric",
        })}
      </p>
    </div>
  );
};

export default ProfileIntro;
