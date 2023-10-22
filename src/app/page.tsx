"use client";

import Card from "@/components/Card";
import Empty from "@/components/Empty/Index";
import ShowComponent from "@/components/ShowComponent";
import { Box, FlexBox, Text } from "@/components/styledElements";
import useContactData from "@/hooks/useContactData";
import Image from "next/image";

export default function Home() {
  const { contactList, favorite } = useContactData();

  const isHasData = contactList?.contact?.length! > 0;

  return (
    <Box>
      <ShowComponent isShow={favorite?.contact?.length! > 0}>
        <Card>
          <Text>Favorite Contact ❤️</Text>
        </Card>
      </ShowComponent>
      <ShowComponent isShow={isHasData}>
        <Card gridGap={2}>
          <Text fontSize={18}>All Contact List</Text>
          {contactList?.contact?.map(
            ({ first_name, phones, last_name }, index) => {
              return (
                <FlexBox
                  key={index}
                  alignItems={"center"}
                  gridGap={2}
                  py={2}
                  borderBottom={"2px solid #0D0221"}
                >
                  <Image
                    width={42}
                    height={42}
                    alt="user-icon-logo"
                    src={"/logo/user-icon.png"}
                  />
                  <Box>
                    <Text m={0}>
                      {first_name} {last_name}
                    </Text>
                    <FlexBox>
                      <Text fontWeight={200} m={0} color={"#ffffffa1"}>
                        {phones?.map((e) => e?.number).join(", ")}
                      </Text>
                    </FlexBox>
                  </Box>
                </FlexBox>
              );
            }
          )}
        </Card>
      </ShowComponent>
      <ShowComponent isShow={!isHasData}>
        <Empty />
      </ShowComponent>
    </Box>
  );
}
