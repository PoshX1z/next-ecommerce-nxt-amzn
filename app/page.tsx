import Search from "@/components/shared/header/Search";
import Menu from "@/components/shared/header/Menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Search />
      <Menu />
      <Button>Button</Button>
    </div>
  );
}
