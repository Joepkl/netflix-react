/** Vendor */
import { Link } from "react-router-dom";

/** Local */
import type { UserType } from "@/constants/Users.ts";

/** Types */
type UserProfileType = {
  user: UserType;
  route?: string;
};

/** Component */
const UserProfile = ({ user, route }: UserProfileType) => {
  const content = (
    <>
      <img className="rounded-default" src={user.profilePicture} alt="Profile picture" />
      <p className="text-center mt-2">{user.username}</p>
    </>
  );

  /** Markup */
  return route ? <Link to={route}>{content}</Link> : content;
};

export { UserProfile };
