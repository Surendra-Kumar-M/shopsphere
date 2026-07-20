import { AppText } from "@/components/ui";

import { AuthHeaderProps } from "./types";
import * as S from "./styles";

export default function AuthHeader({
  title,
  subtitle,
  align = "left",
}: AuthHeaderProps) {
  return (
    <S.Container>
      <AppText variant="hero" weight="bold" align={align}>
        {title}
      </AppText>

      {subtitle ? (
        <S.Subtitle>
          <AppText variant="body" color="textSecondary" align={align}>
            {subtitle}
          </AppText>
        </S.Subtitle>
      ) : null}
    </S.Container>
  );
}
