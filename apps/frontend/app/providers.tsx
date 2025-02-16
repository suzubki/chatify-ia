'use client'

import { AuthSessionGuard } from "@/components/guards/auth-session.guard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthSessionGuard>
        {children}
      </AuthSessionGuard>
    </QueryClientProvider>
  );
}