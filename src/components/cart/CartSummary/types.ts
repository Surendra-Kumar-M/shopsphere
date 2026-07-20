export interface CartSummaryProps {
  itemCount: number;
  subtotal: number;
  onCheckoutPress?: () => void;
}
