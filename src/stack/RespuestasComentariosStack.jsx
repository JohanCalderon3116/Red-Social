import { useMutation, useQuery } from "@tanstack/react-query";
import { useRespuestasComentariosStore } from "../store/RespuestasComentariosStore";
import { useFormattedDate } from "../Hooks/useFormattedDate";
import { useUsuariosStore } from "../store/UsuariosStore";
import { toast } from "sonner";
import { useComentariosStore } from "../store/ComentariosStore";

export const useInsertarRespuestaComentarioMutate = () => {
  const {
    insertarRespuestaComentarios,
    respuestaActivaParaComentarioId,
    respuesta,
    setRespuesta,
    limpiarRespuestaActiva,
  } = useRespuestasComentariosStore();
  const fechaActual = useFormattedDate();
  const { dataUsuarioAuth } = useUsuariosStore();
  return useMutation({
    mutationKey: ["insertar respuesta a comentario"],
    mutationFn: () =>
      insertarRespuestaComentarios({
        id_comentario: respuestaActivaParaComentarioId,
        comentario: respuesta,
        fecha: fechaActual,
        id_usuario: dataUsuarioAuth?.id,
      }),
    onError: (error) => {
      toast.error(`Error: ${error.message} 🫠💥`);
    },
    onSuccess: () => {
      toast.success("Todo salio bien 🥴😏");
      setRespuesta("");
      limpiarRespuestaActiva();
    },
  });
};

export const useMostrarRespuestaComentarioQuery = () => {
  const { mostrarRespuestaAComentario } = useRespuestasComentariosStore();
  const { itemSelect } = useComentariosStore();
  return useQuery({
    queryKey: [
      "mostrar respuesta comentarios",
      { id_comentario: itemSelect?.id },
    ],
    queryFn: () =>
      mostrarRespuestaAComentario({ id_comentario: itemSelect?.id }),
    enabled: !!itemSelect,
  });
};
