import { Href, useRouter } from "expo-router";

import { AppText, Avatar, Button, Screen } from "@/shared/components";

import { useAuth } from "@/hooks/useAuth";

import * as S from "./styles";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, displayName, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/login" as Href);
  };

  return (
    <Screen scrollable>
      <S.Header>
        <Avatar uri={user?.image} name={displayName} size="xl" />

        <S.Meta>
          <AppText variant="h1" weight="bold" align="center">
            {displayName}
          </AppText>

          <AppText variant="body" color="textSecondary" align="center">
            {user?.email}
          </AppText>
        </S.Meta>
      </S.Header>

      <AppText variant="body" color="textSecondary" align="center">
        Manage your account, orders, and preferences.
      </AppText>

      <S.Actions>
        <Button title="Edit Profile" variant="outline" fullWidth disabled />
        <Button title="Sign Out" variant="danger" fullWidth onPress={handleLogout} />
      </S.Actions>
    </Screen>
  );
}
