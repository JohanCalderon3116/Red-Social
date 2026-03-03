import { useEffect, useRef, useState } from "react";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { BtnClose } from "../ui/buttons/BtnClose";
import EmojiPicker from "emoji-picker-react";
import { Icon } from "@iconify/react";
import { ImageSelector } from "../../Hooks/useImageSelector";
export const FormPost = () => {
  const { dataUsuarioAuth } = useUsuariosStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareRef = useRef(null);
  const pickerRef = useRef(null);
  const [postText, setPostText] = useState("");
  const addEmoji = (emojiData) => {
    const emojiChar = emojiData.emoji;
    const textarea = textareRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const originalText = textarea.value;

    const newText =
      originalText.substring(0, start) +
      emojiChar +
      originalText.substring(end);

    setPostText(newText);
  };
  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  useEffect(() => {
    const hundleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target))
        //si estamos fuera del are como tal
        setShowEmojiPicker(false);
    };
    document.addEventListener("mousedown", hundleClickOutside);
    return () => document.removeEventListener("mousedown", hundleClickOutside);
  }, []);
  return (
    <section className="fixed z-50 flex items-center justify-center inset-0">
      <div className="absolute backdrop-blur-sm cursor-pointer inset-0"></div>
      <section className="bg-white relative w-full md:max-w-md text-black dark:bg-bg-dark dark:text-white rounded-lg shadow-xl ml-5 mr-5 ">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b rounded-lg border-gray-500/40">
          <h2 className="text-xl font-semibold">Crear publicación</h2>
          <BtnClose></BtnClose>
        </header>
        {/* User infor */}
        <main className="p-4 space-y-4">
          <section className="flex items-center gap-1">
            <img
              className="w-10 h-10 rounded-full mr-3 object-cover"
              src={dataUsuarioAuth?.foto_perfil}
            ></img>
            <div>
              <span className="font-medium"> {dataUsuarioAuth.nombre} </span>
            </div>
          </section>
          <form action="">
            <div className="relative">
              <textarea
                ref={textareRef}
                value={postText}
                onChange={handleTextChange}
                placeholder="¿Qué estás pensando?"
                className="w-full placeholder-gray-500 outline-none"
              ></textarea>
              {showEmojiPicker && (
                <div
                  className="absolute top-10 left-10 mt-2 transition duration-300"
                  ref={pickerRef}
                >
                  <EmojiPicker
                    theme="auto"
                    onEmojiClick={addEmoji}
                    searchDisabled
                  ></EmojiPicker>
                </div>
              )}
              <div className="mt-4 flex items-center justify-between">
                <button
                  className="py-2 px-4 rounded-lg font-medium bg-violet-700 cursor-pointer"
                  type="submit"
                >
                  Publicar
                </button>
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  type="button"
                  className="p-1 text-black/50 dark:text-white/50 hover:bg-gray-700 rounded-full cursor-pointer transition duration-300"
                >
                  <Icon
                    icon="line-md:emoji-smile-wink"
                    width="24"
                    height="24"
                  />
                </button>
              </div>
            </div>
          </form>
          <ImageSelector></ImageSelector>
        </main>
        <footer className="p-4 border-t border-gray-500/40">
          <div className="flex items-center justify-between p-3 border border-gray-500/40 rounded-lg">
            <span>Agregar a tu publicación</span>
            <div className="flex space-x-4">
              <button className="p-1 rounded-full text-black/50 dark:text-white/50 hover:bg-gray-200 dark:hover:bg-gray-700">
                <Icon icon="line-md:image" width="24" height="24" />
              </button>
            </div>
          </div>
        </footer>
        <footer></footer>
      </section>
    </section>
  );
};
