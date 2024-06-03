"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/login-schema";
import { login } from "@/app/actions/credential-login";
import { AlertOctagon } from "lucide-react";
import { useTransition } from "react";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogIn, LineChart } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [isPending, setTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      nim: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          form.reset();
          return toast({
            title: "Login Gagal",
            description: data.error,
            variant: "destructive",
          });
        }
        console.log(data);
        return toast({
          title: "Login Berhasil",
          description: `Silahkan memilih 😊`,
        });
      });
    });
  }

  return (
    <div className="grid h-[85vh] w-full place-content-center md:h-screen">
      <div className="w-full space-y-4 md:max-w-xs">
        <Alert>
          <AlertOctagon className="h-4 w-4" />
          <AlertTitle>Harap Dibaca!</AlertTitle>
          <AlertDescription>
            Setelah login NIM tidak bisa digunakan untuk login kembali.
          </AlertDescription>
        </Alert>
        <Card>
          <CardHeader>
            <CardTitle>BEM Voting</CardTitle>
            <CardDescription>
              Silahkan login terlebih dahulu sebelum melakukan voting
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <FormField
                  control={form.control}
                  name="nim"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Induk Mahasiswa</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="....."
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Silahkan masukan NIM dengan benar.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="items-center gap-3">
                <Button
                  type="submit"
                  className="flex w-full items-center gap-3"
                  disabled={isPending}
                  variant="default"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
                <Link href="/hasil" className="w-full">
                  <Button
                    className="flex w-full items-center gap-3"
                    variant="secondary"
                    disabled={isPending}
                  >
                    <LineChart className="h-4 w-4" />
                    <span>Halaman Hasil</span>
                  </Button>
                </Link>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
