import React from "react";
import { Global, MantineProvider } from "@mantine/core";
import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "@fontsource/mulish/400.css";
import "@fontsource/mulish/600.css";
import "@fontsource/mulish/800.css";
import "@fontsource/arvo/400.css";
import "@fontsource/arvo/700.css";

interface StylesProviderProps {
  children: React.ReactNode;
}

export function StylesProvider({ children }: StylesProviderProps) {
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        // Consider extracting to own file if this gets too extensive
        fontFamily: "'Mulish', sans-serif",
        headings: { fontFamily: "'Arvo', serif" },
      }}
    >
      <Global
        styles={() => ({
          // CSS resets + globals
          "*, *::before, *::after": {
            boxSizing: "border-box",
          },
          "*": {
            margin: 0,
          },
          "html, body": {
            height: "100vh",
          },
          body: {
            maxWidth: "1920px",
            margin: "0 auto",
            lineHeight: 1.5,
            WebkitFontSmoothing: "antialiased",
          },
          "img, picture, video, canvas, svg": {
            display: "block",
            maxWidth: "100%",
          },
          "input, button, textarea, select": {
            font: "inherit",
          },
          "p, h1, h2, h3, h4, h5, h6": {
            overflowWrap: "break-word",
          },
          "#root": {
            isolation: "isolate",
          },
        })}
      />
      <ScrollBar style={{ height: "100vh" }}>{children}</ScrollBar>
    </MantineProvider>
  );
}
