import { getInitials } from "@/utils/Avatar.utils";
import * as S from "./styles";

import { AVATAR_SIZE, AvatarProps } from "./types";


export default function Avatar({
  uri,
  name,
  size = "md",
  bordered = false,
  disabled = false,
  ...props
}: AvatarProps) {
  const dimension = AVATAR_SIZE[size];

  return (
    <S.Container
      size={dimension}
      bordered={bordered}
      disabled={disabled}
      {...props}>
      {uri ? (
        <S.StyledImage source={uri} contentFit="cover" transition={300} />
      ) : (
        <S.Initials fontSize={dimension * 0.38}>{getInitials(name)}</S.Initials>
      )}
    </S.Container>
  );
}
