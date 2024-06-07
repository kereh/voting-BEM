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
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
  const { data: pemilih, isLoading: loadingPemilih } =
    api.users.jumlah.useQuery(undefined, {
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  if (isLoading || loadingPemilih)
    return (
      <div className="grid h-[85vh] md:h-screen place-content-center">
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
              Berikut merupakan hasil perolehan suara. Data diperbarui otomatis
              tiap 1 menit atau anda bisa refresh halaman ini.
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
                <Progress value={d.suara.length} max={d.suara.length} />
                <div className="flex items-center justify-end">
                  <Badge className="text-sm" variant="secondary">
                    {d.suara.length} / {pemilih}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="justify-center">
            <Link href="/login" className="w-full">
              <Button className="w-full">Halaman Login</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
