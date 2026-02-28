import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { BtnToggleTheme } from "../ui/buttons/BtnToggleTheme";
import { BtnLogout } from "../ui/buttons/BtnLogout";
import { BtnnNewPost } from "../ui/buttons/BtnnewPost";

export const Sidebar = () => {
  // CREACION DE OBJESTOS PARA NAVEGAR Y DE MAS

  const links = [
    {
      label: "Inicio",
      icon: "ic:baseline-home",
      to: "/",
    },
    {
      label: "Notificaciones",
      icon: "ic:baseline-notifications",
      to: "/notificaciones",
    },
    {
      label: "Mensajes",
      icon: "ic:baseline-message",
      to: "/mensajes",
    },
    {
      label: "Colecciones",
      icon: "ic:baseline-collections-bookmark",
      to: "/colecciones",
    },
    {
      label: "Suscripciones",
      icon: "ic:baseline-person",
      to: "/suscripciones",
    },
    {
      label: "Añadir tarjeta",
      icon: "ic:baseline-credit-card",
      to: "/tarjeta",
    },
    {
      label: "Mi perfil",
      icon: "ic:baseline-account-circle",
      to: "/miperil",
    },
  ];
  return (
    <div className="h-screen p-2 bg-white dark:bg-bg-dark transition-all duration-300 flex flex-col">
      {/* LOGO */}
      <div className=" h-8  w-8 flex justify-center items-center rounded-full bg-blue-100 text-primary font-bold text-xs p-2 m-2">SF</div>
      {/* NAVEGACION */}
      <nav className="flex-1 flex-col flex gap-2 items-center">
        {
            links.map((item, index) => {
                return(
                    <NavLink key={index} to={item.to} className={({isActive}) => `flex items-center gap-3 p-2 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-primary/10 dark:hover:text-primary transition-all w-full justify-center sm:justify-start 
                    ${
                        isActive ? "text-blue-600 dark:text-white" : "text-gray-600 dark:text-gray-400"
                    } `}>
                        <Icon icon={item.icon} width={24} height={24}></Icon>
                        <span className="hidden sm:block "> {item.label} </span>
                    </NavLink>
                )
            })
        }
      </nav>
      <BtnToggleTheme></BtnToggleTheme>
      <BtnLogout></BtnLogout>
      <BtnnNewPost></BtnnNewPost>
    </div>
  );
};
