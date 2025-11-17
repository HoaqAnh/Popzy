import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import { homeMockData } from "@/mocks/home";
import Logo from "@/assets/Popzy.svg";
import ForgotPasswordEmailForm from "@/features/auth/components/forgot-password/EmailForm";
import ForgotPasswordOTPForm from "@/features/auth/components/forgot-password/OTPForm";
import ForgotPasswordResetForm from "@/features/auth/components/forgot-password/ResetForm";

type Step = "email" | "otp" | "reset";
const MOCK_OTP = "123456";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    alert(`Đã gửi mã OTP (giả lập: ${MOCK_OTP}) đến ${submittedEmail}`);
    setStep("otp");
  };

  const handleOtpSubmit = (otp: string) => {
    if (otp === MOCK_OTP) {
      setOtpError("");
      setStep("reset");
    } else {
      setOtpError("Mã OTP không chính xác.");
    }
  };

  const handleResendOtp = () => {
    alert(`Đã gửi lại mã OTP (giả lập: ${MOCK_OTP}) đến ${email}`);
    setOtpError("");
  };

  const handleResetPassword = (password: string) => {
    console.log("Mật khẩu mới:", password, "cho email:", email);
    alert("Đặt lại mật khẩu thành công!");
    navigate("/auth/login");
  };

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.formCol}>
        <div className={styles.formContent}>
          <Link to="/" className={styles.brand}>
            <img src={Logo} alt="Popzy" className={styles.logo} />
            <span className={styles.brandText}>Popzy</span>
          </Link>

          {step === "email" && (
            <ForgotPasswordEmailForm onSubmit={handleEmailSubmit} />
          )}

          {step === "otp" && (
            <ForgotPasswordOTPForm
              email={email}
              onSubmit={handleOtpSubmit}
              onResend={handleResendOtp}
              error={otpError}
            />
          )}

          {step === "reset" && (
            <ForgotPasswordResetForm onSubmit={handleResetPassword} />
          )}
        </div>
      </main>

      <aside
        className={styles.imageCol}
        style={{ backgroundImage: `url(${homeMockData.authImageUrl})` }}
        aria-label="Ngôi nhà"
      />
    </div>
  );
};

export default ForgotPasswordPage;
