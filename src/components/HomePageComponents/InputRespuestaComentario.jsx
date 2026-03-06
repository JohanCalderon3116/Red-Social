import { useEffect, useRef, useState } from "react";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { useInsertarRespuestaComentarioMutate } from "../../stack/RespuestasComentariosStack";
import { Icon } from "@iconify/react";
import EmojiPicker from "emoji-picker-react";
import { useRespuestasComentariosStore } from "../../store/RespuestasComentariosStore";

export const InputRespuestaComentario = () => {
  const { dataUsuarioAuth } = useUsuariosStore();
  const { mutate: comentarioMutate } = useInsertarRespuestaComentarioMutate();
  const [comentario, setComentario] = useState("");
  const { setRespuesta } = useRespuestasComentariosStore();
  const textComentarioRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef(null);
  const addEmoji = (emojiData) => {
    const emojiChar = emojiData.emoji;
    const textarea = textComentarioRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const originalText = textarea.value;

    const newText =
      originalText.substring(0, start) +
      emojiChar +
      originalText.substring(end);
    setShowEmojiPicker(false);
    setComentario(newText);
    setRespuesta(newText);
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
    <footer className="flex items-center gap-2 p-4 bg-white dark:bg-neutral-900 ">
      <section className="w-full gap-2 flex flex-col">
        <section className="flex w-full gap-4">
          <img
            src={dataUsuarioAuth?.foto_perfil}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            ref={textComentarioRef}
            placeholder="Escriba un comentario..."
            value={comentario}
            onChange={(e) => {
              setComentario(e.target.value);
              setRespuesta(e.target.value);
            }}
            type="text"
            className="flex-1 bg-gray-100 dark:bg-neutral-800 text-sm rounded-2xl px-4 py-2 focus:outline-none resize-none"
          />
          {showEmojiPicker && (
            <div
              className="absolute top-35 left-5 mt-2 transition duration-300 z-50 overflow-hidden"
              ref={pickerRef}
            >
              <EmojiPicker
                theme="auto"
                onEmojiClick={addEmoji}
                searchDisabled
              ></EmojiPicker>
            </div>
          )}
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-gray-500 hover:text-gray-700 relative cursor-pointer"
          >
            <Icon icon="line-md:emoji-smile-wink" width="24" height="24" />
          </button>
        </section>
        <section className="flex justify-end">
          <button
            onClick={() => comentarioMutate()}
            className="flex justify-end gap-1 px-4 py-2 rounded-full text-sm text-gray-500 cursor-not-allowed"
          >
            <Icon icon="line-md:external-link-rounded" width="24" height="24" />
            Publicar
          </button>
        </section>
      </section>
    </footer>
  );
};
