import { useMemo } from "react";
import type { FeedPost, Profile } from "@/lib/types/types";

type UseProfilePostsOptions = {
  posts?: FeedPost[];
  profile?: Profile | null;
};

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?w=1200&auto=format&fit=crop&q=80";
const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&auto=format&fit=crop&q=80";

export const useProfilePosts = ({ posts, profile }: UseProfilePostsOptions) => {
  const userPosts = useMemo(() => {
    if (!posts || !profile) return [];
    return posts
      .filter(
        (p) => p.user_id === profile.id || p.username === profile.username
      )
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );
  }, [posts, profile]);

  const photos = useMemo(
    () =>
      userPosts
        .flatMap((p) => p.media || [])
        .filter((m) => Boolean(m?.url)),
    [userPosts]
  );

  const coverImage = photos[0]?.url || DEFAULT_COVER;
  const avatar = profile?.avatar || DEFAULT_AVATAR;

  return {
    userPosts,
    photos,
    coverImage,
    avatar,
  };
};
