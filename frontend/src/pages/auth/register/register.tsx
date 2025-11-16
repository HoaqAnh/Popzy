import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { homeMockData } from "@/mocks/home";
import Logo from "@/assets/Popzy.svg";
import { RegisterEmailForm } from "@/features/auth/components/register/RegisterEmailForm";
import { RegisterPasswordForm } from "@/features/auth/components/register/RegisterPasswordForm";

type AuthStep = "email" | "password";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep("password");
  };

  const handleEditEmail = () => {
    setStep("email");
  };

  const handlePasswordSubmit = (password: string) => {
    console.log("Đăng ký với:", email, password);
    alert(
      "Tạo tài khoản thành công! (Mock)\nBạn sẽ được chuyển đến trang đăng nhập."
    );
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
            <RegisterEmailForm onSubmit={handleEmailSubmit} />
          )}

          {step === "password" && (
            <RegisterPasswordForm
              email={email}
              onRegister={handlePasswordSubmit}
              onEditEmail={handleEditEmail}
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
}
