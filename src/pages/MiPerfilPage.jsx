import { useMostrarUsuarioAuthQuery } from "../stack/UsuariosStack";
import { useUsuariosStore } from "../store/UsuariosStore";

export const MiPerfilPage = () => {
  const { dataUsuarioAuth } = useUsuariosStore();
  return (
    <div className="h-screen bg-amber-300 text-black">
      <h1>MiPerfilPage</h1>
      <span>Uusario: {dataUsuarioAuth?.nombre} </span>
    </div>
  );
};
