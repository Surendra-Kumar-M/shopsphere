import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Mail } from "lucide-react-native";

import {
  AuthErrorBanner,
  AuthForm,
  AuthHeader,
  AuthScreenContainer,
} from "@/components/auth";
import { Button, Input } from "@/shared/components";
import { useAuth } from "@/hooks/useAuth";

import { ForgotPasswordFormValues, forgotPasswordSchema } from "../schemas";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { forgotPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await forgotPassword(values.email);
      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Could not send password reset email. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthScreenContainer>
      <AuthHeader
        title="Forgot password?"
        subtitle="Enter your email and we will send you a password reset link."
      />

      <AuthErrorBanner
        message={errorMessage}
        onDismiss={() => setErrorMessage(null)}
      />

      <AuthErrorBanner
        variant="success"
        message={isSuccess ? "A password reset email has been sent. Please check your inbox." : null}
        onDismiss={() => setIsSuccess(false)}
      />

      <AuthForm>
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

        <Button
          title="Send Reset Link"
          fullWidth
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />

        <Button
          title="Back to sign in"
          variant="ghost"
          onPress={() => router.back()}
        />
      </AuthForm>
    </AuthScreenContainer>
  );
}
