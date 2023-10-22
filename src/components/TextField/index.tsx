"use client";

import styled from "@emotion/styled";
import { FlexBox, StyledSystemProps, Text } from "../styledElements";
import Image from "next/image";
import useDeviceType from "@/hooks/useDeviceType";
import ShowComponent from "../ShowComponent";

type InputProps = {
  small?: boolean;
  isSearchIcon?: boolean;
  icon?: string;
  disableLabel?: boolean;
  onClickIcon?: () => void;
} & JSX.IntrinsicElements["input"];

const inputSize = ({ small }: InputProps) => (small ? "12px" : "16px");

const Input = styled("input")<InputProps>`
  padding: ${inputSize};
  font-size: ${inputSize};
  width: 100%;
  background-color: #0f084b;
  color: white;
  border: none;
  outline: none;
  border-radius: 8px;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: #fff !important;
  }
`;

const InputContainer = styled(FlexBox)`
  background-color: #1d044e;
  border-radius: 8px;
  align-items: center;
  padding-right: 8px;
`;

type TextFieldProps = StyledSystemProps &
  InputProps &
  JSX.IntrinsicElements["input"];

export default function TextField({
  isSearchIcon,
  width,
  icon,
  placeholder,
  disableLabel,
  onClickIcon,
  ...rest
}: TextFieldProps) {
  const { isMobileDevice } = useDeviceType();

  return (
    <>
      <ShowComponent isShow={!disableLabel}>
        <Text m={1}>{placeholder}</Text>
      </ShowComponent>
      <InputContainer width={width}>
        <Input placeholder={`Insert ${placeholder}`} {...rest} />
        {icon && (
          <Image
            style={{ cursor: "pointer" }}
            src={icon}
            width={isMobileDevice ? 24 : 36}
            height={isMobileDevice ? 24 : 36}
            alt="search-icon"
            loading="lazy"
            onClick={onClickIcon}
          />
        )}
      </InputContainer>
    </>
  );
}
