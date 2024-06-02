import { api } from "@/trpc/server";
import CalonList from "@/components/calon/calon-list";

export default async function Page() {
  const data = await api.calon.semua();

  return (
    <div className="grid h-[85vh] w-full place-content-center md:h-screen">
      <CalonList data={data} />
    </div>
  );
}
