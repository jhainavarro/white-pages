import React from "react";
import { SplideSlide } from "@splidejs/react-splide";

type CarouselItemProps = JSX.IntrinsicElements["li"];

export function CarouselItem({ children, ...props }: CarouselItemProps) {
  return <SplideSlide {...props}>{children}</SplideSlide>;
}
