import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  ChangeEvent,
  PointerEvent,
  RefObject,
  SyntheticEvent,
} from "react";

const CROP_SIZE = 320;
const OUTPUT_SIZE = 1080;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

type CropNatural = {
  width: number;
  height: number;
};

export type ImageCropController = {
  fileInputRef: RefObject<HTMLInputElement | null>;
  newImageDataUrl: string;
  newImageName: string;
  imageError: string | null;
  rawImageDataUrl: string;
  isCropping: boolean;
  cropScale: number;
  cropBaseScale: number;
  cropX: number;
  cropY: number;
  cropSize: number;
  handleSelectImage: (event: ChangeEvent<HTMLInputElement>) => void;
  clearSelectedImage: () => void;
  updateZoom: (nextScale: number) => void;
  handleImageLoaded: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
  handleCropPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  handleCropPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  handleCropPointerUp: (event: PointerEvent<HTMLDivElement>) => void;
  applyCrop: () => Promise<void>;
  reset: () => void;
};

export const useImageCrop = (): ImageCropController => {
  const [newImageDataUrl, setNewImageDataUrl] = useState("");
  const [newImageName, setNewImageName] = useState("");
  const [imageError, setImageError] = useState<string | null>(null);
  const [rawImageDataUrl, setRawImageDataUrl] = useState("");
  const [isCropping, setIsCropping] = useState(false);
  const [cropScale, setCropScale] = useState(1);
  const [cropBaseScale, setCropBaseScale] = useState(1);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropNatural, setCropNatural] = useState<CropNatural>({
    width: 0,
    height: 0,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  const clampOffsets = useCallback(
    (x: number, y: number, scale: number) => {
      const displayW = cropNatural.width * scale;
      const displayH = cropNatural.height * scale;
      const minX = CROP_SIZE - displayW;
      const minY = CROP_SIZE - displayH;
      const clampedX = Math.min(0, Math.max(minX, x));
      const clampedY = Math.min(0, Math.max(minY, y));
      return { x: clampedX, y: clampedY };
    },
    [cropNatural.height, cropNatural.width]
  );

  const initializeCrop = useCallback((naturalW: number, naturalH: number) => {
    if (!naturalW || !naturalH) return;

    const base = Math.max(CROP_SIZE / naturalW, CROP_SIZE / naturalH);
    const displayW = naturalW * base;
    const displayH = naturalH * base;
    const startX = (CROP_SIZE - displayW) / 2;
    const startY = (CROP_SIZE - displayH) / 2;

    setCropNatural({ width: naturalW, height: naturalH });
    setCropBaseScale(base);
    setCropScale(1);
    setCropX(startX);
    setCropY(startY);
  }, []);

  const handleSelectImage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setImageError("Please select an image file.");
        return;
      }

      const maxMb = 5;
      if (file.size > maxMb * 1024 * 1024) {
        setImageError(`Image must be under ${maxMb}MB.`);
        return;
      }

      if (rawImageDataUrl.startsWith("blob:")) {
        URL.revokeObjectURL(rawImageDataUrl);
      }

      setImageError(null);
      setNewImageName(file.name);
      const objectUrl = URL.createObjectURL(file);
      setRawImageDataUrl(objectUrl);
      setIsCropping(true);
      setCropScale(1);
      setCropBaseScale(1);
      setCropX(0);
      setCropY(0);
      setCropNatural({ width: 0, height: 0 });
    },
    [rawImageDataUrl]
  );

  const clearSelectedImage = useCallback(() => {
    if (rawImageDataUrl.startsWith("blob:")) {
      URL.revokeObjectURL(rawImageDataUrl);
    }
    setNewImageDataUrl("");
    setNewImageName("");
    setImageError(null);
    setRawImageDataUrl("");
    setIsCropping(false);
    setCropScale(1);
    setCropBaseScale(1);
    setCropX(0);
    setCropY(0);
    setCropNatural({ width: 0, height: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [rawImageDataUrl]);

  const handleImageLoaded = useCallback(
    (event: SyntheticEvent<HTMLImageElement, Event>) => {
      const img = event.currentTarget;
      initializeCrop(img.naturalWidth, img.naturalHeight);
    },
    [initializeCrop]
  );

  useEffect(() => {
    if (!rawImageDataUrl) return;
    const img = new Image();
    img.onload = () => initializeCrop(img.naturalWidth, img.naturalHeight);
    img.src = rawImageDataUrl;
    return () => {
      if (rawImageDataUrl.startsWith("blob:")) {
        URL.revokeObjectURL(rawImageDataUrl);
      }
    };
  }, [initializeCrop, rawImageDataUrl]);

  const handleCropPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (activePointerIdRef.current !== null) return;
      event.preventDefault();
      activePointerIdRef.current = event.pointerId;
      event.currentTarget.setPointerCapture(event.pointerId);
      dragRef.current.isDragging = true;
      dragRef.current.startX = event.clientX;
      dragRef.current.startY = event.clientY;
      dragRef.current.originX = cropX;
      dragRef.current.originY = cropY;
    },
    [cropX, cropY]
  );

  const handleCropPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!dragRef.current.isDragging) return;
      if (activePointerIdRef.current !== event.pointerId) return;
      const dx = event.clientX - dragRef.current.startX;
      const dy = event.clientY - dragRef.current.startY;
      const scale = cropBaseScale * cropScale;
      const next = clampOffsets(
        dragRef.current.originX + dx,
        dragRef.current.originY + dy,
        scale
      );
      setCropX(next.x);
      setCropY(next.y);
    },
    [clampOffsets, cropBaseScale, cropScale]
  );

  const handleCropPointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (activePointerIdRef.current !== event.pointerId) return;
      dragRef.current.isDragging = false;
      activePointerIdRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
    },
    []
  );

  const updateZoom = useCallback(
    (nextScale: number) => {
      const currentScale = cropBaseScale * cropScale;
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextScale));
      const nextActual = cropBaseScale * next;

      if (!cropNatural.width || !cropNatural.height || !currentScale) {
        setCropScale(next);
        return;
      }

      const centerX = (CROP_SIZE / 2 - cropX) / currentScale;
      const centerY = (CROP_SIZE / 2 - cropY) / currentScale;
      const nextX = CROP_SIZE / 2 - centerX * nextActual;
      const nextY = CROP_SIZE / 2 - centerY * nextActual;
      const clamped = clampOffsets(nextX, nextY, nextActual);

      setCropScale(next);
      setCropX(clamped.x);
      setCropY(clamped.y);
    },
    [
      clampOffsets,
      cropBaseScale,
      cropNatural.height,
      cropNatural.width,
      cropScale,
      cropX,
      cropY,
    ]
  );

  const applyCrop = useCallback(async () => {
    if (!rawImageDataUrl) return;
    const img = new Image();
    img.src = rawImageDataUrl;

    await new Promise<void>((resolve) => {
      if (img.complete) return resolve();
      img.onload = () => resolve();
    });

    const actualScale = cropBaseScale * cropScale;
    const sx = Math.max(0, -cropX / actualScale);
    const sy = Math.max(0, -cropY / actualScale);
    const sWidth = CROP_SIZE / actualScale;
    const sHeight = CROP_SIZE / actualScale;

    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      img,
      sx,
      sy,
      sWidth,
      sHeight,
      0,
      0,
      OUTPUT_SIZE,
      OUTPUT_SIZE
    );

    const cropped = canvas.toDataURL("image/jpeg", 0.92);
    setNewImageDataUrl(cropped);
    setIsCropping(false);
  }, [cropBaseScale, cropScale, cropX, cropY, rawImageDataUrl]);

  const reset = useCallback(() => {
    setNewImageDataUrl("");
    setNewImageName("");
    setImageError(null);
    setRawImageDataUrl("");
    setIsCropping(false);
    setCropScale(1);
    setCropBaseScale(1);
    setCropX(0);
    setCropY(0);
    setCropNatural({ width: 0, height: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  return {
    fileInputRef,
    newImageDataUrl,
    newImageName,
    imageError,
    rawImageDataUrl,
    isCropping,
    cropScale,
    cropBaseScale,
    cropX,
    cropY,
    cropSize: CROP_SIZE,
    handleSelectImage,
    clearSelectedImage,
    updateZoom,
    handleImageLoaded,
    handleCropPointerDown,
    handleCropPointerMove,
    handleCropPointerUp,
    applyCrop,
    reset,
  };
};
