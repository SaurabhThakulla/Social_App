import { Button } from "@/components/ui/button";
import type { ImageCropController } from "@/hooks/useImageCrop";

type CropModalProps = {
  crop: ImageCropController;
};

const CropModal = ({ crop }: CropModalProps) => {
  if (!crop.isCropping || !crop.rawImageDataUrl) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-dark-2 border border-dark-4 rounded-2xl p-5 w-[460px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="base-semibold">Crop Photo</h3>
          <span className="text-xs text-light-4">Drag to reposition</span>
        </div>
        <div className="flex justify-center mb-4">
          <div
            className="relative overflow-hidden rounded-xl bg-black border border-white/10"
            style={{ width: crop.cropSize, height: crop.cropSize, touchAction: "none" }}
            onPointerDown={crop.handleCropPointerDown}
            onPointerMove={crop.handleCropPointerMove}
            onPointerUp={crop.handleCropPointerUp}
            onPointerLeave={crop.handleCropPointerUp}
          >
            <img
              src={crop.rawImageDataUrl}
              onLoad={crop.handleImageLoaded}
              style={{
                position: "absolute",
                transform: `translate(${crop.cropX}px, ${crop.cropY}px) scale(${crop.cropBaseScale * crop.cropScale})`,
                transformOrigin: "top left",
                userSelect: "none",
                cursor: "grab",
              }}
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 border border-white/20 rounded-xl" />
              <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/15" />
              <div className="absolute top-0 bottom-0 left-2/3 w-px bg-white/15" />
              <div className="absolute left-0 right-0 top-1/3 h-px bg-white/15" />
              <div className="absolute left-0 right-0 top-2/3 h-px bg-white/15" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs text-light-4 w-12">Zoom</span>
          <Button
            type="button"
            onClick={() => crop.updateZoom(crop.cropScale - 0.1)}
            className="bg-dark-3 hover:bg-dark-4 h-8 w-8 p-0"
          >
            -
          </Button>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={crop.cropScale}
            onChange={(event) => crop.updateZoom(Number(event.target.value))}
            className="w-full"
          />
          <Button
            type="button"
            onClick={() => crop.updateZoom(crop.cropScale + 0.1)}
            className="bg-dark-3 hover:bg-dark-4 h-8 w-8 p-0"
          >
            +
          </Button>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={crop.clearSelectedImage}
            className="bg-dark-3 hover:bg-dark-4"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={crop.applyCrop}
            className="shad-button_primary"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CropModal;
