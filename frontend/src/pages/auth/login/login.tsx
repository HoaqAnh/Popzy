import { useState } from "react";
import { Link } from "react-router-dom";
import { homeMockData } from "@/mocks/home";
import { useLogin } from "@/features/auth/hooks/useLogin";
import Logo from "@/assets/Popzy.svg";
import EmailForm from "@/features/auth/components/login/EmailForm";
import PasswordForm from "@/features/auth/components/login/PasswordForm";
import styles from "./login.module.css";

type AuthStep = "email" | "password";

const LoginPage = () => {
  const { login, isLoading, error } = useLogin();

  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep("password");
  };

  const handleEditEmail = () => {
    setStep("email");
  };

  const handlePasswordSubmit = async (password: string) => {
    await login({ email, password });
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
            <div
              style={{
                color: "var(--destructive)",
                marginBottom: "16px",
                fontSize: "14px",
                textAlign: "center",
                padding: "8px",
                backgroundColor: "#fee2e2",
                borderRadius: "6px",
              }}
            >
              {error}
            </div>
          )}

          {step === "email" && <EmailForm onSubmit={handleEmailSubmit} />}

          {step === "password" && (
            <PasswordForm
              email={email}
              onLogin={handlePasswordSubmit}
              onEditEmail={handleEditEmail}
            />
          )}

          {isLoading && (
            <p
              style={{
                textAlign: "center",
                marginTop: "12px",
                fontSize: "14px",
                color: "var(--muted-foreground)",
              }}
            >
              Đang đăng nhập...
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

export default LoginPage;
