import { useRef, useState } from "react";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { BtnClose } from "../ui/buttons/BtnClose";
import EmojiPicker from "emoji-picker-react";
import { Icon } from "@iconify/react";
export const FormPost = () => {
  const { dataUsuarioAuth } = useUsuariosStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareRef = useRef(null);
  const [postTecxt, setPosText] = useState("");
  const addEmoji = (emojiData) => {
    const emojiChar = emojiData.emoji;
    const textarea = textareRef.current;
    const etart = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
  };
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
                placeholder="¿Qué estás pensando?"
                className="w-full placeholder-gray-500 outline-none"
              ></textarea>
              {showEmojiPicker && (
                <div className="absolute top-10 left-10 mt-2 transition duration-300">
                  <EmojiPicker
                    theme="auto"
                    onEmojiClick={addEmoji}
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
        </main>
        <footer></footer>
      </section>
    </section>
  );
};
