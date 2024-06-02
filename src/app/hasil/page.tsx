"use client";

import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import LoadingAnimation from "@/components/loading";

export default function Page() {
  const { data, isLoading } = api.calon.semua.useQuery(undefined, {
    refetchInterval: 30000,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: 120000,
  });
  const { data: pemilih, isLoading: loadingPemilih } =
    api.users.jumlah.useQuery(undefined, {
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  if (isLoading || loadingPemilih)
    return (
      <div className="grid h-screen place-content-center">
        <LoadingAnimation />
      </div>
    );

  return (
    <div className="grid h-[85vh] w-full place-content-center md:h-screen">
      <div className="w-full md:max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Hasil Suara</CardTitle>
            <CardDescription>
              Berikut merupakan hasil perolehan suara.{" "}
              <span className="font-semibold">
                Data diperbarui otomatis tiap 30 detik.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {data?.map((d, i) => (
              <div key={i} className="space-y-3">
                <div className="flex flex-col text-sm">
                  <h1 className="font-semibold">
                    Presiden BEM : <span className="font-normal">{d.pres}</span>
                  </h1>
                  <h1 className="font-semibold">
                    Wakil Presiden BEM :{" "}
                    <span className="font-normal">{d.wapres}</span>
                  </h1>
                </div>
                <Progress value={d.suara.length} max={600} />
                <div className="flex items-center justify-end">
                  <Badge className="text-md" variant="outline">
                    {d.suara.length} / {pemilih}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="justify-center">
            <Link href="/login">
              <Button variant="secondary">Halaman Login</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
