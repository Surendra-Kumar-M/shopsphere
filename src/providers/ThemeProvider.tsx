import { ThemeProvider as EmotionProvider } from "@emotion/react";

import { theme } from "@/theme/theme";

interface Props {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  return <EmotionProvider theme={theme}>{children}</EmotionProvider>;
}
