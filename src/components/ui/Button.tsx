/** Vendor */
import { createElement } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

/** Type */
type ButtonBase = {
  text?: string;
  icon?: string;
  variant?: "primary" | "secondary" | "outline" | "tertiary" | "icon";
  iconPosition?: "left" | "right";
  iconOnly?: boolean;
  className?: string;
  onClick?: () => void;
};

type ButtonAsButton = ButtonBase & {
  type?: "button";
  route?: never;
};

type ButtonAsLink = ButtonBase & {
  type: "link";
  route: string;
};

type ButtonType = ButtonAsButton | ButtonAsLink;

/** Component */
const Button = ({
  text,
  icon,
  type = "button",
  variant = "primary",
  iconPosition = "left",
  iconOnly = false,
  route = "/",
  className,
  onClick,
}: ButtonType) => {
  // Classes
  const baseClass = `rounded-md flex items-center justify-center whitespace-nowrap hover:opacity-60 transition-all duration-400 ${
    iconOnly ? "w-8 h-8" : "w-fit px-4 py-2"
  }`;

  const variantClasses = {
    primary: "bg-white-main text-black-main font-bold",
    secondary: "bg-grey-main text-white-main font-bold",
    outline: "bg-transparent text-white-main border border-white-main font-bold",
    tertiary: "underline underline-offset-4 text-white px-0 py-0",
    icon: "",
  };
  const elementClasses = twMerge(baseClass, variantClasses[variant], className);

  // Element
  const elementType = type === "link" ? Link : "button";

  const elementContent = (
    <div className={`${iconPosition === "right" ? "flex-row-reverse" : ""} flex items-center gap-2`}>
      {icon && <img className="h-5 w-fit" src={icon} alt="Icon" />}
      {text}
    </div>
  );

  let element;
  if (elementType === "button") {
    element = createElement(elementType, { className: elementClasses, onClick: onClick }, elementContent);
  } else {
    element = createElement(elementType, { className: elementClasses, onClick: onClick, to: route }, elementContent);
  }

  return element;
};

export { Button };
