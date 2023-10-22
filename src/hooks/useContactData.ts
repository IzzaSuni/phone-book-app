"use client";

import { KEY_STORAGE } from "@/const/keyStorage";
import { gqlQueries } from "@/network/queries";
import { useQuery } from "@apollo/client";
import { useDebounce } from "@uidotdev/usehooks";
import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useEffect, useState } from "react";

export type ContactList = {
  contact: {
    created_at: string;
    first_name: string;
    id: number;
    last_name: string;
    phones: { number: string; __typename: string }[];
  }[];
  contact_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

const favoriteContactAtom = atomWithStorage<ContactList | null>(
  KEY_STORAGE.FAVORITE_CONTACT,
  null,
  createJSONStorage(() => localStorage)
);

const searchContactAtom = atomWithStorage<string>(
  KEY_STORAGE.SEARCH_CONTACT,
  "",
  createJSONStorage(() => localStorage)
);

export default function useContactData() {
  const [favorite, setFavorite] = useAtom(favoriteContactAtom);
  const [searchContact, setSearchContact] = useAtom(searchContactAtom);
  const debouncedSearch = useDebounce(searchContact, 300);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalData: 0,
    isMaxPage: false,
  });

  const searchedPhoneNumber = debouncedSearch.split(" ").find((e) => {
    return Number(e);
  });

  const searchedName = debouncedSearch.split(" ").find((e) => {
    return !Number(e);
  });

  const whereParams = {
    ...(searchedName && {
      first_name: {
        _ilike: `%${searchedName}%`,
      },
    }),
    ...(searchedPhoneNumber && {
      _or: {
        phones: {
          number: {
            _ilike: `%${searchedPhoneNumber}%`,
          },
        },
      },
    }),
  };

  const { data: contactList, loading: isLoadingContactList } =
    useQuery<ContactList>(gqlQueries.GET_CONTACT_LIST, {
      variables: {
        where: whereParams,
        limit: 10,
        offset: pagination?.currentPage,
      },
    });

  const handleNextPage = () => {
    setPagination((v) => ({
      ...v,
      currentPage: v?.currentPage + 1,
    }));
  };

  const handlePrevPage = () => {
    setPagination((v) => ({
      ...v,
      currentPage: v?.currentPage - 1,
    }));
  };

  useEffect(() => {
    setPagination((v) => ({
      ...v,
      totalData: contactList?.contact_aggregate?.aggregate?.count ?? 0,
      isMaxPage: pagination?.totalData <= (pagination?.currentPage + 1) * 10,
    }));
  }, [contactList]);

  return {
    searchContact,
    favorite,
    setFavorite,
    setSearchContact,
    debouncedSearch,
    contactList,
    isLoadingContactList,
  };
}
