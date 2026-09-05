import { PropsWithChildren } from "react";
import * as S from "./styles";

export default function CardHeader({ children }: PropsWithChildren) {
  return <S.Header>{children}</S.Header>;
}
