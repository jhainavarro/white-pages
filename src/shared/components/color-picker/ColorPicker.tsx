import React, { useState } from "react";
import { ColorSwatch, useMantineTheme } from "@mantine/core";
import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { useStyles } from "./ColorPicker.styles";

interface ColorPickerProps {
  className?: string;
  value?: string;
  onChange: (c: string) => void;
}

export function ColorPicker({ className, value, onChange }: ColorPickerProps) {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const colors = Object.keys(theme.colors);
  const [selected, setSelected] = useState(value);

  return (
    <div className={cx(className, classes.group)}>
      {colors.map((color) => (
        <ColorSwatch
          key={color}
          color={theme.colors[color][5]}
          style={{ cursor: "pointer" }}
          title={color}
          onClick={() => {
            onChange(color);
            setSelected(color);
          }}
        >
          {color === selected && (
            <CheckIcon
              style={{
                fill: "white",
                height: "15px",
                width: "15px",
              }}
            />
          )}
        </ColorSwatch>
      ))}
    </div>
  );
}
