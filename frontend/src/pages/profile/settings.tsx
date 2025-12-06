import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./settings.module.css";
import { PersonalInfo, Security } from "@/features/profile";
import { useGetProfile } from "@/features/profile/hooks/useGetProfile";
import { useUpdateProfile } from "@/features/profile/hooks/useUpdateProfile";
import { useChangePassword } from "@/features/profile/hooks/useChangePassword";
import type { User } from "@/types/realestate";

type SettingsFormValues = User & {
  newPassword?: string;
  confirmPassword?: string;
};

const ProfileSettingsPage = () => {
  const { user, isLoading, refetch } = useGetProfile();
  const { updateProfileData, isUpdating } = useUpdateProfile();
  const { changePassword, isLoading: isChangingPw } = useChangePassword();

  const methods = useForm<SettingsFormValues>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (user) {
      methods.reset({
        ...user,
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user, methods.reset]);

  const onSubmit = async (data: SettingsFormValues) => {
    if (!user) return;

    const messages: string[] = [];
    let hasError = false;

    if (data.fullname !== user.fullname || data.imageUrl !== user.imageUrl) {
      const infoResult = await updateProfileData(
        { fullname: user.fullname, imageUrl: user.imageUrl },
        { fullname: data.fullname, imageUrl: data.imageUrl }
      );

      if (!infoResult.success) hasError = true;
      messages.push(infoResult.message);
    }

    if (data.newPassword) {
      const pwResult = await changePassword({
        email: user.email,
        password: data.newPassword,
      });

      if (pwResult.success) {
        messages.push("Đổi mật khẩu thành công");
      } else {
        hasError = true;
        messages.push(`Đổi mật khẩu thất bại: ${pwResult.error}`);
      }
    }

    if (messages.length > 0) {
      alert(messages.join("\n"));
    }

    if (!hasError) {
      refetch();
      methods.setValue("newPassword", "");
      methods.setValue("confirmPassword", "");
    }
  };

  const isBusy = isLoading || isUpdating || isChangingPw;

  if (isLoading) return <div className={styles.pageWrapper}>Đang tải...</div>;

  return (
    <FormProvider {...methods}>
      <div className={styles.pageWrapper}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.main}>
          <PersonalInfo />

          <Security />

          <div className={styles.actions}>
            <button type="submit" className={styles.saveBtn} disabled={isBusy}>
              {isBusy ? "Đang xử lý..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default ProfileSettingsPage;
