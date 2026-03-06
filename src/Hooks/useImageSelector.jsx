import { useRef, useState } from "react";
import { usePostStore } from "../store/PostStore";
import imageCompression from "browser-image-compression";
import { Icon } from "@iconify/react";

export const useImageSelector = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const fileInputRef = useRef(null);
  const [isDragging, setIsGragging] = useState(false);
  const { setFile: setFilePost } = usePostStore();
  const openFileSelector = () => {
    fileInputRef.current?.click();
  };
  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const sizeMB = selectedFile.size / (1024 * 1024);

    const type = selectedFile.type;
    if (!type.startsWith("image/") && !type.startsWith("video/")) {
      alert("Solo se permiten imagenes y videos...");
      return;
    }
    if (type.startsWith("image/")) {
      if (sizeMB > 2) {
        alert("El archivo supera el limite de 8MB.");
        return;
      }
      try {
        const options = {
          maxSizeMB: sizeMB > 1 ? 0.1 : 0.2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(selectedFile, options);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => setFileUrl(reader.result);
        setFile(compressedFile);
        setFilePost(compressedFile);
        setFileType("image");
      } catch (error) {
        console.error("Error al comprimir la imagen: ", error);
        alert("Error al procesar la imagen.");
      }
    } else {
      const videoUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setFilePost(selectedFile);
      setFileUrl(videoUrl);
      setFileType("video");
    }
  };
  const removeImage = () => {
    setFile(null);
    setFileUrl("");
    setFileType("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsGragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsGragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsGragging(true);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsGragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;
    await handleImageChange({ target: { files: [droppedFile] } });
  };
  return {
    file,
    fileUrl,
    fileType,
    fileInputRef,
    handleImageChange,
    openFileSelector,
    removeImage,
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragOver,
  };
};

export const ImageSelector = () => {
  const { setStateImage } = usePostStore();
  const {
    file,
    fileUrl,
    fileType,
    fileInputRef,
    handleImageChange,
    openFileSelector,
    removeImage,
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragOver,
  } = useImageSelector();
  return (
    <section className="relative w-full max-w-md bg-[#E1E5EA] dark:bg-[#242526] border border-gray-500 rounded-lg shadow-xl overflow-hidden dark:text-white">
      <header className="relative h-12 flex items-center justify-center border-b border-gray-700">
        <h2>Agregar Fotos/Videos</h2>
        <button
          onClick={setStateImage}
          className="absolute right-4 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <Icon icon="line-md:close-circle-twotone" width="20" height="20" />
        </button>
      </header>
      <main
        className={`p-8 flex flex-col items-center justify-center min-h-[240px] transition-colors duration-300 ${isDragging ? "bg-gray-200 dark:bg-[#3a3b3c]"
      : "bg-gray-100 dark:bg-[#242526]"}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {fileUrl ? (
          <div className="relative inline-block group">
            {fileType === "image" ? (
              <img
                src={fileUrl}
                className="w-full max-w-[280px] max-h-[280px] rounded-lg object-contain transition-transform duration-300 group-hover:scale-[1.02] "
              ></img>
            ) : (
              <video
                controls
                src={fileUrl}
                className="w-full max-w-[280px] max-h-[280px] rounded-lg object-contain "
              ></video>
            )}
            <button
              onClick={removeImage}
              type="button"
              className="absolute top-2 right-2 w-8 h-8 bg-black rounded-full border-none cursor-pointer flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 hover:opacity-80"
            >
              <Icon
                icon="line-md:close-circle-twotone"
                width="20"
                height="20"
              />
            </button>
            <button
              type="button"
              onClick={openFileSelector}
              className="absolute bottom-2 right-2 w-8 h-8 bg-black rounded-full border-none cursor-pointer flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 hover:opacity-80"
            >
              <Icon icon="line-md:edit" width="24" height="24" />
            </button>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-[#E1E5EA] dark:bg-[#3a3b3c] flex items-center justify-center mb-4 ">
              <Icon icon="mingcute:video-line" width="24" height="24" />
            </div>
            <h3 className="dark:text-white text-lg font-medium mb-1">
              Agregar fotos/videos
            </h3>
            <p className="dark:text-gray-400 text-sm">Arrastra o suelta aquí</p>
            <button
              onClick={openFileSelector}
              className="mt-6 px-2 py-2 bg-violet-800 text-white rounded-lg hover:bg-violet-950 transition-colors duration-200 cursor-pointer"
            >
              Seleccionar archivos
            </button>
          </>
        )}
      </main>
      <input
        type="file"
        accept="image/*,video/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
    </section>
  );
};
