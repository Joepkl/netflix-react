/** Vendor */
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

/** Local */
import type { UserType } from "@/constants/Users.ts";

/** Types */
type UserProfileBlockType = {
  user: UserType;
  route?: string;
  animated?: boolean;
  animationDelay?: number;
  isAddAccountBlock?: boolean;
  onClick?: () => void;
};

/** Component */
const UserProfileBlock = ({
  user,
  route,
  animated,
  animationDelay = 1000,
  isAddAccountBlock,
  onClick,
}: UserProfileBlockType) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const animationSetupClasses = "opacity-0 transition-all duration-500 ease-in-out scale-90";
  const animationClass = ["!opacity-100", "!scale-100"];

  const getAnimationSetupClasses = () => (animated ? animationSetupClasses : "");

  const handleClick = () => {
    if (onClick) onClick();
  };

  /** Effects */
  useEffect(() => {
    if (animated) {
      setTimeout(() => {
        const animatedElements = [imgRef, textRef];
        animatedElements.forEach((item) => {
          item.current?.classList.add(...animationClass);
        });
      }, animationDelay);
    }
  });

  /** Markup */
  const content = (
    <div className="flex flex-col">
      <div className="w-full aspect-square flex">
        <img
          ref={imgRef}
          className={`${getAnimationSetupClasses()} ${isAddAccountBlock ? "w-1/2 mx-auto" : ""} rounded-default`}
          src={user.profilePicture}
          alt="Profile picture"
        />
      </div>
      <p
        ref={textRef}
        className={`${getAnimationSetupClasses()} ${
          isAddAccountBlock ? "whitespace-nowrap" : ""
        } mt-2 text-center w-full`}
      >
        {user.username}
      </p>
    </div>
  );

  return route ? (
    <Link to={route} onClick={handleClick}>
      {content}
    </Link>
  ) : (
    content
  );
};

export { UserProfileBlock };
