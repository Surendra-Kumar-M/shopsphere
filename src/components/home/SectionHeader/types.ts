import { LucideIcon } from "lucide-react-native";

export interface SectionHeaderProps {
  title: string;

  subtitle?: string;

  actionText?: string;

  actionIcon?: LucideIcon;

  onActionPress?: () => void;
}
