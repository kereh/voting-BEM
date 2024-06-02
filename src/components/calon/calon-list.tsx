"use client";

import { RouterOutput } from "@/server/api/root";
import { useAppStore } from "@/stores/app";
import CalonCard from "@/components/calon/calon-card";
import LoadingAnimation from "@/components/loading";

type Calon = {
  data: RouterOutput["calon"]["semua"];
};

export default function CalonList({ data }: Calon) {
  const { isVoting } = useAppStore();

  if (isVoting) {
    return <LoadingAnimation />;
  }

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      {data.map((d) => (
        <CalonCard
          key={d.id}
          id={d.id}
          no={d.no}
          pres={d.pres}
          wapres={d.wapres}
          visi={d.visi}
          misi={d.misi}
        />
      ))}
    </div>
  );
}
