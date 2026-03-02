import { useUsuariosStore } from "../../store/UsuariosStore";
import { BtnClose } from "../ui/buttons/BtnClose";

export const FormPost = () => {
  const { dataUsuarioAuth } = useUsuariosStore();
  return (
    <main className="fixed z-50 flex items-center justify-center inset-0">
      <div className="absolute backdrop-blur-sm cursor-pointer inset-0"></div>
      <section className="bg-white relative w-full md:max-w-md text-black dark:bg-bg-dark dark:text-white rounded-lg shadow-xl ml-5 mr-5 ">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b rounded-lg border-gray-500/40">
          <h2 className="text-xl font-semibold">Crear publicación</h2>
          <BtnClose></BtnClose>
        </header>
        {/* User infor */}
        <article>
          <img
            className="w-10 h-10 rounded-full mr-3 object-cover"
            src={dataUsuarioAuth?.foto_perfil}
          ></img>
        </article>
      </section>
    </main>
  );
};
