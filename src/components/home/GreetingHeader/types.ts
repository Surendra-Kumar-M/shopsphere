export interface GreetingHeaderProps {
  userName: string;

  greeting?: string;

  avatar?: string;

  notificationCount?: number;

  onAvatarPress?: () => void;

  onNotificationPress?: () => void;

  onScanPress?: () => void;
}

export const DEFAULT_GREETING = "Good Morning";