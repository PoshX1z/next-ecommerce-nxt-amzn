/* Dynamic route for item id (Ex: cart/4235, cart/9243). */
import CartAddItem from "./CartAddItem";

export default async function CartAddItemPage(props: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = await props.params;

  return <CartAddItem itemId={itemId} />;
}
