import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { isCheckingout, checkout } = useCheckout();

  return (
    <Button
      disabled={isCheckingout}
      onClick={() => {
        console.log(bookingId);
        checkout(bookingId);
      }}
      variation="primary"
      size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
