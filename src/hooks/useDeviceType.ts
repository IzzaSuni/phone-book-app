"use client";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function useDeviceType() {
  const isMobileDevice = useMediaQuery("only screen and (max-width : 414px)");
  const isTabletDevice = useMediaQuery(
    "only screen and (min-width : 414px) and (max-width : 1280px)"
  );
  const isDesktopDevice = useMediaQuery("only screen and (min-width : 1280px)");

  return { isMobileDevice, isTabletDevice, isDesktopDevice };
}
