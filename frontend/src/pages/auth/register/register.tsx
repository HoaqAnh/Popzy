import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { homeMockData } from "@/mocks/home";
import Logo from "@/assets/Popzy.svg";
import { register } from "@/mocks/mockAuth";
import RegisterEmailForm from "@/features/auth/components/register/EmailForm";
import type { Step1FormValues } from "@/types/realestate";
import RegisterPasswordForm from "@/features/auth/components/register/PasswordForm";

type AuthStep = "info" | "password";

const RegisterPage = () => {
  const navigate = useNavigate();
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

  const handleRegisterSubmit = (password: string) => {
    const finalPayload = {
      ...formData,
      password,
    };

    const success = register(finalPayload);

    if (success) {
      alert("Đăng ký thành công! Đang chuyển hướng...");
      navigate("/");
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
