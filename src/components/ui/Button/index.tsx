/** Vendor */
import { createElement } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

/** Local */
import { baseClass, variantClasses } from "@/components/ui/Button/classes.ts";

/** Type */
type ButtonType = {
  text?: string;
  icon?: string;
  type?: "button" | "link";
  variant?: "primary" | "secondary" | "tertiary";
  route?: string;
  onClick?: () => void;
};

/** Component */
const Button = ({ text, icon, type = "button", variant = "primary", route = "/", onClick }: ButtonType) => {
  // Classes
  const elementClasses = twMerge(baseClass, variantClasses[variant]);

  // Element
  const elementType = type === "link" ? Link : "button";

  const elementContent = (
    <>
      {text}
      {icon && <img src={icon} alt="Icon" />}
    </>
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
