"use client";

import styled from "@emotion/styled";
import { FlexBox, StyledSystemProps } from "../styledElements";
import Image from "next/image";

type InputProps = { small?: boolean; isSearchIcon?: boolean };

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

  img {
    right: 12px;
    stroke {
      color: white;
    }
  }
`;

type TextFieldProps = StyledSystemProps &
  InputProps &
  JSX.IntrinsicElements["input"];

export default function TextField({
  isSearchIcon,
  width,
  ...rest
}: TextFieldProps) {
  return (
    <InputContainer width={width}>
      <Input {...rest} />
      {isSearchIcon && (
        <Image
          src={"/logo/search-icon.svg"}
          width={36}
          height={36}
          alt="search-icon"
          loading="lazy"
        />
      )}
    </InputContainer>
  );
}
