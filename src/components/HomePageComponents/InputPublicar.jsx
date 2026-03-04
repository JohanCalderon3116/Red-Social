import { Icon } from "@iconify/react";
import { usePostStore } from "../../store/PostStore";

export const InputPublicar = () => {
  const {setStateForm} = usePostStore()
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-600">
        <input onClick={setStateForm} value={""} placeholder="Escribir nueva publicación..." type="text" className="w-full p-2 rounded focus:outline-none placeholder:text-gray-500 dark:placeholder: text-gray-500"/>
        <div className="flex gap-4 mt-2 text-gray-400">
            <Icon icon="jam:picture-f" width="24" height="24" />
            <Icon icon="line-md:list-3-twotone" width="24" height="24" />
            <Icon icon="mage:gif-fill" width="24" height="24" />
        </div>
    </div>
  );
};
