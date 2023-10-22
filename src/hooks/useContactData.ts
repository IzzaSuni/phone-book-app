"use client";

import { KEY_STORAGE } from "@/const/keyStorage";
import { gqlQueries } from "@/network/queries";
import { useQuery } from "@apollo/client";
import { useDebounce } from "@uidotdev/usehooks";
import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useEffect, useState } from "react";

export type ContactList = {
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  phones: { number: string; __typename: string }[];
};

export type ContactListResponse = {
  contact: ContactList[];
  contact_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

const favoriteContactAtom = atomWithStorage<ContactList[]>(
  KEY_STORAGE.FAVORITE_CONTACT,
  [],
  createJSONStorage(() => sessionStorage)
);

const searchContactAtom = atomWithStorage<string>(
  KEY_STORAGE.SEARCH_CONTACT,
  "",
  createJSONStorage(() => sessionStorage)
);

const paginationAtom = atomWithStorage(
  KEY_STORAGE.PAGINATION,
  {
    currentPage: 0,
    totalData: 0,
    isMaxPage: false,
  },
  createJSONStorage(() => sessionStorage)
);

export default function useContactData() {
  const [favorite, setFavorite] = useAtom(favoriteContactAtom);
  const [searchContact, setSearchContact] = useAtom(searchContactAtom);
  const debouncedSearch = useDebounce(searchContact, 300);
  const [pagination, setPagination] = useAtom(paginationAtom);

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
    ...(favorite?.length > 0 && {
      _and: {
        id: { _nin: favorite?.map((v) => v.id) },
      },
    }),
  };

  const variables = {
    where: whereParams,
    limit: 10,
    offset: pagination?.currentPage * 10,
  };

  const {
    data: contactList,
    loading: isLoadingContactList,
    refetch,
  } = useQuery<ContactListResponse>(gqlQueries.GET_CONTACT_LIST, {
    variables,
  });

  const handleAddToFavorite = async (item: ContactList) => {
    setFavorite([...favorite, item]);
  };

  const handleRemoveFromFavorite = async (item: ContactList) => {
    setFavorite(favorite.filter((v) => v.id !== item?.id));
  };

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
      isMaxPage:
        contactList?.contact_aggregate?.aggregate?.count! <=
        (pagination?.currentPage + 1) * 10,
    }));
  }, [contactList, pagination?.currentPage]);

  return {
    searchContact,
    favorite,
    setFavorite,
    setSearchContact,
    debouncedSearch,
    contactList,
    isLoadingContactList,
    pagination,
    handleNextPage,
    handlePrevPage,
    handleAddToFavorite,
    handleRemoveFromFavorite,
  };
}
