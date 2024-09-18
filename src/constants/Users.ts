/** Local */
import ProfileImage1 from "@/assets/images/profile_1.png";
import ProfileImage2 from "@/assets/images/profile_2.png";
import ProfileImage3 from "@/assets/images/profile_3.png";

/** Type */
type UserType = {
  username: string;
  profilePicture: string;
};

/** Constant */
const Users = [
  { username: "Mary", profilePicture: ProfileImage1 },
  { username: "John", profilePicture: ProfileImage2 },
  { username: "William", profilePicture: ProfileImage3 },
  // { username: "William", profilePicture: ProfileImage3 },
];

export { Users };
export type { UserType };
