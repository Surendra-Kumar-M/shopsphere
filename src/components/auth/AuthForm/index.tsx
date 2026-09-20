import styled from "@emotion/native";

/**
 * A standardized form container that ensures consistent vertical spacing
 * between input fields and buttons in authentication flows.
 */
const AuthForm = styled.View(({ theme }) => ({
  gap: theme.spacing.lg,
}));

export default AuthForm;
