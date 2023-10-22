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
  cache,
});

export function useQueryClient<TResponse>(
  query: DocumentNode,
  option: QueryHookOptions<any, OperationVariables> | undefined
) {
  return useQuery<TResponse>(query, { client: networkClient, ...option });
}

export function useMutationClient<TResponse>(
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
  return useMutation<TResponse>(query, { client: networkClient, ...option });
}
