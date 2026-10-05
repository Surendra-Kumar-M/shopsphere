import styled from "@emotion/native";

import { SafeAreaView } from "react-native-safe-area-context";

export const SafeContainer = styled(SafeAreaView)<{
  background: string;
}>(({ background }) => ({
  flex: 1,

  backgroundColor: background,
}));

export const Container = styled.View<{
  padding: boolean;
}>(({ theme, padding }) => ({
  flex: 1,

  paddingHorizontal: padding ? theme.spacing.lg : 0,
}));

export const ScrollContainer = styled.ScrollView({
  flex: 1,
});
