/** Vendor */
import React, { useEffect } from "react";

/** Type */
type IntersectionObserverHelperType = {
  targetRef: React.RefObject<HTMLElement>;
  options?: {
    root: HTMLElement | null;
    rootMargin: string;
    threshold: number;
  };
  isObserving?: boolean;
  callbackIntersecting?: () => void;
  callbackNotIntersecting?: () => void;
};

/** Default */
const defaultOptions: IntersectionObserverHelperType["options"] = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

/**
 * IntersectionObserverHelper is a custom hook to work with the IntersectionObserver API.
 *
 * @example
 * useIntersectionObserverHelper({
 *   targetRef: imageRef,
 *   callbackIntersecting: () => someFunction(),
 *   callbackNotIntersecting: () => someOtherFunction(),
 *   isObserving: isObserving,
 * });
 *
 * @param targetRef - Reference to the target element.
 * @param options - IntersectionObserver options.
 * @param isObserving - Boolean to start or stop observing.
 * @param callbackIntersecting - Callback function when target is intersecting.
 * @param callbackNotIntersecting - Callback function when target is not intersecting.
 */

/** Hook */
const useIntersectionObserverHelper = ({
  targetRef,
  options = defaultOptions,
  isObserving = true,
  callbackIntersecting,
  callbackNotIntersecting,
}: IntersectionObserverHelperType) => {
  /** Observer */
  useEffect(() => {
    const target = targetRef.current;

    if (!target || !isObserving) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && callbackIntersecting) {
          callbackIntersecting();
        } else if (!entry.isIntersecting && callbackNotIntersecting) {
          callbackNotIntersecting();
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);
    observer.observe(target);

    if (!isObserving) {
      observer.unobserve(target);
    }

    // Cleanup observer on state change or unmount
    return () => {
      observer.disconnect();
    };
  }, [callbackIntersecting, callbackNotIntersecting, options, targetRef, isObserving]);
};

export type { IntersectionObserverHelperType };
export { useIntersectionObserverHelper };
