import React from "react";
import { Avatar as MAvatar, AvatarProps as MAvatarProps } from "@mantine/core";

export type AvatarProps<C = "div"> = MAvatarProps<C>;

export function Avatar(props: AvatarProps) {
  return <MAvatar size="lg" {...props} />;
}
