import { RingLoader } from "react-spinners";

export const SpinnerLocal = () => {
  return (
    <div className="h-full flex justify-center items-center p-6">
      <RingLoader
        color={
          document.documentElement.classList.contains("dark")
            ? "#ffffff"
            : "#000000"
        }
      ></RingLoader>
    </div>
  );
};
