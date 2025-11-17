import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { homeMockData } from "@/mocks/home";
import { login } from "@/mocks/mockAuth";
import Logo from "@/assets/Popzy.svg";
import EmailForm from "@/features/auth/components/login/EmailForm";
import PasswordForm from "@/features/auth/components/login/PasswordForm";
import styles from "./login.module.css";

type AuthStep = "email" | "password";

const LoginPage = () => {
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
    const success = login(email, password);

    if (success) {
      alert("Đăng nhập thành công!");
      navigate("/");
    } else {
      alert("Email hoặc mật khẩu không đúng. (TK: test@popzy.com | MK: 123)");
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

          {step === "email" && <EmailForm onSubmit={handleEmailSubmit} />}

          {step === "password" && (
            <PasswordForm
              email={email}
              onLogin={handlePasswordSubmit}
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
};

export default LoginPage;
