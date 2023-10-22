"use client";

import { useMediaQuery } from "@uidotdev/usehooks";

export default function useDeviceType() {
  if (typeof window === "undefined") {
    throw new Error("useMediaQuery() can not be used outside of the browser");
  }

  const isMobileDevice = useMediaQuery("only screen and (max-width : 414px)");
  const isTabletDevice = useMediaQuery(
    "only screen and (min-width : 414px) and (max-width : 1280px)"
  );
  const isDesktopDevice = useMediaQuery("only screen and (min-width : 1280px)");

  return { isMobileDevice, isTabletDevice, isDesktopDevice };
}
