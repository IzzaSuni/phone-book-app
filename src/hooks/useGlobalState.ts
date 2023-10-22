"use client";

import { KEY_STORAGE } from "@/const/keyStorage";
import { gqlMutation, gqlQueries } from "@/network/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useDebounce, useWindowScroll } from "@uidotdev/usehooks";
import { time } from "console";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useEffect, useMemo } from "react";

export type ContactList = {
  created_at?: string;
  first_name: string;
  id?: number;
  last_name: string;
  phones: { number: string }[];
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
  createJSONStorage(() => localStorage)
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

export const ContactItemAtom = atom<ContactList>({
  first_name: "",
  last_name: "",
  phones: [{ number: "" }],
});

export const modalAtom = atom(false);

export default function useGlobalState() {
  const [favorite, setFavorite] = useAtom(favoriteContactAtom);
  const [searchContact, setSearchContact] = useAtom(searchContactAtom);
  const [pagination, setPagination] = useAtom(paginationAtom);
  const modalState = useAtomValue(modalAtom);
  const setContactItem = useSetAtom(ContactItemAtom);

  const debouncedSearch = useDebounce(searchContact, 300);

  const searchedPhoneNumber = debouncedSearch.split(" ").find((e) => {
    return Number(e);
  });

  const searchedName = useMemo(() => {
    return debouncedSearch;
  }, [debouncedSearch]);

  // =====QUERY=======

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
    order_by: [
      {
        created_at: "desc",
      },
    ],
  };

  const {
    data: contactList,
    loading: isLoadingContactList,
    refetch: refetchContact,
  } = useQuery<ContactListResponse>(gqlQueries.GET_CONTACT_LIST, {
    variables,
  });

  // ======END OF QUERY======

  // ======MUTATION=========

  const [addContacts, { loading: isLoadingAddContact }] = useMutation(
    gqlMutation.ADD_CONTACT_WITH_PHONE
  );

  const [removeContact, { loading: isLoadingDeleteContact }] = useMutation(
    gqlMutation.DELETE_CONTACT_PHONE
  );

  // =====END OF MUTATION====

  // =====Func=====

  const handleAddToFavorite = async (item: ContactList) => {
    setFavorite([...favorite, item]);
  };

  const handleRemoveFromFavorite = async (item: ContactList) => {
    setFavorite(favorite.filter((v) => v.id !== item?.id));
  };

  let timeout: NodeJS.Timeout | number = 0;

  const handleNextPage = () => {
    clearTimeout(timeout);
    setPagination((v) => ({
      ...v,
      currentPage: v?.currentPage + 1,
    }));
    timeout = setTimeout(() => {
      window.scrollTo({ behavior: "smooth", top: document.body.scrollHeight });
    }, 500);
  };

  const handlePrevPage = () => {
    clearTimeout(timeout);

    setPagination((v) => ({
      ...v,
      currentPage: v?.currentPage - 1,
    }));

    timeout = setTimeout(() => {
      window.scrollTo({ behavior: "smooth", top: document.body.scrollHeight });
    }, 500);
  };

  // =====End Of Func=====

  useEffect(() => {
    if (!modalState) {
      setContactItem({
        first_name: "",
        last_name: "",
        phones: [{ number: "" }],
      });
    }
  }, [modalState]);

  useEffect(() => {
    setPagination((v) => ({
      ...v,
      totalData: contactList?.contact_aggregate?.aggregate?.count ?? 0,
      isMaxPage:
        contactList?.contact_aggregate?.aggregate?.count! <=
        (pagination?.currentPage + 1) * 10,
    }));
  }, [contactList, pagination?.currentPage]);

  useEffect(() => {
    if (!!debouncedSearch)
      setPagination({
        ...pagination,
        currentPage: 0,
        isMaxPage:
          contactList?.contact_aggregate?.aggregate?.count! <=
          (pagination?.currentPage + 1) * 10,
      });
  }, [debouncedSearch]);

  console.log({ pagination });

  return {
    refetchContact,
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
    addContacts,
    isLoadingAddContact,
    removeContact,
    isLoadingDeleteContact,
  };
}
