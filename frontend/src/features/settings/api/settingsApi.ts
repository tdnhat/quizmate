import { api } from "@/api";
import { User } from "@/types/user";

export interface UpdateProfileData {
  displayName?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AvatarResponse {
  avatarUrl: string;
}

export const settingsApi = {
  updateProfile: async (data: UpdateProfileData) => {
    const response = await api.put<User>("/auth/update-profile", data);
    return response.data;
  },
  
  changePassword: async (data: ChangePasswordData) => {
    const response = await api.post<User>("/auth/change-password", data);
    return response.data;
  },
  
  uploadAvatar: async (formData: FormData) => {
    const response = await api.post<AvatarResponse>("/auth/upload-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  
  deleteAvatar: async () => {
    const response = await api.delete<AvatarResponse>("/auth/destroy-avatar");
    return response.data;
  }
}; 