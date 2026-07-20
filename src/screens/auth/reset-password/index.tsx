import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import { KeyRound, Lock } from "lucide-react-native";

import { AuthHeader } from "@/components/auth";
import { AppText, Button, Input, Screen } from "@/components/ui";

import { ResetPasswordFormValues, resetPasswordSchema } from "../schemas";
import * as S from "../styles";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSuccessMessage("Password updated successfully. You can sign in now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen scrollable keyboardAvoiding>
      <AuthHeader
        title="Reset password"
        subtitle={
          email
            ? `Enter the code sent to ${email} and choose a new password.`
            : "Enter the verification code and choose a new password."
        }
      />

      {successMessage ? (
        <S.ErrorBanner>
          <AppText variant="bodySmall" color="success">
            {successMessage}
          </AppText>
        </S.ErrorBanner>
      ) : null}

      <S.Form>
        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Verification code"
              placeholder="Enter OTP"
              keyboardType="number-pad"
              leftIcon={KeyRound}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.otp?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="New password"
              placeholder="New password"
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
          title="Update Password"
          fullWidth
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />

        {successMessage ? (
          <Button
            title="Back to sign in"
            variant="outline"
            fullWidth
            onPress={() => router.replace("/login" as Href)}
          />
        ) : null}
      </S.Form>
    </Screen>
  );
}
