import { Screen } from "@/components/ui";

import {
  GreetingHeader,
  SearchBar,
  PromoBanner,
  CategorySection,
  ProductSection,
} from "@/components/home";

import { useHome } from "@/hooks/useHome";

export default function HomeScreen() {
  const {
    user,
    search,
    banner,
    categories,
    products,
    selectedCategory,

    handleSearch,
    handleCategoryPress,
    handleProductPress,
    handleWishlistPress,
    handleAddToCart,
    handleBannerPress,
    handleSeeAllProducts,
  } = useHome();

  return (
    <Screen scrollable>
      <GreetingHeader
        userName={user.name}
        avatar={user.avatar}
        notificationCount={user.notificationCount}
      />

      <SearchBar value={search} onChangeText={handleSearch} />

      <PromoBanner
        title={banner.title}
        subtitle={banner.subtitle}
        buttonText={banner.buttonText}
        image={banner.image}
        onPress={handleBannerPress}
      />

      <CategorySection
        categories={categories}
        selectedCategorySlug={selectedCategory}
        onCategoryPress={handleCategoryPress}
      />

      <ProductSection
        products={products}
        onProductPress={handleProductPress}
        onWishlistPress={handleWishlistPress}
        onAddToCartPress={handleAddToCart}
        onSeeAllPress={handleSeeAllProducts}
      />
    </Screen>
  );
}
