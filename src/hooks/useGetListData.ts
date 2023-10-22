"use client";

import { KEY_STORAGE } from "@/const/keyStorage";
import { useQueryClient } from "@/network";
import { gqlQueries } from "@/network/queries";
import { useDebounce } from "@uidotdev/usehooks";
import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useState } from "react";

type FavoriteContactAtom = {
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  phones: [
    {
      number: string;
    }
  ];
}[];

const favoriteContactAtom = atomWithStorage<FavoriteContactAtom | null>(
  KEY_STORAGE.FAVORITE_CONTACT,
  null,
  createJSONStorage(() => localStorage)
);

export type ContactList = {
  contact: {
    created_at: string;
    first_name: string;
    id: number;
    last_name: string;
    phones: { number: string; __typename: string }[];
  }[];
};

export default function useGetListData() {
  const [favorite, setFavorite] = useAtom(favoriteContactAtom);
  const [searchContact, setSearchContact] = useState<string>("");
  const debouncedSearch = useDebounce(searchContact, 300);

  const { data: contactList, loading: isLoadingContactList } =
    useQueryClient<ContactList>(gqlQueries.GET_CONTACT_LIST, {});

  return {
    favorite,
    setFavorite,
    setSearchContact,
    debouncedSearch,
    contactListData: contactList?.contact,
    isLoadingContactList,
  };
}
