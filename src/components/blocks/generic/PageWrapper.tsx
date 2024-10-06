/** Vendor */
import { ReactNode, useEffect } from "react";
import { twMerge } from "tailwind-merge";

/** Local */
import { scrollTop } from "@/helpers/generic/scrollTop.tsx";

/** Type */
type PageWrapperProps = {
  children: ReactNode;
  disablePaddingTop?: boolean;
  disablePaddingBottom?: boolean;
  disablePaddingLeft?: boolean;
  disablePaddingRight?: boolean;
  usedWithHeader?: boolean;
};

/** Component */
const PageWrapper = ({
  children,
  disablePaddingTop,
  disablePaddingBottom,
  disablePaddingLeft,
  disablePaddingRight,
  usedWithHeader = false,
}: PageWrapperProps) => {
  const paddingTopClass = disablePaddingTop ? "" : "pt-[60px]";
  const paddingBottomClass = disablePaddingBottom ? "" : "pb-[80px]";
  const paddingLeftClass = disablePaddingLeft ? "" : "pl-[30px]";
  const paddingRightClass = disablePaddingRight ? "" : "pr-[30px]";
  const minHeightClass = usedWithHeader ? "min-h-[calc(100dvh-502px)]" : "min-h-[100dvh]";

  const classes = twMerge(paddingTopClass, paddingBottomClass, paddingLeftClass, paddingRightClass, minHeightClass);

  /** Effects */
  useEffect(() => {
    // Scroll to top of page on inital component mount
    scrollTop();
  }, []);

  /** Markup */
  return <section className={classes}>{children}</section>;
};

export { PageWrapper };
