import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function getRandomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

interface ScrambleTextProps {
  text: string;
  duration?: number;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  duration = 1000,
}) => {
  const [displayed, setDisplayed] = useState<string>("");

  useEffect(() => {
    let frame = 0;
    const totalFrames = duration / 30; // 30ms per frame
    const interval = setInterval(() => {
      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (i < (frame / totalFrames) * text.length) {
          result += text[i];
        } else {
          result += getRandomChar();
        }
      }
      setDisplayed(result);
      frame++;
      if (frame > totalFrames) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, [text, duration]);

  return (
    <Typography
      variant="h1"
      sx={{
        color: "primary.text",
        fontFamily: "Inter, sans-serif",
        textAlign: "left",
        marginLeft: "10px",
        fontWeight: 500,
      }}
    >
      {displayed}
    </Typography>
  );
};
