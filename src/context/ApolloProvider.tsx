"use client";
import { networkClient } from "@/network";
import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

type ApolloClientProviderProps = {
  children: ReactNode;
};

export default function ApolloClientProvider({
  children,
}: ApolloClientProviderProps) {
  return <ApolloProvider client={networkClient}>{children}</ApolloProvider>;
}
