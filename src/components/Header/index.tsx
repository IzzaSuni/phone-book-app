"use client";

import Image from "next/image";
import { Box, FlexBox, Text } from "../styledElements";
import TextField from "../TextField";
import useDeviceType from "@/hooks/useDeviceType";
import useContactData from "@/hooks/useContactData";

export default function Header() {
  const { isMobileDevice } = useDeviceType();
  const { setSearchContact, searchContact } = useContactData();

  return (
    <Box
      background={"#26408B"}
      boxShadow={" 0 3px 10px 0 rgba(255,255,255,.22)"}
    >
      <FlexBox
        position={"relative"}
        alignItems={"center"}
        gridGap={2}
        padding={2}
        width={["100%", 512, 768]}
        margin={"auto"}
      >
        <Image
          src={"/logo/phone-book-brand.svg"}
          width={55}
          height={55}
          alt="brand-logo"
          loading="lazy"
        />
        {!isMobileDevice && (
          <Text color={"white"} fontSize={18}>
            Phone <br />
            Book
          </Text>
        )}
        <TextField
          value={searchContact}
          isSearchIcon
          placeholder="Search by number or name"
          width={"100%"}
          onChange={(event) => {
            setSearchContact(event?.target?.value);
          }}
        />
      </FlexBox>
    </Box>
  );
}
