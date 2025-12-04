import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./create.module.css";
import { type CreateListingFormValues } from "@/types/listing";
// Component Step
import Step1Photos from "@/features/sell/components/create/Step1Photos";
import Step2Details from "@/features/sell/components/create/Step2Details";
import Step3Location from "@/features/sell/components/create/Step3Location";
import Step4Specs from "@/features/sell/components/create/Step4Specs";
import Step5Features from "@/features/sell/components/create/Step5Features";
import Step6Review from "@/features/sell/components/create/Step6Review";

// Service
import {
  listingService,
  type CreatePostRequest,
} from "@/features/sell/services/listingService";

const CreateListingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      bedrooms: 0,
      bathrooms: 0,
    },
  });

  const images = methods.watch("images") || [];
  const validImagesCount = images.filter(
    (img) => img.status === "success"
  ).length;
  const isUploading = images.some((img) => img.status === "uploading");
  const isNextDisabled =
    isSubmitting || (step === 1 && (validImagesCount < 5 || isUploading));

  const totalSteps = 6;
  const progressPercent = (step / totalSteps) * 100;

  const handleNext = async () => {
    let isValid = false;

    if (step === 1) {
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
        if (confirm("Bạn có chắc chắn muốn đăng tin này không?")) {
          handleSubmitPost();
        }
      }
    }
  };

  const handleSubmitPost = async () => {
    try {
      setIsSubmitting(true);
      const values = methods.getValues();

      const payload: CreatePostRequest = {
        name: values.title,
        description: values.description,
        price: values.price,
        properties: {
          area: values.area,
          frontage: values.frontage || null,
          accessRoad: values.accessRoad || null,
          floors: values.floors || null,
          bedrooms: values.bedrooms || null,
          bathroom: values.bathrooms || null,
          houseDirection: values.houseDirection || null,
          balconyDirection: values.balconyDirection || null,
          legalStatus: values.legalStatus || null,
          furniture: values.furniture || null,
          district: values.district,
          city: values.city,
        },
        images: values.images.map((img) => ({
          url: img.publicId || img.url,
        })),
        videos: [],
      };

      const response = await listingService.createPost(payload);

      if (response.data && response.data.statusCode === 200) {
        alert("Đăng tin thành công!");
        navigate("/");
      } else {
        throw new Error(response.data.message || "Có lỗi xảy ra");
      }
    } catch (error: any) {
      console.error(error);
      alert("Đăng tin thất bại");
    } finally {
      setIsSubmitting(false);
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
            Bước {step}/{totalSteps}: {getStepName(step)}
          </span>
          <span className={styles.nextLabel}>
            {step < totalSteps
              ? `Tiếp tục: ${getStepName(step + 1)}`
              : "Hoàn thành"}
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
        <button
          onClick={handleBack}
          className={styles.backBtn}
          disabled={isSubmitting}
        >
          Quay lại
        </button>

        <button
          onClick={handleNext}
          className={styles.nextBtn}
          disabled={isNextDisabled}
        >
          {isSubmitting
            ? "Đang xử lý..."
            : step === 1 && validImagesCount < 5
            ? `Cần thêm ${5 - validImagesCount} ảnh`
            : step === 1 && isUploading
            ? "Đang tải ảnh..."
            : step === totalSteps
            ? "Xuất bản tin"
            : "Tiếp tục"}
        </button>
      </footer>
    </div>
  );
};

function getStepName(step: number) {
  switch (step) {
    case 1:
      return "Hình ảnh";
    case 2:
      return "Chi tiết";
    case 3:
      return "Vị trí";
    case 4:
      return "Thông tin quan trọng";
    case 5:
      return "Thông tin tùy chọn";
    case 6:
      return "Xem lại";
    default:
      return "";
  }
}

export default CreateListingPage;
