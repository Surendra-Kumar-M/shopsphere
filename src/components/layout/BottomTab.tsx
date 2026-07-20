import { ViewStyle } from "react-native";

import { useTheme } from "@emotion/react";
import {
  Home,
  LayoutGrid,
  ShoppingCart,
  Heart,
  User,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/ui";

import { useAppSelector } from "@/store/hooks";
import { selectCartCount } from "@/store/slices/cartSlice";
import { selectWishlistItems } from "@/store/slices/wishlistSlice";

import * as S from "./BottomTab.styles";

interface TabBarProps {
  state: {
    index: number;
    routes: { key: string; name: string }[];
  };
  descriptors: Record<
    string,
    { options: { tabBarAccessibilityLabel?: string } }
  >;
  navigation: {
    emit: (event: {
      type: string;
      target: string;
      canPreventDefault?: boolean;
    }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
}

interface TabConfig {
  routeName: string;
  label: string;
  icon: typeof Home;
}

const TABS: TabConfig[] = [
  { routeName: "index", label: "Home", icon: Home },
  { routeName: "categories", label: "Categories", icon: LayoutGrid },
  { routeName: "cart", label: "Cart", icon: ShoppingCart },
  { routeName: "wishlist", label: "Wishlist", icon: Heart },
  { routeName: "profile", label: "Profile", icon: User },
];

export default function BottomTab({
  state,
  descriptors,
  navigation,
}: TabBarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const cartCount = useAppSelector(selectCartCount);
  const wishlistItems = useAppSelector(selectWishlistItems);

  const containerStyle: ViewStyle = {
    paddingBottom: Math.max(insets.bottom, theme.spacing.sm),
  };

  const getBadgeCount = (routeName: string) => {
    if (routeName === "cart") return cartCount;
    if (routeName === "wishlist") return wishlistItems.length;
    return 0;
  };

  return (
    <S.Container style={containerStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const tab = TABS.find((item) => item.routeName === route.name);

        if (!tab) return null;

        const isFocused = state.index === index;
        const badgeCount = getBadgeCount(route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const Icon = tab.icon;
        const color = isFocused
          ? theme.colors.primary
          : theme.colors.textSecondary;

        return (
          <S.TabButton
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel ?? tab.label}
            onPress={onPress}
            onLongPress={onLongPress}>
            <S.IconWrapper>
              <Icon size={22} color={color} strokeWidth={isFocused ? 2.5 : 2} />

              {badgeCount > 0 ? (
                <S.Badge>
                  <AppText variant="caption" weight="bold" color="white">
                    {badgeCount > 99 ? "99+" : badgeCount}
                  </AppText>
                </S.Badge>
              ) : null}
            </S.IconWrapper>

            <AppText
              variant="caption"
              weight={isFocused ? "semibold" : "medium"}
              color={isFocused ? "primary" : "textSecondary"}>
              {tab.label}
            </AppText>
          </S.TabButton>
        );
      })}
    </S.Container>
  );
}
