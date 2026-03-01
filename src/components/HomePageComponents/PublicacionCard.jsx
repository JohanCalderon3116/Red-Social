import { Icon } from "@iconify/react";
import { PostImageFrame } from "./PostImageFrame";

export const PublicacionCard = () => {
  return (
    <div className="border-b border-gray-500/50 p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://external-preview.redd.it/fHHi65D3LkeoGXeQ23nOs9VFEqywjamVLw7DZs3Z0VA.jpg?width=640&crop=smart&auto=webp&s=5be6c11532404417b51f415dbed730ebd1039ffc"
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="font-bold">Nombre de usuario</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm whitespace-nowrap">
            Hace 8 horas
          </span>
          <button>
            <Icon icon="tabler:dots-filled" width="24" height="24" />
          </button>
        </div>
      </div>
      <div className="mt-3">
        <p className="mb-2">Titulo</p>
        <div>
          <PostImageFrame src={"https://m.media-amazon.com/images/M/MV5BNzU2ZjVmMTEtYTA4Mi00ZTQ0LWE0NzktNTRhZDUxYWMyY2FjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"}></PostImageFrame>
        </div>
        <div className="flex justify-between mt-4">
          <button>
            <Icon icon="line-md:heart" width="24" height="24" className="text-3xl p-1 rounded-full text-gray-400 hover:bg-[rgba(78,124,233,0.2)] cursor-pointer "/>
          </button>
          <button className="flex items-center gap-2 cursor-pointer">
            <Icon icon="line-md:chat" width="24" height="24" className="text-3xl p-1 rounded-full text-gray-400 cursor-pointer" />
            <span className="text-xs md:text-sm text-gray-400">Comentar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
