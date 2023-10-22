"use client";
import { Box } from "@/components/styledElements";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Header = dynamic(() => import("@/components/Header"));

export default function TemplateRoot({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Header />
      <Box padding={[4, 8, 12]}>{children}</Box>
    </Box>
  );
}
