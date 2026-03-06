import { useRelativeTime } from "../../Hooks/useRelativeTime";
import { useMostrarRespuestaComentarioQuery } from "../../stack/RespuestasComentariosStack";
import { useComentariosStore } from "../../store/ComentariosStore";
import { useRespuestasComentariosStore } from "../../store/RespuestasComentariosStore";
import { InputRespuestaComentario } from "./InputRespuestaComentario";
import { RespuestaCard } from "./RespuestaCard";

export const ComentarioCard = ({ item }) => {
  const {
    respuestaActivaParaComentarioId,
    setRespuestaActiva,
    limpiarRespuestaActiva,
    dataRepuestaComentario,
  } = useRespuestasComentariosStore();
  const { setItemSelect, itemSelect: itemSelectComentario } =
    useComentariosStore();
  return (
    <div className="pl-4">
      <div className="flex items-start gap-2 group relative w-full">
        <img
          src={item?.foto_usario}
          alt=""
          className="w-9 h-9 rounded-full object-cover"
        />
        <div className="flex-1  relative">
          <div className="relative bg-gray-100 dark:bg-neutral-800 p-2 rounded-xl text-sm w-fit max-w-[90%] flex gap-2">
            <section>
              <span className="font-semibold block text-xs">
                {item?.nombre_usuario}
              </span>
              <p> {item?.comentario} </p>
            </section>
          </div>
          <div className="flex gap-3 mt-1 text-xs text-gray-500 ml-2 relative">
            <span> {useRelativeTime(item?.fecha)} </span>
            <button
              onClick={() =>
                respuestaActivaParaComentarioId === item?.id
                  ? limpiarRespuestaActiva()
                  : setRespuestaActiva(item?.id)
              }
              className="hover:underline cursor-pointer"
            >
              {respuestaActivaParaComentarioId === item?.id
                ? "Cancelar"
                : "Responder"}
            </button>
          </div>
          {item?.respuestas_count > 0 && (
            <button
              className="text-gray-400 mt-2 text-xs hover:underline cursor-pointer"
              onClick={()=> setItemSelect(
                itemSelectComentario?.id === item?.id ? null : item,
              )}
            >
              {item?.respuestas_count === 1
                ? `Ver la ${item?.respuestas_count} respuesta`
                : `Ver las ${item?.respuestas_count} respuestas`}
            </button>
          )}
          {itemSelectComentario?.id === item?.id &&
            dataRepuestaComentario?.map((item, index) => {
              return <RespuestaCard item={item} key={index}></RespuestaCard>;
            })}
          {respuestaActivaParaComentarioId === item?.id && (
            <div>
              <div className="w-4 h-4 border-l-2 border-b-2 border-gray-300 dark:border-gray-600 rounded-bl-[8px] absolute bottom-18 -ml-[29px] "></div>
              <InputRespuestaComentario></InputRespuestaComentario>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
