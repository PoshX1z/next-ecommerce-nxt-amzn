import { usePathname } from "next/navigation";
import useDeviceType from "./useDeviceType";
import useCartStore from "./useCartStore";

const isNotInPaths = (s: string) =>
  !/^\/$|^\/cart$|^\/checkout$|^\/sign-in$|^\/sign-up$|^\/order(\/.*)?$|^\/account(\/.*)?$|^\/admin(\/.*)?$/.test(
    s
  );
const useCartSidebar = () => {
  const {
    cart: { items },
  } = useCartStore();
  const deviceType = useDeviceType();
  const currentPath = usePathname();

  return (
    items.length > 0 && deviceType === "desktop" && isNotInPaths(currentPath)
  );
};

export default useCartSidebar;
