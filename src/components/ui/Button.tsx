/** Vendor */
import { createElement } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

/** Type */
type ButtonType = {
  text?: string;
  icon?: string;
  type?: "button" | "link";
  variant?: "primary" | "secondary" | "outline" | "tertiary";
  iconPosition?: "left" | "right";
  route?: string;
  onClick?: () => void;
};

/** Component */
const Button = ({
  text,
  icon,
  type = "button",
  variant = "primary",
  iconPosition = "left",
  route = "/",
  onClick,
}: ButtonType) => {
  // Classes
  const baseClass = "px-4 py-2 rounded-md w-fit";
  const variantClasses = {
    primary: "bg-white-main text-black-main font-bold",
    secondary: "bg-grey-main text-white-main font-bold",
    outline: "bg-transparent text-white-main border border-white-main font-bold",
    tertiary: "underline text-white px-0 py-0",
  };
  const elementClasses = twMerge(baseClass, variantClasses[variant]);

  // Element
  const elementType = type === "link" ? Link : "button";

  const elementContent = (
    <div className={`${iconPosition === "right" ? "flex-row-reverse" : ""} flex items-center gap-2`}>
      {icon && <img className="h-4 w-fit" src={icon} alt="Icon" />}
      {text}
    </div>
  );

  let element;
  if (elementType === "button") {
    element = createElement(elementType, { className: elementClasses, onClick: onClick }, elementContent);
  } else {
    element = createElement(elementType, { className: elementClasses, to: route }, elementContent);
  }

  return element;
};

export { Button };
