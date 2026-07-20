import styled from "@emotion/native";

export const Container = styled.View(({ theme }) => ({
  gap: theme.spacing.md,
}));

export const Grid = styled.View(({ theme }) => ({
  gap: theme.spacing.sm,
}));

export const Row = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: theme.spacing.lg,
  paddingVertical: theme.spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.divider,
}));

export const Label = styled.View({
  flex: 1,
});

export const Value = styled.View({
  flex: 1.2,
  alignItems: "flex-end",
});

export const TagRow = styled.View(({ theme }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: theme.spacing.sm,
}));

export const Tag = styled.View(({ theme }) => ({
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.xs,
  borderRadius: theme.radius.full,
  backgroundColor: theme.colors.divider,
}));
