import { Icon } from "@iconify/react";
import { HeaderSticky } from "../components/HomePageComponents/HeaderSticky";
import { InputPublicar } from "../components/HomePageComponents/InputPublicar";
import { PublicacionCard } from "../components/HomePageComponents/PublicacionCard";
import { FormPost } from "../components/Forms/FormPost";
import { Toaster } from "sonner";
import { useMostrarPostQuery } from "../stack/PostStack";
import { useEffect, useRef } from "react";
import { SpinnerLocal } from "../components/ui/spinners/SpinnerLocal";
import { usePostStore } from "../store/PostStore";
import { useSupabaseSubscription } from "../Hooks/useSupabaseSubscription";
import { ComentarioModal } from "../components/HomePageComponents/ComentarioModal";

export const HomePage = () => {
  const { stateForm, setStateForm } = usePostStore();
  const {
    data: dataPost,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingPost,
  } = useMostrarPostQuery();
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    const handleScroll = () => {
      if (
        el.scrollTop + el.clientHeight >= el.scrollHeight - 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useSupabaseSubscription({
    channelName: "public:publicaciones",
    options: { event: "*", schema: "public", table: "publicaciones" },
    querykey: ["mostrar post"],
  });
  return (
    <main className="flex min-h-screen bg-white dark:bg-bg-dark max-w-[1200px] mx-auto">
      {stateForm && <FormPost></FormPost>}
      <Toaster richColors></Toaster>
      <section className="flex flex-col w-full h-screen">
        <article className="flex flex-col h-screen overflow-hidden border border-gray-200 border-t-0 border-b-0 dark:border-gray-600">
          <HeaderSticky></HeaderSticky>
          <div ref={scrollRef} className="overflow-y-auto">
            <InputPublicar></InputPublicar>
            {isLoadingPost && (
              <div className="h-[60vh] flex items-center justify-center">
                <SpinnerLocal />
              </div>
            )}
            {dataPost?.pages?.map((page, pageIndex) =>
              page?.map((item, index) => (
                <PublicacionCard
                  key={`${pageIndex} - ${index}`}
                  item={item}
                ></PublicacionCard>
              )),
            )}
            {isFetchingNextPage && <SpinnerLocal></SpinnerLocal>}
          </div>
        </article>
        <article>Sidebar derecho</article>
      </section>
      <ComentarioModal></ComentarioModal>
    </main>
  );
};
