import { PropsWithChildren } from "react";
import * as S from "./styles";

export default function CardFooter({ children }: PropsWithChildren) {
  return <S.Footer>{children}</S.Footer>;
}
