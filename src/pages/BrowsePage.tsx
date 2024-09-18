/** Local */
import { useAppSelector, useAppDispatch } from "@/store/hooks.ts";
import { setIsLoading } from "@/store/slices/app.ts";

/** Blocks */
import { PageWrapper } from "@/components/blocks/PageWrapper.tsx";

/** Component */
const BrowsePage = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.app.username);

  setTimeout(() => {
    dispatch(setIsLoading(false));
  }, 1000);

  /** Markup */
  return (
    <PageWrapper>
      <h1>Browse Page</h1>
      <p>Welcome {username}</p>
    </PageWrapper>
  );
};

export { BrowsePage };
