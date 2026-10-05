import CardHeader from "./CardHeader";
import CardContent from "./CardContent";
import CardFooter from "./CardFooter";
import { CardProps } from "./types";
import * as S from "./styles";


function Card({ children, ...props }: CardProps) {
  return <S.Container {...props}>{children}</S.Container>;
}

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
