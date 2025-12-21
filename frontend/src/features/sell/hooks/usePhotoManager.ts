import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { type PhotoItem } from "@/types/listing";
import { getCloudinaryUrl } from "@/utils/image";
import { useImageUpload } from "./useImageUpload";
import { modelService, type AIAnalysisResult } from "../services/modelService";

const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export const usePhotoManager = () => {
  const { setValue, getValues, trigger } = useFormContext();
  const { uploadImages, progress } = useImageUpload();

  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    const existing = getValues("images");
    return existing && existing.length > 0 ? existing : [];
  });
  const [errorMap, setErrorMap] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setValue("images", photos);
    const isUploading = photos.some((p) => p.status === "uploading");
    if (photos.length > 0 && !isUploading) {
      trigger("images");
    }
  }, [photos, setValue, trigger]);

  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        if (photo.url.startsWith("blob:")) {
          URL.revokeObjectURL(photo.url);
        }
      });
    };
  }, []);

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_SIZE_BYTES) return false;
    if (!file.type.startsWith("image/")) return false;
    return true;
  };

  const getAIErrorMessage = (reason: string, label: string) => {
    if (reason === "too_blurry") return "Ảnh quá mờ";
    if (reason === "too_small") return "Kích thước quá nhỏ";
    if (reason === "spam") return "Nội dung spam";
    if (label === "spam") return "Ảnh không hợp lệ";
    return "Ảnh không đạt chuẩn";
  };

  const processFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const fileArray = Array.from(fileList);
    const uniqueFiles = fileArray.filter((file) => {
      return !photos.some((p) => p.file && p.file.name === file.name && p.file.size === file.size);
    });

    if (uniqueFiles.length === 0) return;

    const newItems: PhotoItem[] = [];
    const clientValidFiles: File[] = [];

    uniqueFiles.forEach((file) => {
      const isClientValid = validateFile(file);
      const newItem: PhotoItem = {
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
        status: isClientValid ? "uploading" : "error",
        file: file,
        isCover: false,
      };

      if (isClientValid) {
        clientValidFiles.push(file);
      } else {
        setErrorMap((prev) => ({
          ...prev,
          [newItem.id]: "File quá lớn hoặc sai định dạng",
        }));
      }
      newItems.push(newItem);
    });

    setPhotos((prev) => {
      const combined = [...prev, ...newItems];
      const hasCover = combined.some((p) => p.isCover);
      if (!hasCover && combined.length > 0) {
        const firstValid = combined.find((p) => p.status !== "error");
        if (firstValid) firstValid.isCover = true;
      }
      return combined;
    });

    if (clientValidFiles.length === 0) return;

    const filesToCloudUpload: File[] = [];
    const validPhotoIds: string[] = [];

    const aiCheckPromises = clientValidFiles.map(async (file) => {
      const item = newItems.find((p) => p.file === file);
      if (!item) return;

      try {
        const result: AIAnalysisResult = await modelService.analyzeImage(file);

        if (result.is_valid) {
          filesToCloudUpload.push(file);
          validPhotoIds.push(item.id);
        } else {
          const errorMsg = getAIErrorMessage(result.reason, result.label);
          setErrorMap((prev) => ({ ...prev, [item.id]: errorMsg }));
          setPhotos((prev) => prev.map((p) => (p.id === item.id ? { ...p, status: "error" } : p)));
        }
      } catch (error) {
        console.error(`Model Check Error for file ${file.name}:`, error);
        filesToCloudUpload.push(file);
        validPhotoIds.push(item.id);
      }
    });

    await Promise.all(aiCheckPromises);

    if (filesToCloudUpload.length > 0) {
      const result = await uploadImages(filesToCloudUpload);

      if (result.success && result.data) {
        const serverResults = result.data;
        setPhotos((prev) => {
          return prev.map((p) => {
            const indexInBatch = validPhotoIds.indexOf(p.id);
            if (indexInBatch !== -1 && serverResults[indexInBatch]) {
              const resItem = serverResults[indexInBatch];
              const finalUrl = getCloudinaryUrl(resItem.url);
              return {
                ...p,
                status: "success",
                url: finalUrl,
                publicId: resItem.url,
              };
            }
            return p;
          });
        });
      } else {
        setPhotos((prev) =>
          prev.map((p) => {
            if (validPhotoIds.includes(p.id)) {
              setErrorMap((prevMap) => ({
                ...prevMap,
                [p.id]: "Lỗi upload server",
              }));
              return { ...p, status: "error" };
            }
            return p;
          })
        );
      }
    }
  };

  const removePhoto = (id: string, url: string) => {
    if (url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
    setPhotos((prev) => {
      const newList = prev.filter((p) => p.id !== id);
      const wasCover = prev.find((p) => p.id === id)?.isCover;
      if (wasCover && newList.length > 0) {
        const firstValid = newList.find((p) => p.status === "success" || p.status === "uploading");
        if (firstValid) firstValid.isCover = true;
      }
      return newList;
    });
    setErrorMap((prev) => {
      const newMap = { ...prev };
      delete newMap[id];
      return newMap;
    });
  };

  const setCover = (id: string) => {
    setPhotos((prev) => prev.map((p) => ({ ...p, isCover: p.id === id })));
  };

  const handleRetry = async (e: React.MouseEvent, photo: PhotoItem) => {
    e.stopPropagation();
    if (!photo.file) return;

    setErrorMap((prev) => {
      const newMap = { ...prev };
      delete newMap[photo.id];
      return newMap;
    });

    setPhotos((prev) => prev.map((p) => (p.id === photo.id ? { ...p, status: "uploading" } : p)));

    try {
      try {
        const aiResult = await modelService.analyzeImage(photo.file);
        if (!aiResult.is_valid) {
          const errorMsg = getAIErrorMessage(aiResult.reason, aiResult.label);
          setErrorMap((prev) => ({ ...prev, [photo.id]: errorMsg }));
          setPhotos((prev) => prev.map((p) => (p.id === photo.id ? { ...p, status: "error" } : p)));
          return;
        }
      } catch (aiError) {
        console.error("Retry Model Check Error:", aiError);
      }

      const result = await uploadImages([photo.file]);

      if (result.success && result.data && result.data[0]) {
        const resItem = result.data[0];
        const finalUrl = getCloudinaryUrl(resItem.url) || resItem.url;
        setPhotos((prev) =>
          prev.map((p) =>
            p.id === photo.id
              ? {
                  ...p,
                  status: "success",
                  url: finalUrl,
                  publicId: resItem.url,
                }
              : p
          )
        );
      } else {
        setErrorMap((prev) => ({ ...prev, [photo.id]: "Lỗi upload server" }));
        setPhotos((prev) => prev.map((p) => (p.id === photo.id ? { ...p, status: "error" } : p)));
      }
    } catch (err) {
      setErrorMap((prev) => ({ ...prev, [photo.id]: "Lỗi xử lý" }));
      setPhotos((prev) => prev.map((p) => (p.id === photo.id ? { ...p, status: "error" } : p)));
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    e.target.value = "";
  };

  return {
    photos,
    errorMap,
    isDragging,
    progress,
    MAX_SIZE_MB,
    MAX_SIZE_BYTES,
    actions: {
      removePhoto,
      setCover,
      handleRetry,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      handleInputChange,
    },
  };
};
