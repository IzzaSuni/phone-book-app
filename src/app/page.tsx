"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import ContactsCard from "@/components/ContactsCard";
import Empty from "@/components/Empty/Index";
import ShowComponent from "@/components/ShowComponent";
import { FlexBox, Text } from "@/components/styledElements";
import useGlobalState, { modalAtom } from "@/hooks/useGlobalState";

export default function Home() {
  const {
    contactList,
    favorite,
    pagination,
    handleNextPage,
    handlePrevPage,
    handleAddToFavorite,
    isLoadingContactList,
    handleRemoveFromFavorite,
    debouncedSearch,
  } = useGlobalState();

  const isHasData = contactList?.contact?.length! > 0;

  return (
    <FlexBox flexDirection={!!debouncedSearch ? "column-reverse" : "column"}>
      <ShowComponent isShow={favorite?.length! > 0 && !debouncedSearch}>
        <Card>
          <Text fontSize={18} textAlign={"center"}>
            My Favorite Contact ❤️
          </Text>
          {favorite?.map((item, index) => (
            <ContactsCard
              buttonText="-💔"
              key={index}
              item={item}
              buttonHandler={handleRemoveFromFavorite}
            />
          ))}
        </Card>
      </ShowComponent>
      <ShowComponent isShow={isHasData}>
        <Card gridGap={2}>
          <FlexBox alignItems={"center"} justifyContent={"space-between"}>
            <Text fontSize={18}>All Contact List</Text>
          </FlexBox>
          {contactList?.contact?.map((item, index) => (
            <ContactsCard
              buttonText="+ ❤️"
              key={index}
              item={item}
              buttonHandler={handleAddToFavorite}
            />
          ))}

          <FlexBox justifyContent={"center"} alignItems={"center"} gridGap={3}>
            <ShowComponent isShow={pagination?.currentPage > 0}>
              <Button fontSize={18} p={"4px 12px"} onClick={handlePrevPage}>
                Previous
              </Button>
            </ShowComponent>
            <Text fontSize={24}>{pagination?.currentPage + 1}</Text>
            <ShowComponent isShow={!pagination?.isMaxPage}>
              <Button fontSize={18} p={"4px 12px"} onClick={handleNextPage}>
                Next
              </Button>
            </ShowComponent>
          </FlexBox>
        </Card>
      </ShowComponent>
      <ShowComponent isShow={isLoadingContactList}>
        <Card gridGap={2}>
          <Text fontSize={18}>All Contact List</Text>

          {[1, 2, 3, 4, 5].map((index) => (
            <ContactsCard key={index} isLoading />
          ))}
        </Card>
      </ShowComponent>
      <ShowComponent isShow={!isHasData && !isLoadingContactList}>
        <Empty />
      </ShowComponent>
    </FlexBox>
  );
}
