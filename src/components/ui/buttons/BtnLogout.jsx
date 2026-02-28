import { Icon } from "@iconify/react";

export const BtnLogout = () => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary/20 transition-all  justify-center sm:justify-start  cursor-pointer">
      <Icon icon="line-md:logout" width="24" height="24" />
      <span className="hidden sm:block ">Cerrar sesión</span>
    </div>
  );
};
