"use client";

import { ApolloClient, InMemoryCache } from "@apollo/client";
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
