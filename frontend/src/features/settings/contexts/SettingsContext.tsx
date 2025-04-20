import { createContext, ReactNode, useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/user';
import { AuthContext } from '@/features/auth/contexts/AuthContext';
import { UpdateProfileData, ChangePasswordData, AvatarResponse } from '../api/settingsApi';
import { useSettingsMutations } from '../hooks/useSettingsMutations';
import { toast } from 'react-hot-toast';

interface SettingsContextType {
  isUpdatingProfile: boolean;
  isChangingPassword: boolean;
  isUploadingAvatar: boolean;
  isDeletingAvatar: boolean;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  changePassword: (data: ChangePasswordData) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  deleteAvatar: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    updateProfileMutation,
    changePasswordMutation,
    uploadAvatarMutation,
    deleteAvatarMutation,
  } = useSettingsMutations();

  const updateProfile = async (data: UpdateProfileData) => {
    try {
      await updateProfileMutation.mutateAsync(data, {
        onSuccess: (updatedUser: User) => {
          queryClient.setQueryData(['user'], updatedUser);
          toast.success('Profile updated successfully');
        },
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
      throw error;
    }
  };

  const changePassword = async (data: ChangePasswordData) => {
    try {
      await changePasswordMutation.mutateAsync(data, {
        onSuccess: (updatedUser: User) => {
          queryClient.setQueryData(['user'], updatedUser);
          toast.success('Password changed successfully');
        },
      });
    } catch (error) {
      console.error('Failed to change password:', error);
      toast.error('Failed to change password');
      throw error;
    }
  };

  const uploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadAvatarMutation.mutateAsync(formData, {
        onSuccess: (response: AvatarResponse) => {
          // Update user with new avatar URL
          if (user) {
            const updatedUser = {
              ...user,
              avatarUrl: response.avatarUrl,
            };
            queryClient.setQueryData(['user'], updatedUser);
          }
          toast.success('Avatar uploaded successfully');
        },
      });
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      toast.error('Failed to upload avatar');
      throw error;
    }
  };

  const deleteAvatar = async () => {
    try {
      await deleteAvatarMutation.mutateAsync(undefined, {
        onSuccess: (response: AvatarResponse) => {
          // Update user with default avatar URL
          if (user) {
            const updatedUser = {
              ...user,
              avatarUrl: response.avatarUrl,
            };
            queryClient.setQueryData(['user'], updatedUser);
          }
          toast.success('Avatar removed successfully');
        },
      });
    } catch (error) {
      console.error('Failed to delete avatar:', error);
      toast.error('Failed to delete avatar');
      throw error;
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        isUpdatingProfile: updateProfileMutation.isPending,
        isChangingPassword: changePasswordMutation.isPending,
        isUploadingAvatar: uploadAvatarMutation.isPending,
        isDeletingAvatar: deleteAvatarMutation.isPending,
        updateProfile,
        changePassword,
        uploadAvatar,
        deleteAvatar,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
}; 