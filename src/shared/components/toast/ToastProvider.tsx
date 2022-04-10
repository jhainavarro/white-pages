import React from "react";
import { NotificationsProvider } from "@mantine/notifications";

export interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <NotificationsProvider autoClose={5000} limit={3} position="bottom-right">
      {children}
    </NotificationsProvider>
  );
}
