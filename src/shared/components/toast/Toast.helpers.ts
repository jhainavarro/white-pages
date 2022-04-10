import { showNotification, NotificationProps } from "@mantine/notifications";

// Add more types here like `warn` or `info` when we need it
export type ToastType = "success" | "error";

type ToastFnInput = {
  title?: string;
  message: string;
};
export type ToastFn = (input: ToastFnInput) => void;

const toastColors: { [key in ToastType]: NotificationProps["color"] | string } =
  {
    success: "green",
    error: "red",
  };

/**
 * @param type Type of feedback
 * @returns A function that can be called to show a notification
 */
function showToast(type: ToastType): ToastFn {
  return ({ title, message }) => {
    showNotification({
      title,
      message,
      color: toastColors[type],
    });
  };
}

/**
 * Defines the different toast alerts that we can show across the app
 */
export const toast: { [key in ToastType]: ToastFn } = {
  success: showToast("success"),
  error: showToast("error"),
};
