import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/api/api";
import type { Profile } from "@/lib/types/types";

type UpdateProfileInput = {
  userId: string;
  name?: string;
  username?: string;
  bio?: string | null;
  avatar?: string | null;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<Profile, Error, UpdateProfileInput>({
    mutationFn: ({ userId, ...payload }) => updateProfile(userId, payload),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["profile", variables.userId], data);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
