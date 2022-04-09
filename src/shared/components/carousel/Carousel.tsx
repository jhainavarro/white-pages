import React from "react";
import { Splide, SplideProps } from "@splidejs/react-splide";

type CarouselProps = SplideProps & {
  children: React.ReactNode;
};

export function Carousel({ children, options, ...props }: CarouselProps) {
  return (
    <Splide
      options={{
        type: "loop",
        autoplay: true,
        pauseOnHover: true,
        resetProgress: false,
        ...options,
      }}
      {...props}
    >
      {children}
    </Splide>
  );
}
