import { Icon } from "@iconify/react";

export const BtnnNewPost = () => {
  return (
    <div className="mt-4 flex  justify-center sm:justify-start  bg-violet-600 hover:bg-violet-600/80 cursor-pointer font-semibold p-2 rounded-full items-center gap-2 transition px-4 mb-4">
      <Icon icon="line-md:plus-circle-filled" width="24" height="24" />
      <span className="hidden sm:block">Nueva Publicación</span>
    </div>
  );
};
