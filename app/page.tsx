import Search from "@/components/shared/header/Search";
import Menu from "@/components/shared/header/Menu";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Search />
      <Menu />
      <Button>Button</Button>
    </div>
  );
}
