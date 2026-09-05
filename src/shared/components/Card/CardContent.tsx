import { PropsWithChildren } from "react";
import * as S from "./styles";

export default function CardContent({ children }: PropsWithChildren) {
  return <S.Content>{children}</S.Content>;
}
