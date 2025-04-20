import { useMutation } from '@tanstack/react-query';
import { settingsApi, UpdateProfileData, ChangePasswordData, AvatarResponse } from '../api/settingsApi';
import { User } from '@/types/user';

export const useSettingsMutations = () => {
  const updateProfileMutation = useMutation<User, Error, UpdateProfileData>({
    mutationFn: settingsApi.updateProfile,
  });

  const changePasswordMutation = useMutation<User, Error, ChangePasswordData>({
    mutationFn: settingsApi.changePassword,
  });

  const uploadAvatarMutation = useMutation<AvatarResponse, Error, FormData>({
    mutationFn: settingsApi.uploadAvatar,
  });

  const deleteAvatarMutation = useMutation<AvatarResponse, Error, void>({
    mutationFn: settingsApi.deleteAvatar,
  });

  return {
    updateProfileMutation,
    changePasswordMutation,
    uploadAvatarMutation,
    deleteAvatarMutation,
  };
}; 