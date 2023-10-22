"use client";

import { ReactNode } from "react";
import { Box, FlexBox, StyledSystemProps } from "../styledElements";

export default function Card({
  children,
  width,
  gridGap,
  dataType,
}: { children: ReactNode; dataType?: string } & StyledSystemProps) {
  return (
    <FlexBox
      flexDirection={"column"}
      borderRadius={4}
      margin={"auto"}
      mt={4}
      width={["90%", "80%", "768px"]}
      padding={4}
      background={"#26408B"}
      boxShadow={"0 2px 20px 0 rgba(255,255,255,.3)"}
      color={"unset"}
      gridGap={gridGap}
      datatype={dataType}
    >
      {children}
    </FlexBox>
  );
}
