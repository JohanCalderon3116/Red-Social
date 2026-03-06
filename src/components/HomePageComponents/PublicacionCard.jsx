import { Icon } from "@iconify/react";
import { PostImageFrame } from "./PostImageFrame";
import { PostVideoFrame } from "./PostVideoFrame";
import { usePostStore } from "../../store/PostStore";
import { useLikePostMutate } from "../../stack/PostStack";
import { useComentariosStore } from "../../store/ComentariosStore";
import { useRelativeTime } from "../../Hooks/useRelativeTime";

export const PublicacionCard = ({ item }) => {
  const { setItemSelect } = usePostStore();
  const { mutate } = useLikePostMutate();
  const { setShowModal } = useComentariosStore();
  return (
    <div className="border-b border-gray-500/50 p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <img
            src={item?.foto_usuario}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="font-bold"> {item?.nombre_usuario} </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm whitespace-nowrap">
            {useRelativeTime(item?.fecha)}
          </span>
          <button>
            <Icon icon="tabler:dots-filled" width="24" height="24" />
          </button>
        </div>
      </div>
      <div className="mt-3">
        <p className="mb-2"> {item?.descripcion} </p>
        <div>
          {item?.url !== "-" &&
            (item?.type === "imagen" ? (
              <PostImageFrame src={item?.url}></PostImageFrame>
            ) : (
              <PostVideoFrame src={item?.url}></PostVideoFrame>
            ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              (setItemSelect(item), mutate());
            }}
          >
            <Icon
              icon={
                item?.like_usuario_actual
                  ? "line-md:heart-filled"
                  : "line-md:heart"
              }
              width="24"
              height="24"
              className={`text-3xl p-1 rounded-full ${item?.like_usuario_actual ? "text-violet-600" : " text-gray-400 hover:bg-[rgba(78,124,233,0.2)]"} cursor-pointer `}
            />
          </button>
          <button
            onClick={() => {
              (setItemSelect(item), setShowModal());
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Icon
              icon="line-md:chat"
              width="24"
              height="24"
              className="text-3xl p-1 rounded-full text-gray-400 cursor-pointer"
            />
            <span className="text-xs md:text-sm text-gray-400">Comentar</span>
          </button>
        </div>
        <div className=" flex gap-4 mt-1">
          {item?.likes > 0 && (
            <span className="text-xs text-gray-400">
              {" "}
              {item?.likes} me gusta
            </span>
          )}
          {item?.comentarios_count > 0 && (
            <span
              onClick={() => {
                (setItemSelect(item), setShowModal());
              }}
              className="text-xs text-gray-400 cursor-pointer hover:underline "
            >
              {" "}
              {item?.comentarios_count} Comentarios
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
