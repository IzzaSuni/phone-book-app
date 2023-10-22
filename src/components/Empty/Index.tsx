"use client";
import { FlexBox, Text } from "@/components/styledElements";
import useContactData from "@/hooks/useContactData";
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

export default function Empty() {
  const { debouncedSearch } = useContactData();
  return (
    <LoaderContainer>
      <Image
        src={"/logo/phone-book-sad.svg"}
        width={300}
        height={300}
        alt="logo"
        loading="lazy"
      />
      <Text fontSize={24}>
        Sorry there is no contact related to: {debouncedSearch}
      </Text>
    </LoaderContainer>
  );
}
