import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import { data } from "react-router-dom";

const tabla = "publicaciones";
const InsertarPost = async (p, file) => {
  const { data, error } = await supabase
    .from(tabla)
    .insert(p)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  if (file) {
    const nuevo_id = data?.id;
    const urlimagen = await subirArchivos(nuevo_id, file);
    const pUrl = {
      url: urlimagen.publicUrl,
      id: nuevo_id,
    };
    await editarPublicacion(pUrl);
  }
};

const editarPublicacion = async (p) => {
  const { error } = await supabase.from(tabla).update(p).eq("id", p.id);
  if (error) {
    throw new Error(error.message);
  }
};

const subirArchivos = async (id, file) => {
  const ruta = "publicaciones/" + id;
  const { data, error } = await supabase.storage
    .from("archivos")
    .upload(ruta, file, {
      cacheControl: "0",
      upsert: true,
    });
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    const { data: urlimagen } = await supabase.storage
      .from("archivos")
      .getPublicUrl(ruta);
    return urlimagen;
  }
};
export const usePostStore = create((set) => ({
  itemSelect: null,
  setItemSelect: (p) => set({ itemSelect: p }),
  file: null,
  setFile: (p) => set({ file: p }),
  stateImage: false,
  setStateImage: () => {
    set((state) => ({ stateImage: !state.stateImage }));
  },
  stateForm: false,
  setStateForm: () => {
    set((state) => ({ stateForm: !state.stateForm }));
  },
  insertarPost: async (p, file) => {
    await InsertarPost(p, file);
  },
  dataPost: null,
  mostrarPost: async (p) => {
    const { data, error } = await supabase
      .rpc("publicaciones_con_detalles", {
        _id_usuario: p.id_usuario,
      })
      .range(p.desde, p.desde + p.hasta - 1);
    if (error) {
      throw new Error(error.message);
    }
    set({ dataPost: data });
    return data;
  },
  likePost: async (p) => {
    const { error } = await supabase.rpc("toggle_like", p);
    if (error) {
      throw new Error(error.message);
    }
  },
}));
