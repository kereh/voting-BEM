"use client";

import { useAppStore } from "@/stores/app";

type Props = {
  name: string;
  nim: string;
};

export default function UserDetail({ name, nim }: Props) {
  const { isVoting } = useAppStore();
  return (
    <div>
      {!isVoting && (
        <div className="md:text-center">
          <h1 className="font-semibold">Selamat datang</h1>
          <h2 className="text-muted-foreground">
            {name} - {nim}
          </h2>
        </div>
      )}
    </div>
  );
}
