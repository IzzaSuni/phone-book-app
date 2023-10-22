"use client";
import Header from "@/components/Header";
import { Box } from "@/components/styledElements";
import { ReactNode } from "react";

export default function TemplateRoot({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Header />
      <Box padding={[4, 8, 12]}>{children}</Box>
    </Box>
  );
}
