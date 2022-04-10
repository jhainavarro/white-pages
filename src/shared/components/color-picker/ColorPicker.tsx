import React, { useState } from "react";
import { ColorSwatch, useMantineTheme } from "@mantine/core";
import { ReactComponent as CheckIcon } from "shared/icons/check.svg";

interface ColorPickerProps {
  value?: string;
  onSelect: (c: string) => void;
}

export function ColorPicker({ value, onSelect }: ColorPickerProps) {
  const theme = useMantineTheme();
  const colors = Object.keys(theme.colors);
  const [selected, setSelected] = useState(value);

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {colors.map((color) => (
        <ColorSwatch
          key={color}
          color={theme.colors[color][5]}
          style={{ cursor: "pointer" }}
          title={color}
          onClick={() => {
            onSelect(color);
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
