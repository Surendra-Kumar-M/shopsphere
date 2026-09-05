import {

  GreetingHeader,

  SearchBar,

  PromoBanner,

  CategorySection,

} from "@/components/home";



import { ProductSection } from "@/components/product";



import { AppText, Button, Screen } from "@/shared/components";



import { useHome } from "@/hooks/useHome";



import * as S from "./styles";



export default function HomeScreen() {

  const {

    user,

    search,

    banner,

    categories,

    products,

    isSearching,

    productSectionTitle,

    wishlistedIds,

    loading,

    loadingMore,

    error,

    refreshing,

    refetch,

    handleSearch,

    handleClearSearch,

    handleCategoryPress,

    handleProductPress,

    handleWishlistPress,

    handleAddToCart,

    handleBannerPress,

    handleSeeAllProducts,

    handleLoadMoreProducts,

  } = useHome();



  if (error && !loading && products.length === 0) {

    return (

      <Screen>

        <S.ErrorContainer>

          <AppText variant="title" weight="bold" align="center">

            Something went wrong

          </AppText>



          <S.ErrorMessage>

            <AppText variant="body" color="textSecondary" align="center">

              We could not load products. Please try again.

            </AppText>

          </S.ErrorMessage>



          <S.ErrorAction>

            <Button title="Retry" onPress={refetch} />

          </S.ErrorAction>

        </S.ErrorContainer>

      </Screen>

    );

  }



  return (

    <Screen scrollable refreshing={refreshing} onRefresh={refetch}>

      <GreetingHeader

        userName={user.name}

        avatar={user.avatar}

        notificationCount={user.notificationCount}

      />



      <SearchBar
        value={search}
        onChangeText={handleSearch}
      />



      {!isSearching ? (

        <>

          <PromoBanner

            title={banner.title}

            subtitle={banner.subtitle}

            buttonText={banner.buttonText}

            image={banner.image}

            onPress={handleBannerPress}

          />



          <CategorySection

            categories={categories}

            loading={loading}

            onCategoryPress={handleCategoryPress}

            onSeeAllPress={handleSeeAllProducts}

          />

        </>

      ) : null}



      <ProductSection

        title={productSectionTitle}

        products={products}

        loading={loading}

        loadingMore={loadingMore}

        wishlistedIds={wishlistedIds}

        onProductPress={handleProductPress}

        onWishlistPress={handleWishlistPress}

        onAddToCartPress={handleAddToCart}

        onSeeAllPress={isSearching ? undefined : handleSeeAllProducts}

        onEndReached={handleLoadMoreProducts}

      />



      {!loading && products.length === 0 ? (

        <S.EmptySearch>

          <AppText variant="body" color="textSecondary" align="center">

            {isSearching

              ? "No products match your search."

              : "No products found"}

          </AppText>



          {isSearching ? (

            <Button title="Clear search" variant="outline" onPress={handleClearSearch} />

          ) : null}

        </S.EmptySearch>

      ) : null}

    </Screen>

  );

}


