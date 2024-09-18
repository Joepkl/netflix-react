/** Local */
import { useAppDispatch } from "@/store/hooks.ts";
import { setIsLoading } from "@/store/slices/app.ts";

/** Blocks */
import { PageWrapper } from "@/components/blocks/PageWrapper.tsx";
import { Header } from "@/components/blocks/Header.tsx";

/** Component */
const BrowsePage = () => {
  const dispatch = useAppDispatch();

  setTimeout(() => {
    dispatch(setIsLoading(false));
  }, 1000);

  /** Markup */
  return (
    <>
      <Header />
      <PageWrapper disablePaddingTop>
        <h2 className="pb-[800px]">Browse page</h2>
      </PageWrapper>
    </>
  );
};

export { BrowsePage };
