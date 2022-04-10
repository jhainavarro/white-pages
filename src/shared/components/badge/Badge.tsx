import React from "react";
import { Badge as MBadge, type BadgeProps as MBadgeProps } from "@mantine/core";

export type BadgeProps<C = "div"> = MBadgeProps<C>;

export function Badge(props: BadgeProps) {
  return <MBadge {...props} radius="sm" />;
}
