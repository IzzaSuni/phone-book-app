import { ReactNode } from "react";
import { StyledButton, StyledSystemProps, Text } from "../styledElements";

type Button = {
  children: ReactNode;
} & StyledSystemProps &
  JSX.IntrinsicElements["button"];

export default function Button({ children, fontSize, ...rest }: Button) {
  return (
    <StyledButton {...rest}>
      <Text color={"black"} m={0} fontSize={fontSize ?? 12}>
        {children}
      </Text>
    </StyledButton>
  );
}
