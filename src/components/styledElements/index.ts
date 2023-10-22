"use client";
import styled, { CSSObject } from "@emotion/styled";
import {
  space,
  width,
  fontSize,
  color,
  flexbox,
  layout,
  typography,
  grid,
  background,
  border,
  position,
  shadow,
  SpaceProps,
  WidthProps,
  FontSizeProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  TypographyProps,
  GridProps,
  BackgroundProps,
  BorderProps,
  PositionProps,
  ShadowProps,
  fontWeight,
} from "styled-system";

export type StyledSystemProps = SpaceProps &
  WidthProps &
  FontSizeProps &
  ColorProps &
  FlexboxProps &
  LayoutProps &
  TypographyProps &
  GridProps &
  BackgroundProps &
  BorderProps &
  PositionProps &
  ShadowProps;

export default function element<T extends keyof JSX.IntrinsicElements>(
  elementTag: T
) {
  return styled(elementTag)<
    StyledSystemProps & { style?: CSSObject; gap?: number }
  >`
    ${space}
    ${width}
  ${fontSize}
  ${color}
  ${flexbox}
  ${layout}
  ${typography}
  ${grid}
  ${background}
  ${border}
  ${position}
  ${shadow}
  ${fontWeight}



  ${({ style }) => style}
  `;
}

export const Box = element("div");
export const FlexBox = styled(Box)({ display: "flex" });
export const Text = styled(element("p"))`
  color: white;
`;
export const Button = element("button");
