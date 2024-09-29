/** Local */
import { Users } from "@/constants/Users.ts";
import { setIsAuthenticated, setUserProfile, setIsLoading } from "@/store/slices/app.ts";
import { useAppDispatch } from "@/store/hooks.ts";
import AddIcon from "@/assets/icons/add_white.svg";

/** Blocks */
import { LogoAnimation } from "@/components/blocks/LogoAnimation.tsx";
import { PageWrapper } from "@/components/blocks/PageWrapper.tsx";
import { UserProfileBlock } from "@/components/blocks/UserProfile.tsx";

/** Component */
const LoginPage = () => {
  const dispatch = useAppDispatch();
  const widthClass = "w-[calc(50%-16px)] sm:w-[calc(33%-22px)] max-w-[150px]";
  const addAccount = { username: "Add account", profilePicture: AddIcon };

  const handleLogin = (username: string) => {
    dispatch(setIsAuthenticated(true));
    dispatch(setUserProfile(username));

    // Make API call to fetch user movies
    dispatch(setIsLoading(true));
  };

  /** Markup */
  return (
    <PageWrapper disablePaddingTop>
      <div className="flex flex-col justify-center h-[100dvh]">
        <LogoAnimation />

        <ul className="flex flex-wrap sm:justify-center mt-[80px] md:w-[80%] md:mx-auto md:mt-[120px] gap-x-8 gap-y-4">
          {/* Users */}
          {Users.map((user, index) => {
            return (
              <li key={index} className={widthClass}>
                <UserProfileBlock
                  onClick={() => handleLogin(user.username)}
                  user={user}
                  route="/browse"
                  animated={true}
                />
              </li>
            );
          })}

          <li className={widthClass}>
            <UserProfileBlock user={addAccount} animated={true} route="/manage" isAddAccountBlock={true} />
          </li>
        </ul>
      </div>
    </PageWrapper>
  );
};

export { LoginPage };
