"use client";

import Image from "next/image";
import { Box, FlexBox, Text } from "../styledElements";
import TextField from "../TextField";
import useDeviceType from "@/hooks/useDeviceType";

export default function Header() {
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
        <FlexBox
          position={"absolute"}
          gridGap={2}
          alignItems={"center"}
          right={["100%"]}
        >
          <Image
            src={"/logo/phone-book-brand.svg"}
            width={55}
            height={55}
            alt="brand-logo"
            loading="lazy"
          />
        </FlexBox>
        <TextField
          isSearchIcon
          placeholder="Search by number or name"
          width={"100%"}
        />
      </FlexBox>
    </Box>
  );
}
