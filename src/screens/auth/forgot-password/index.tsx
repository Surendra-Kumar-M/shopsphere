import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Href, useRouter } from "expo-router";
import { Mail } from "lucide-react-native";

import { AuthHeader } from "@/components/auth";
import { AppText, Button, Input, Screen } from "@/components/ui";

import { ForgotPasswordFormValues, forgotPasswordSchema } from "../schemas";
import * as S from "../styles";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      router.push({
        pathname: "/reset-password",
        params: { email: values.email },
      } as Href);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen scrollable keyboardAvoiding>
      <AuthHeader
        title="Forgot password?"
        subtitle="Enter your email and we will send you a verification code."
      />

      <S.Form>
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
          title="Send Code"
          fullWidth
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />

        <Button
          title="Back to sign in"
          variant="ghost"
          onPress={() => router.back()}
        />
      </S.Form>
    </Screen>
  );
}
