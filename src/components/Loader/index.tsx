"use client";
import { FlexBox, Text } from "@/components/styledElements";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { pulse } from "react-animations";

const animation = keyframes`${pulse}`;

const LoaderContainer = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 96px);

  img {
    animation: 1s ${animation} infinite alternate;
`;

export default function Loader() {
  return (
    <LoaderContainer>
      <Image
        src={"/logo/phone-book-brand.svg"}
        width={300}
        height={300}
        alt="logo"
        loading="lazy"
      />
      <Text fontSize={24}>Loading</Text>
    </LoaderContainer>
  );
}
