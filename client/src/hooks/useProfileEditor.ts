/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";

export function useProfileEditor(userId: string | null, profile: any, avatar: string | null) {
    const updateProfileMutation = useUpdateProfile();

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editName, setEditName] = useState("");
    const [editUsername, setEditUsername] = useState("");
    const [editBio, setEditBio] = useState("");
    const [editAvatar, setEditAvatar] = useState<string | null>(null);

    const editAvatarInputRef = useRef<HTMLInputElement>(null);

    const openEditProfile = () => {
        if (!profile) return;
        setEditName(profile.name ?? "");
        setEditUsername(profile.username ?? "");
        setEditBio(profile.bio ?? "");
        setEditAvatar(avatar);
        setIsEditingProfile(true);
    };

    const closeEditProfile = () => setIsEditingProfile(false);

    const handleAvatarSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setEditAvatar(reader.result as string);
        };

        reader.readAsDataURL(file);
    };

    const saveProfile = () => {
        if (!userId) return;

        updateProfileMutation.mutate({
            userId,
            name: editName.trim(),
            username: editUsername.trim(),
            bio: editBio.trim(),
            avatar: editAvatar,
        });
    };

    return {
        isEditingProfile,
        editName,
        editUsername,
        editBio,
        editAvatar,
        editAvatarInputRef,
        setEditName,
        setEditUsername,
        setEditBio,
        openEditProfile,
        closeEditProfile,
        handleAvatarSelect,
        saveProfile,
        updateProfileMutation
    };
}