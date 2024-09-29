/** Local */
import { useAppSelector, useAppDispatch } from "@/store/hooks.ts";

/** Blocks */
import { PageWrapper } from "@/components/blocks/PageWrapper.tsx";
import { Header } from "@/components/blocks/Header.tsx";
import { Heading } from "@/components/ui/Heading.tsx";

/** Component */
const MovieDetailPage = () => {
  /** Markup */
  return (
    <>
      <Header />
      <PageWrapper disablePaddingTop usedWithHeader>
        <Heading type="h2">Movie detail page</Heading>
      </PageWrapper>
    </>
  );
};

export { MovieDetailPage };
