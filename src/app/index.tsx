import { AppText, Avatar, Badge, Button, Card, Icon, Input, Screen, SkeletonLoader, Spinner } from "@/components/ui";
import Divider from "@/components/ui/Divider";
import { Bell, ShoppingCart, Star } from "lucide-react-native";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <Screen scrollable>
      <View style={styles.container}>
        <Text>Edit src/app/index.tsx to edit this screen.</Text>
        <AppText variant="hero" weight="bold">
          ShopSphere
        </AppText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <AppText>Price</AppText>

          <Divider orientation="vertical" />

          <AppText>$120</AppText>
        </View>
        <AppText variant="body">Welcome back!</AppText>
        <Avatar name="Surendra Kumar" />
        <Badge label="SALE" variant="sale" />
        <Badge label="In Stock" variant="inStock" />
        <Badge label="Featured" variant="featured" rightIcon={Star} />
        <Badge label="SALE" variant="sale" />
        <Badge label="NEW" variant="newArrival" />
        <Badge label="In Stock" variant="inStock" />
        <Input label="Email" placeholder="Enter your email" />
        <Spinner size="lg" color="success" />
        <Input
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
        />
        <SkeletonLoader width={200} height={300} radius={4} />
        <Badge label="Free Delivery" variant="freeDelivery" />
        <Button title="Signing In..." loading />
        <Button title="Add to Wishlist" variant="outline" />
        <Button title="Add to Cart" leftIcon={ShoppingCart} />

        <Icon icon={Bell} size={30} />
        <Card variant="elevated">
          <Card.Header>
            <Badge variant="sale" label="50% OFF" />
          </Card.Header>

          <Card.Content>
            {/* <ProductImage /> */}
            <AppText variant="title">Nike Air Max</AppText>
          </Card.Content>

          <Card.Footer>
            <Button title="Add to Cart" />
          </Card.Footer>
        </Card>
        {/* <AppText variant="caption" color={theme.colors.textSecondary}>
        Free delivery available
      </AppText> */}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
