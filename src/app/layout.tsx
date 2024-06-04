import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import { GeistSans } from "geist/font/sans";
import { Theme } from "@/components/theme";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "UNSRIT BEM Voting",
  description: "Aplikasi voting BEM UNSRIT",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body className="container">
        <Theme defaultTheme="dark" attribute="class" disableTransitionOnChange>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </Theme>
        <Toaster />
      </body>
    </html>
  );
}

//export const dynamic = 'force-dynamic'
