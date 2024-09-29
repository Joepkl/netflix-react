/** Vendor */
import { twMerge } from "tailwind-merge";
import { createElement, ReactNode } from "react";

/** Type */
type HeadingType = {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
  styling?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
};

/**
 * Heading component for SEO purposes.
 * Outputs h1-h6 tags with styling of choice.
 *
 * @example
 * <Heading type="h5" styling="h2">Some title</Heading>
 */

/** Component */
const Heading = ({ type, children, styling, className }: HeadingType) => {
  const stylingClass = styling ? styling : type;
  const elementClass = twMerge(className, stylingClass);
  const element = createElement(type, { className: elementClass }, children);

  return element;
};

export { Heading };
