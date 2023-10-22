"use client";

import { ReactNode } from "react";
import { Box } from "../styledElements";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <Box
      borderRadius={4}
      margin={"auto"}
      mt={4}
      width={["90%", "80%", 768]}
      padding={[4, 8, 16]}
      background={"#26408B"}
      boxShadow={"0 2px 20px 0 rgba(255,255,255,.3)"}
    >
      {children}
    </Box>
  );
}
