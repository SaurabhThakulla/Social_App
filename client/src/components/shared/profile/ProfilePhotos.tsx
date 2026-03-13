import type { PostMedia } from "@/lib/types/types";

type ProfilePhotosProps = {
  photos: PostMedia[];
};

const ProfilePhotos = ({ photos }: ProfilePhotosProps) => {
  return (
    <div className="bg-dark-2 border border-dark-4 rounded-2xl p-5">
      <h3 className="base-semibold mb-3">Photos</h3>
      {photos.length ? (
        <div className="grid grid-cols-3 gap-2">
          {photos.slice(0, 9).map((m, i) => (
            <img
              key={`${m.url}-${i}`}
              src={m.url}
              alt="post"
              className="w-full aspect-square object-cover rounded-lg"
            />
          ))}
        </div>
      ) : (
        <p className="text-light-4 text-sm">No photos yet</p>
      )}
    </div>
  );
};

export default ProfilePhotos;
