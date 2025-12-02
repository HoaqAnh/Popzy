import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { homeMockData } from "@/mocks/home";
import Logo from "@/assets/Popzy.svg";
import { useRegister } from "@/features/auth/hooks/useRegister";
import RegisterEmailForm from "@/features/auth/components/register/EmailForm";
import type { Step1FormValues } from "@/types/realestate";
import RegisterPasswordForm from "@/features/auth/components/register/PasswordForm";

type AuthStep = "info" | "password";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useRegister();

  const [step, setStep] = useState<AuthStep>("info");
  const [formData, setFormData] = useState<Step1FormValues>({
    email: "",
    phone: "",
  });

  const handleInfoSubmit = (data: Step1FormValues) => {
    setFormData(data);
    setStep("password");
  };

  const handleBackToInfo = () => {
    setStep("info");
  };

  const handleRegisterSubmit = async (password: string, fullname: string) => {
    const finalPayload = {
      ...formData,
      password,
      fullname,
    };

    const result = await register(finalPayload);

    if (result.success) {
      alert("Đăng ký thành công! Đang chuyển hướng...");
      navigate("/auth/login");
    } else {
      alert(result.error || "Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.formCol}>
        <div className={styles.formContent}>
          <Link to="/" className={styles.brand}>
            <img src={Logo} alt="Popzy" className={styles.logo} />
            <span className={styles.brandText}>Popzy</span>
          </Link>

          {error && (
            <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
          )}

          {step === "info" && (
            <RegisterEmailForm
              defaultValues={formData}
              onSubmit={handleInfoSubmit}
            />
          )}

          {step === "password" && (
            <RegisterPasswordForm
              email={formData.email}
              phone={formData.phone}
              onRegister={handleRegisterSubmit}
              onBack={handleBackToInfo}
            />
          )}

          {isLoading && (
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              Đang xử lý...
            </p>
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

export default RegisterPage;
