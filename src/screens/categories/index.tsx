import { SearchBar } from "@/components/home";
import { CategoryFeatured, CategoryGrid } from "@/components/category";
import { AppText, Button, Screen } from "@/shared/components";

import { useCategories } from "@/hooks/useCategories";

import * as S from "./styles";

export default function CategoriesScreen() {
  const {
    categories,
    featuredCategories,
    totalCount,
    filteredCount,
    search,
    loading,
    refreshing,
    error,
    refetch,
    handleCategoryPress,
    handleSearch,
    handleClearSearch,
  } = useCategories();

  if (error && !loading && categories.length === 0) {
    return (
      <Screen>
        <S.ErrorContainer>
          <AppText variant="title" weight="bold" align="center">
            Could not load categories
          </AppText>
          <AppText variant="body" color="textSecondary" align="center">
            Check your connection and try again.
          </AppText>
          <Button title="Retry" onPress={refetch} />
        </S.ErrorContainer>
      </Screen>
    );
  }

  return (
    <Screen scrollable refreshing={refreshing} onRefresh={refetch}>
      <S.Header>
        <AppText variant="h1" weight="bold">
          Categories
        </AppText>
        <AppText variant="body" color="textSecondary">
          Browse {totalCount} collections and discover products you love.
        </AppText>
      </S.Header>

      <S.SearchSection>
        <SearchBar
          value={search}
          onChangeText={handleSearch}
          placeholder="Search categories..."
        />
      </S.SearchSection>

      {!search.trim() ? (
        <S.Section>
          <CategoryFeatured
            categories={featuredCategories}
            onCategoryPress={handleCategoryPress}
          />
        </S.Section>
      ) : null}

      <S.Section>
        <S.SectionHeading>
          <AppText variant="title" weight="bold">
            {search.trim() ? "Results" : "All Categories"}
          </AppText>

          <AppText variant="caption" color="textSecondary">
            {filteredCount} {filteredCount === 1 ? "category" : "categories"}
          </AppText>
        </S.SectionHeading>

        <CategoryGrid
          categories={categories}
          loading={loading}
          onCategoryPress={handleCategoryPress}
        />
      </S.Section>

      {search.trim() && filteredCount === 0 && !loading ? (
        <Button title="Clear search" variant="outline" onPress={handleClearSearch} />
      ) : null}
    </Screen>
  );
}
