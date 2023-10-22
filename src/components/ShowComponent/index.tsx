import { ReactNode } from "react";

export default function ShowComponent({
  isShow,
  children,
}: {
  isShow: boolean;
  children: ReactNode;
}) {
  return isShow && children;
}
