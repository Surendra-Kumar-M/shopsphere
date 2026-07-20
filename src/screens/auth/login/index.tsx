import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Href, Redirect, useRouter } from "expo-router";
import { Lock, User } from "lucide-react-native";

import { AuthHeader } from "@/components/auth";
import { AppText, Button, Input, Screen } from "@/components/ui";

import { useAuth } from "@/hooks/useAuth";

import { LoginFormValues, loginSchema } from "../schemas";
import * as S from "../styles";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoggingIn, isAuthenticated, isInitialized } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  if (isInitialized && isAuthenticated) {
    return <Redirect href={"/(tabs)" as Href} />;
  }

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setErrorMessage(null);
      await login(values);
      router.replace("/(tabs)" as Href);
    } catch {
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <Screen scrollable keyboardAvoiding>
      <AuthHeader
        title="Welcome back"
        subtitle="Sign in to continue shopping with ShopSphere."
      />

      {errorMessage ? (
        <S.ErrorBanner>
          <AppText variant="bodySmall" color="danger">
            {errorMessage}
          </AppText>
        </S.ErrorBanner>
      ) : null}

      <S.Form>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Username"
              placeholder="Enter username"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon={User}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.username?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              placeholder="Enter password"
              secureTextEntry
              showPasswordToggle
              leftIcon={Lock}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
            />
          )}
        />

        <Button
          title="Forgot password?"
          variant="ghost"
          onPress={() => router.push("/forgot-password" as Href)}
        />

        <Button
          title="Sign In"
          fullWidth
          loading={isLoggingIn}
          onPress={handleSubmit(onSubmit)}
        />
      </S.Form>

      <S.DividerRow>
        <S.DividerLine />
        <AppText variant="caption" color="textSecondary">
          or continue with
        </AppText>
        <S.DividerLine />
      </S.DividerRow>

      <S.SocialRow>
        <Button title="Continue with Google" variant="outline" fullWidth />
        <Button title="Continue with Apple" variant="outline" fullWidth />
      </S.SocialRow>

      <S.Footer>
        <S.LinkRow>
          <AppText variant="body" color="textSecondary">
            New to ShopSphere?
          </AppText>
          <Button
            title="Create account"
            variant="ghost"
            onPress={() => router.push("/register" as Href)}
          />
        </S.LinkRow>
      </S.Footer>
    </Screen>
  );
}
