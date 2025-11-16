import { useState } from "react";
import styles from "./OTPForm.module.css";

type OTPFormProps = {
  email: string;
  onSubmit: (otp: string) => void;
  onResend: () => void;
  error: string;
};

export const ForgotPasswordOTPForm = ({
  email,
  onSubmit,
  onResend,
  error,
}: OTPFormProps) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(otp);
  };

  return (
    <>
      <h1 className={styles.title}>Kiểm tra email của bạn</h1>
      <p className={styles.subtitle}>
        Chúng tôi đã gửi một mã OTP đến <strong>{email}</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="otp">Mã OTP</label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="Nhập mã 6 số"
            maxLength={6}
          />
          {error && <p className={styles.errorText}>{error}</p>}
        </div>
        <button type="submit" className={styles.continueBtn}>
          Tiếp tục
        </button>
      </form>

      <button onClick={onResend} className={styles.resendBtn}>
        Gửi lại mã OTP
      </button>
    </>
  );
};
