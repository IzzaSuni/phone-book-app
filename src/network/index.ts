"use client";

import {
  ApolloCache,
  ApolloClient,
  DefaultContext,
  DocumentNode,
  InMemoryCache,
  MutationHookOptions,
  OperationVariables,
  QueryHookOptions,
  useMutation,
  useQuery,
} from "@apollo/client";
import { LocalStorageWrapper, persistCache } from "apollo3-cache-persist";

const cache = new InMemoryCache();

await persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
});

export const networkClient = new ApolloClient({
  uri: "https://wpe-hiring.tokopedia.net/graphql",
  cache: new InMemoryCache({}),
});

export function useQueryClient(
  query: DocumentNode,
  option: QueryHookOptions<any, OperationVariables> | undefined
) {
  return useQuery(query, { client: networkClient, ...option });
}

export function useMutationClient(
  query: DocumentNode,
  option:
    | MutationHookOptions<
        any,
        OperationVariables,
        DefaultContext,
        ApolloCache<any>
      >
    | undefined
) {
  return useMutation(query, { client: networkClient, ...option });
}
