import { Icon } from "@iconify/react";
import { useRef } from "react";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";
import { useGlobalStore } from "../store/GlobalStore";

export const ImageSelectorFoto = () => {
  const { setFile, setFileUrl, fileUrl } = useGlobalStore();
  const fileInputRef = useRef(null);
  function openFileSelector() {
    fileInputRef.current.click();
  }
  const handleImageChanfge = async (e) => {
    const selectFile = e.target.files[0];
    if (!selectFile) return;
    if (!selectFile.type.startsWith("image/")) {
      alert("Solo se aceptan imagenes.");
      return;
    }
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(selectFile, options);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(compressedFile);
      setFile(compressedFile);
      fileReader.onload = () => {
        setFileUrl(fileReader.result);
      };
    } catch (error) {
      toast.error("Error al comprimir la imagen: ", error);
    }
  };
  return (
    <div className="text-center mb-5">
      <div className="relative inline-block">
        <img
          src={
            fileUrl != "-" ? fileUrl : "https://i.ibb.co/DfskQq2D/12225935.png"
          }
          alt="ImgSelected"
          className="w-20 h-20 rounded-lg object-cover transition-transform duration-300 hover:scale-105"
        />
        <button
          onClick={openFileSelector}
          className="absolute top-2 left-14 w-7 h-7 bg-neutral-800 hover:bg-neutral-600 text-white rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
        >
          <Icon icon="line-md:pencil-alt-twotone" width="24" height="24" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={handleImageChanfge}
        />
      </div>
    </div>
  );
};
