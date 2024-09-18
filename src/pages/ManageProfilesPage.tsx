/** Local */
import { useAppSelector, useAppDispatch } from "@/store/hooks.ts";

/** Blocks */
import { PageWrapper } from "@/components/blocks/PageWrapper.tsx";

/** Component */
const ManageProfilesPage = () => {
  /** Markup */
  return (
    <PageWrapper>
      <h1>Manage profiles</h1>
      <p>Add account, delete account, change name, chose profile picture</p>
    </PageWrapper>
  );
};

export { ManageProfilesPage };
