import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./create.module.css";
import { type CreateListingFormValues } from "@/types/listing";
import Step1Photos from "@/features/sell/components/create/Step1Photos";
import Step2Details from "@/features/sell/components/create/Step2Details";
import Step3Location from "@/features/sell/components/create/Step3Location";
import Step4Specs from "@/features/sell/components/create/Step4Specs";
import Step5Features from "@/features/sell/components/create/Step5Features";
import Step6Review from "@/features/sell/components/create/Step6Review";

const CreateListingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const methods = useForm<CreateListingFormValues>({
    mode: "onBlur",
    defaultValues: {
      images: [],
      title: "",
      description: "",
      city: "",
      district: "",
      price: 0,
      area: 0,
      bedrooms: 2,
      bathrooms: 1,
    },
  });

  const totalSteps = 6;
  const progressPercent = (step / totalSteps) * 100;

  const handleNext = async () => {
    let isValid = false;

    if (step === 1) {
      const images = methods.getValues("images");
      if (images.length < 1) {
        alert("Vui lòng tải lên ít nhất 1 ảnh.");
        return;
      }
      isValid = true;
    } else if (step === 2) {
      isValid = await methods.trigger(["title", "description"]);
    } else if (step === 3) {
      isValid = await methods.trigger(["city", "district"]);
    } else if (step === 4) {
      isValid = await methods.trigger([
        "price",
        "area",
        "bedrooms",
        "bathrooms",
      ]);
    } else if (step === 5) {
      isValid = await methods.trigger(["frontage", "accessRoad", "floors"]);
    } else {
      isValid = true;
    }

    if (isValid) {
      if (step < totalSteps) {
        setStep((prev) => prev + 1);
        window.scrollTo(0, 0);
      } else {
        const finalData = methods.getValues();
        console.log("Submitting Post:", finalData);
        if (confirm("Bạn có chắc chắn muốn đăng tin này không?")) {
          alert("Đăng tin thành công!");
          navigate("/");
        }
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    } else {
      navigate("/sell");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.progressRow}>
          <span className={styles.stepLabel}>
            Step {step}/{totalSteps}: {getStepName(step)}
          </span>
          <span className={styles.nextLabel}>
            {step < totalSteps ? `Next: ${getStepName(step + 1)}` : "Finish"}
          </span>
        </div>
        <div className={styles.progressBarBg}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      <FormProvider {...methods}>
        <main className={styles.mainContent}>
          {step === 1 && <Step1Photos />}
          {step === 2 && <Step2Details />}
          {step === 3 && <Step3Location />}
          {step === 4 && <Step4Specs />}
          {step === 5 && <Step5Features />}
          {step === 6 && <Step6Review />}
        </main>
      </FormProvider>

      <footer className={styles.footer}>
        <button onClick={handleBack} className={styles.backBtn}>
          Back
        </button>
        <button onClick={handleNext} className={styles.nextBtn}>
          {step === totalSteps ? "Publish Listing" : "Continue"}
        </button>
      </footer>
    </div>
  );
};

function getStepName(step: number) {
  switch (step) {
    case 1:
      return "Photos";
    case 2:
      return "Details";
    case 3:
      return "Location";
    case 4:
      return "Specs";
    case 5:
      return "Features";
    case 6:
      return "Review";
    default:
      return "";
  }
}

export default CreateListingPage;
