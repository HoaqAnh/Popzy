import { useState } from "react";
import { profileService } from "../services/profileService";

export const useUpdateProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateProfileData = async (
    currentData: { fullname: string; imageUrl?: string },
    newData: { fullname: string; imageUrl?: string }
  ) => {
    setIsUpdating(true);
    let success = true;
    let message = "";

    try {
      if (newData.imageUrl && newData.imageUrl !== currentData.imageUrl) {
        await profileService.updateAvatar(newData.imageUrl);
      }

      if (newData.fullname && newData.fullname !== currentData.fullname) {
        await profileService.updateFullname(newData.fullname);
      }

      message = "Cập nhật hồ sơ thành công!";
    } catch (err: any) {
      console.error("Update profile error:", err);
      success = false;
      message = err.response?.data?.message || "Cập nhật thất bại. Vui lòng thử lại.";
    } finally {
      setIsUpdating(false);
    }

    return { success, message };
  };

  return {
    updateProfileData,
    isUpdating,
  };
};
