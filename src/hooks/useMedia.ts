import { useCallback, useLayoutEffect, useMemo, useState } from "react";

type BreakpointNames = "md" | "lg" | "xl";

type BreakpointStateType = Record<BreakpointNames, boolean>;

const Breakpoints = {
  md: 768,
  xl: 1280,
  lg: 1024,
};

export default function useMedia() {
  const [isSettled, setIsSettled] = useState(false);
  const [breakpointState, setBreakpointState] = useState<BreakpointStateType>(
    {} as BreakpointStateType
  );

  const breakpointFunc = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const medias: [MediaQueryList, (e: any) => void][] = Object.entries(
      Breakpoints
    )
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => {
        const media = window.matchMedia(`(min-width: ${value}px)`);

        const listener = (e: MediaQueryListEvent) => {
          setBreakpointState((prev) => ({
            ...prev,
            [key]: e.matches,
          }));
        };

        media.addEventListener("change", listener);

        setBreakpointState((prev) => ({
          ...prev,
          [key]: media.matches,
        }));
        return [media, listener];
      });
    return () => {
      medias.forEach(([media, listener]) => {
        media.removeEventListener("change", listener);
      });
    };
  }, []);

  useLayoutEffect(() => {
    setIsSettled(true);
  }, []);

  useLayoutEffect(() => {
    breakpointFunc();
  }, [breakpointFunc]);

  const isMobile: boolean = useMemo(() => {
    return isSettled && !breakpointState.lg && !breakpointState.md;
  }, [breakpointState, isSettled]);
  const isTablet: boolean = useMemo(() => {
    return isSettled && breakpointState.md && !breakpointState.lg;
  }, [breakpointState, isSettled]);
  const isDesktop: boolean = useMemo(() => {
    return isSettled && breakpointState.lg;
  }, [breakpointState, isSettled]);

  return {
    isDesktop,
    isMobile,
    isTablet,
  };
}
