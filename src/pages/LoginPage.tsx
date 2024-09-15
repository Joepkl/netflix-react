/** Vendor */
import { useEffect } from "react";

/** Local */
import { Users } from "@/constants/Users.ts";

/** Blocks */
import { LogoAnimation } from "@/components/blocks/LogoAnimation.tsx";
import { PageWrapper } from "@/components/blocks/PageWrapper.tsx";
import { UserProfile } from "@/components/blocks/UserProfile.tsx";

/** Component */
const LoginPage = () => {
  const gridColsClasses =
    "grid-cols-[repeat(auto-fill,minmax(100px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]";

  /** Effects */
  useEffect(() => {
    console.log("Start animation");
  });

  /** Markup */
  return (
    <PageWrapper disablePaddingTop={true}>
      <div className="flex flex-col justify-center h-full">
        <LogoAnimation />

        <ul className={`${gridColsClasses} mt-[80px] grid  gap-x-6 gap-y-3 md:gap-6 lg:gap-8`}>
          {Users.map((user, index) => {
            return (
              <li key={index}>
                <UserProfile user={user} route="/browse" />
              </li>
            );
          })}
        </ul>
      </div>
    </PageWrapper>
  );
};

export { LoginPage };
