"use client";
import { Box, FlexBox, Text } from "@/components/styledElements";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { fadeIn, fadeOut } from "react-animations";

const fadein = keyframes`${fadeIn}`;
const fadeout = keyframes`${fadeOut}`;

const LoaderContainer = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 96px);

  img {
    animation: 0.5s ${fadein}, 0.5s ${fadeout};
  }
`;

export default function Loader() {
  return (
    <LoaderContainer>
      <Image
        src={"/logo/phone-book-happy.svg"}
        width={300}
        height={300}
        alt="logo"
        loading="lazy"
      />
      <Text fontSize={24}>Loading</Text>
    </LoaderContainer>
  );
}
