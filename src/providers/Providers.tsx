"use client";

import { SessionProvider } from "next-auth/react";

// interface ParamsType {
//   session?: any; // zamień `any` na właściwy typ sesji, jeśli znasz
// }

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SessionProvider>{children} </SessionProvider>;
};

export default Providers;
