"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Vote, Info } from "lucide-react";
import { api } from "@/trpc/react";
import { signOut } from "next-auth/react";
import { useAppStore } from "@/stores/app";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

type CalonIdentity = {
  id: string;
  no: string;
  pres: string;
  wapres: string;
  visi: string | null;
  misi: string[] | null;
};

export default function CalonCard({
  id,
  no,
  pres,
  wapres,
  visi,
  misi,
}: CalonIdentity) {
  const { toast } = useToast();
  const { updateIsVoting } = useAppStore();
  const voteMutation = api.calon.vote.useMutation({
    onSuccess: () => {
      toast({
        title: "Voting Berhasil",
        description: `Terima Kasih Sudah Memilih 😊`,
      });
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center underline underline-offset-4">
          {no}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow className="border-0">
              <TableCell className="font-medium">Presiden BEM</TableCell>
              <TableCell>:</TableCell>
              <TableCell className="text-left font-semibold">{pres}</TableCell>
            </TableRow>
            <TableRow className="border-0">
              <TableCell className="font-medium">Wakil Presiden BEM</TableCell>
              <TableCell>:</TableCell>
              <TableCell className="text-left font-semibold">
                {wapres}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="gap-3 md:flex-row">
        <Button
          className="flex w-full items-center gap-3"
          onClick={() => {
            updateIsVoting(true);
            voteMutation.mutate({ calon: id });
          }}
        >
          <Vote />
          <span>Vote</span>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="flex w-full items-center gap-3"
              variant="secondary"
            >
              <Info className="h-5 w-5" />
              <span>Visi & Misi</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="my-5 flex flex-col gap-5">
              <div className="space-y-3 leading-relaxed">
                <h1 className="text-md font-semibold underline underline-offset-4">
                  Visi
                </h1>
                <p className="text-sm text-muted-foreground md:text-base">
                  {visi}
                </p>
              </div>
              <div className="space-y-3 leading-relaxed">
                <h1 className="underline-0ffset-4 text-md font-semibold underline">
                  Misi
                </h1>
                <ScrollArea className="h-[450px] w-full rounded-md border px-4 py-2 md:h-[350px]">
                  <ul>
                    {misi?.map((m, i) => (
                      <li
                        key={i}
                        className="my-3 text-sm text-muted-foreground md:text-base"
                      >
                        [{i + 1}]. {m}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  );
}
