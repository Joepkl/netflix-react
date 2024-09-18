/** Vendor */
import { ReactNode } from "react";

/** Type */
type PageWrapperProps = {
  children: ReactNode;
  disablePaddingTop?: boolean;
  disablePaddingBottom?: boolean;
  disablePaddingLeft?: boolean;
  disablePaddingRight?: boolean;
};

/** Component */
const PageWrapper = ({
  children,
  disablePaddingTop,
  disablePaddingBottom,
  disablePaddingLeft,
  disablePaddingRight,
}: PageWrapperProps) => {
  const paddingTopClass = disablePaddingTop ? "" : "pt-[60px]";
  const paddingBottomClass = disablePaddingBottom ? "" : "pb-[80px]";
  const paddingLeftClass = disablePaddingLeft ? "" : "pl-[30px]";
  const paddingRightClass = disablePaddingRight ? "" : "pr-[30px]";
  const paddingClasses = `${paddingTopClass} ${paddingBottomClass} ${paddingLeftClass} ${paddingRightClass}`;

  /** Markup */
  return <section className={`${paddingClasses} min-h-[100dvh]`}>{children}</section>;
};

export { PageWrapper };
