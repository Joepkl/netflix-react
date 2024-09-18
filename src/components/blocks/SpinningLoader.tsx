/** Local */
import { useAppSelector } from "@/store/hooks.ts";

/** Component */
const SpinningLoader = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  /** Markup */
  return (
    <>
      {isLoading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999]">
          <span className="w-12 h-12 border-4 border-red-main border-b-transparent rounded-full inline-block animate-spin"></span>
        </div>
      )}
    </>
  );
};

export { SpinningLoader };
