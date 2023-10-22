"use client";
import { Box } from "@/components/styledElements";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const ApolloProvider = dynamic(() => import("@/context/ApolloProvider"), {
  ssr: false,
});

const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
});

export default function TemplateRoot({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider>
      <Box>
        <Header />
        <Box padding={2}>{children}</Box>
      </Box>
    </ApolloProvider>
  );
}
