import HomeCarousal from "@/components/shared/home/HomeCarousal";
import data from "@/lib/data";

export default async function Page() {
  return (
    <div>
      <HomeCarousal items={data.carousels} />
    </div>
  );
}
