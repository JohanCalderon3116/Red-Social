import { Icon } from "@iconify/react";
import { BtnClose } from "../ui/buttons/BtnClose";
import {
  useInsertarComentarioMutate,
  useMostrarComentariosQuery,
} from "../../stack/ComentariosStack";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useComentariosStore } from "../../store/ComentariosStore";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { usePostStore } from "../../store/PostStore";
import { SpinnerLocal } from "../ui/spinners/SpinnerLocal";
import { ComentarioCard } from "./ComentarioCard";

export const ComentarioModal = ({}) => {
  const [comentario, setComentario] = useState("");
  const { itemSelect: item } = usePostStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef(null);
  const textComentarioRef = useRef(null);
  const { setShowModal } = useComentariosStore();
  const { dataUsuarioAuth } = useUsuariosStore();
  const { data: dataComentarios, isLoading: isLoadingComentarios } =
    useMostrarComentariosQuery();
  const { mutate: comentarioMutate } = useInsertarComentarioMutate({
    comentario: comentario,
    setComentario: setComentario,
  });
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
    <main className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <section className="dark:bg-neutral-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl flex flex-col relative bg-white">
        <header className="h-25 sticky p-4 border-b border-gray-400/20">
          <div className="flex items-center gap-3 text-black dark:text-white">
            <img
              src={item?.foto_perfil}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex items-center gap-2">
              <span className="font-bold lg:max-w-none lg:overflow-visible md:text-ellipsis max-w-[200px] truncate whitespace-nowrap overflow-hidden ">
                {item?.nombre_usuario}
              </span>
            </div>
          </div>
          <span> {item?.descripcion} </span>
          <BtnClose funcion={setShowModal}></BtnClose>
        </header>
        <section className="p-4 overflow-y-auto flex-1">
          {isLoadingComentarios ? (
            <SpinnerLocal></SpinnerLocal>
          ) : (
            dataComentarios?.length > 0 && dataComentarios.map((item, index)=> {
              return (
                <ComentarioCard item={item} key={index}></ComentarioCard>
              )
            })
          )}
        </section>
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
                onChange={(e) => setComentario(e.target.value)}
                type="text"
                className="flex-1 bg-gray-100 dark:bg-neutral-800 text-sm rounded-2xl px-4 py-2 focus:outline-none resize-none"
              />
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
                <Icon
                  icon="line-md:external-link-rounded"
                  width="24"
                  height="24"
                />
                Publicar
              </button>
            </section>
          </section>
        </footer>
      </section>
    </main>
  );
};
