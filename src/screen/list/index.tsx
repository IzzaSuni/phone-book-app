"use client";

import Card from "@/components/Card";
import { Box, FlexBox, Text } from "@/components/styledElements";
import { usePathname, useRouter } from "next/navigation";
import React, { Fragment } from "react";
import Image from "next/image";
import useGetListData from "@/hooks/useGetListData";

export default function ContactList() {
  const { push } = useRouter();
  const pathname = usePathname();
  const { contactListData, isLoadingContactList } = useGetListData();

  return (
    <Box>
      <Card>
        <Text>Favorite Contact ❤️</Text>
      </Card>
      <Card gridGap={2}>
        {contactListData?.map(({ first_name, phones }, index) => (
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
              <Text m={0}>{first_name}</Text>
              <FlexBox>
                {phones?.map(({ number }) => (
                  <Text m={0} key={number}>
                    {number}
                  </Text>
                ))}
              </FlexBox>
            </Box>
          </FlexBox>
        ))}
      </Card>
    </Box>
  );
}
