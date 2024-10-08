import { api } from "@/trpc/server";
import { auth } from "auth";
import CalonList from "@/components/calon/calon-list";
import UserDetail from "@/components/user/user-detail";

export default async function Page() {
  const data = await api.calon.semua();
  const session = await auth();

  return (
    <div className="my-7 grid w-full place-content-center space-y-10 md:-my-7 md:h-screen">
      <UserDetail
        name={session?.user.name?.toUpperCase() ?? ""}
        nim={session?.user.nim ?? ""}
      />
      <CalonList data={data} />
    </div>
  );
}
