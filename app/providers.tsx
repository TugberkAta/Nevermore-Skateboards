"use client";

import { NextUIProvider } from "@nextui-org/react";

// Wrap to use NextUi components
export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
