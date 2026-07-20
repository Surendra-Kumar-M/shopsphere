import { Search, SlidersHorizontal } from "lucide-react-native";

import { Button, Input } from "@/components/ui";

import { SearchBarProps } from "./types";

import * as S from "./styles";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search products...",
  onFilterPress,
  onSubmit,
}: SearchBarProps) {
  return (
    <S.Container>
      <Input
        value={value}
        placeholder={placeholder}
        leftIcon={Search}
        rightIcon={SlidersHorizontal}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        onRightIconPress={onFilterPress}
        returnKeyType="search"
      />
    </S.Container>
  );
}
