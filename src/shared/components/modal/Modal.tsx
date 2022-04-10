import React from "react";
import { Modal as MModal, ModalProps as MModalProps } from "@mantine/core";
import { Button, ButtonProps } from "shared/components/button";
import { useStyles } from "./Modal.styles";

type ModalProps = MModalProps & {
  primaryButton?: ButtonProps & { label?: string };
};

export function Modal({ children, primaryButton, ...props }: ModalProps) {
  const { classes } = useStyles();

  return (
    <MModal
      {...props}
      centered
      overlayOpacity={0.8}
      transition="fade"
      onClick={(e) => e.stopPropagation()}
    >
      {children}

      <div className={classes.footer}>
        {primaryButton && (
          <Button variant="subtle" onClick={props.onClose}>
            Cancel
          </Button>
        )}

        {primaryButton && (
          <Button
            {...primaryButton}
            children={primaryButton.label ?? primaryButton.children}
          />
        )}
      </div>
    </MModal>
  );
}
