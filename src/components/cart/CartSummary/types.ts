export interface CartSummaryProps {
  itemCount: number;
  subtotal: number;
  loading?: boolean;
  onCheckoutPress?: () => void;
}
