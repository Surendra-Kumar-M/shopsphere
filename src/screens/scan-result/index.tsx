import { useRouter, useLocalSearchParams } from "expo-router";

import { Button } from "@/shared/components";

import * as S from "./styles";

export default function ScanResultScreen() {
  const router = useRouter();
  const { code } = useLocalSearchParams<{ code: string }>();

  return (
    <S.Container>
      <S.Title>Scanned Code</S.Title>

      <S.Card>
        <S.CodeLabel>Detected Value</S.CodeLabel>
        <S.CodeText>{code}</S.CodeText>
      </S.Card>

      <S.ButtonGroup>
        <Button
          title="Scan Again"
          onPress={() => router.back()}
          fullWidth
        />
        <Button
          title="Go Home"
          variant="outline"
          onPress={() => router.replace("/(tabs)")}
          fullWidth
        />
      </S.ButtonGroup>
    </S.Container>
  );
}
