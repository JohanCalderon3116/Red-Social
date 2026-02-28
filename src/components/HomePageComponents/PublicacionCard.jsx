import { Icon } from "@iconify/react";

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
          <span className="text-gray-500 text-sm whitespace-nowrap">Hace 8 horas</span>
          <button>
            <Icon icon="tabler:dots-filled" width="24" height="24" />
          </button>
        </div>
      </div>
    </div>
  );
};
