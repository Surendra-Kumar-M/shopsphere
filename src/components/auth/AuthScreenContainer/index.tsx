import { ScreenProps } from "@/shared/components/Screen/types";
import { Screen } from "@/shared/components";

export type AuthScreenContainerProps = ScreenProps;

/**
 * A standardized wrapper for all authentication screens.
 * Ensures consistent safe-area handling, scrollability, and keyboard avoiding behavior.
 */
export default function AuthScreenContainer({
  children,
  scrollable = true,
  keyboardAvoiding = true,
  ...props
}: AuthScreenContainerProps) {
  return (
    <Screen
      scrollable={scrollable}
      keyboardAvoiding={keyboardAvoiding}
      {...props}
    >
      {children}
    </Screen>
  );
}
