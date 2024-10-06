/** Local */
import { useAppSelector, useAppDispatch } from "@/store/hooks.ts";

/** Blocks */
import { PageWrapper } from "@/components/blocks/generic/PageWrapper.tsx";
import { Header } from "@/components/blocks/generic/Header.tsx";
import { Heading } from "@/components/ui/Heading.tsx";

/** Component */
const ManageProfilesPage = () => {
  /** Markup */
  return (
    <>
      <Header />
      <PageWrapper disablePaddingTop>
        <Heading type="h2">Movie detail page</Heading>
        <p>Add account, delete account, change name, chose profile picture</p>
      </PageWrapper>
    </>
  );
};

export { ManageProfilesPage };
