export interface SearchBarProps {
  value: string;

  onChangeText: (text: string) => void;

  placeholder?: string;

  onFilterPress?: () => void;

  onSubmit?: () => void;
}
