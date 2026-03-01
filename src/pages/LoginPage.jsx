import { BtnToggleTheme } from "../components/ui/buttons/BtnToggleTheme";
import logo from "../assets/Logo.png";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useGenerarCodigosAleatorios } from "../Hooks/useGenerarCodigosAleatorios";
import { useAuthStore } from "../store/AuthStore";
import { useCrearUsuarioYSesionMutate } from "../stack/LoginStack";
import { Toaster } from "sonner";
import { useForm } from "react-hook-form";
export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setCredenciales } = useAuthStore();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const togglePaswwordVisibiliry = () => {
    setShowPassword(!showPassword);
  };
  const { handleSubmit } = useForm();
  const { isPending, mutate } = useCrearUsuarioYSesionMutate();
  useEffect(() => {
    const response = useGenerarCodigosAleatorios();
    const correoCompleto = response + "@gmail.com";
    setCredenciales({ email: correoCompleto, password: response });
    setEmail(correoCompleto);
    setPassword(response);
  }, []);
  return (
    <main className="flex h-screen w-full transition duration-300">
      <Toaster richColors></Toaster>
      {/* Lado izquierdo formularios  */}
      <section className=" hidden md:flex md:w-1/2 bg-[#E1E5EA]  ] text-black flex-col dark:bg-[#030305]  dark:text-white justify-center items-center overflow-hidden transition duration-300">
        <div className="px-8 text-center">
          <div className=" flex items-center gap-3 mb-3 justify-center">
            <img
              src={logo}
              alt=""
              className="h-15 w-15 object-cover rounded-2xl"
            />
            <span className="text-4xl font-bold text-black dark:text-white">
              Soft<span className="dark:text-white text-black">Social</span>
            </span>
          </div>
          <span className="font-semibold mt-2 dark:text-white text-black">
            "Donde las ideas se vuelven reales." <br />
            La red para compartir, debatir y crear sin límites.
          </span>
        </div>
      </section>
      {/* Lado derecho informacion */}
      <section className="bg-white dark:text-white w-screen dark:bg-[#090909]  text-black md:1/2 transition duration-300 flex items-center justify-center px-6 md:px-16 py-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-medium mb-6 text-center">
            Iniciar sesión{" "}
            <span className="text-xl dark:text-[#E1E5EA] text-[#090909]">
              (modo invitado)
            </span>
          </h1>
          <form onSubmit={handleSubmit(mutate)}>
            <div className="mb-4">
              <input
                placeholder="Correo"
                value={email}
                type="text"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2  dark:placeholder:text-[#E1E5EA] placeholder:text-[#090909] transition duration-300"
              />
            </div>
            <div className="mb-4 relative">
              <input
                placeholder="Contraseña"
                value={password}
                type={showPassword ? "password" : "text"}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 dark:placeholder:text-[#E1E5EA] placeholder:text-[#090909] transition duration-300"
              />
              <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 cursor-pointer "
                onClick={togglePaswwordVisibiliry}
              >
                <Icon
                  icon={showPassword ? "line-md:watch-off" : "line-md:watch"}
                  width="24"
                  height="24"
                />
              </button>
            </div>
            <button
              disabled={isPending}
              type="submit"
              className="w-full bg-[#202531] dark:text-black text-white dark:bg-gray-200 font-medium py-3 rounded-full hover:bg-[#4E5768] dark:hover:bg-[#A8AFBD] hover:transition hover:duration-300 cursor-pointer "
            >
              Iniciar sesión
            </button>
          </form>
          <div className="mt-4 text-xs text-center transition duration-300">
            Al iniciar sesion y usar SoftSocial, aceptas nuestros terminos
            <a href="#" className="dark:text-violet-600 text-violet-400">
              {" "}
              Terminos de servicio{" "}
            </a>
            y
            <a href="#" className="dark:text-violet-600 text-violet-400">
              {" "}
              Política de privacidad{" "}
            </a>
            y confirmas que tienes almenos 18 años.
          </div>
          <div className="mt-6 text-center transition duration-300">
            <a href="#" className="dark:text-violet-600 text-violet-400">
              {" "}
              ¿Has olvidado tú cintraseña?{" "}
            </a>
            <div className="mt-1">
              <a href="#" className="dark:text-violet-600 text-violet-400">
                {" "}
                Registrate para SoftSocial{" "}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="flex absolute right-4 bottom-2 text-black dark:text-white">
        <BtnToggleTheme></BtnToggleTheme>
      </div>
    </main>
  );
};
