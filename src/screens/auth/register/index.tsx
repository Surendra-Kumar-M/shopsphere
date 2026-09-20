import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Href, Redirect, useRouter } from "expo-router";
import { Lock, Mail, User } from "lucide-react-native";

import {
  AuthErrorBanner,
  AuthForm,
  AuthHeader,
  AuthScreenContainer,
} from "@/components/auth";
import { AppText, Button, Input } from "@/shared/components";

import { useAuth } from "@/hooks/useAuth";

import { RegisterFormValues, registerSchema } from "../schemas";
import * as S from "../styles";

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isRegistering, isAuthenticated, isInitialized } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  if (isInitialized && isAuthenticated) {
    return <Redirect href={"/(tabs)" as Href} />;
  }

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setErrorMessage(null);
      await register(values);
      router.replace("/(tabs)" as Href);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Could not create your account. Please try again.");
      }
    }
  };

  return (
    <AuthScreenContainer>
      <AuthHeader
        title="Create account"
        subtitle="Join ShopSphere and start discovering products you love."
      />

      <AuthErrorBanner
        message={errorMessage}
        onDismiss={() => setErrorMessage(null)}
      />

      <AuthForm>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="First name"
              placeholder="First name"
              leftIcon={User}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.firstName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Last name"
              placeholder="Last name"
              leftIcon={User}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.lastName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              placeholder="Email address"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={Mail}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Username"
              placeholder="Choose a username"
              autoCapitalize="none"
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
              placeholder="Create password"
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

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Confirm password"
              placeholder="Confirm password"
              secureTextEntry
              showPasswordToggle
              leftIcon={Lock}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <Button
          title="Create Account"
          fullWidth
          loading={isRegistering}
          onPress={handleSubmit(onSubmit)}
        />
      </AuthForm>

      <S.Footer>
        <S.LinkRow>
          <AppText variant="body" color="textSecondary">
            Already have an account?
          </AppText>
          <Button
            title="Sign in"
            variant="ghost"
            onPress={() => router.push("/login" as Href)}
          />
        </S.LinkRow>
      </S.Footer>
    </AuthScreenContainer>
  );
}
