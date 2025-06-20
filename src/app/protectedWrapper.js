'use client';

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const publicRoutes = [
  "/login",
  "/login-pin",
  "/forgot-password",
  "/reset-password",
];

export default function ProtectedWrapper({ children }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token && !publicRoutes.includes(pathname)) {
      router.replace("/login");
    } else {
      setMounted(true);
    }
  }, [pathname]);

  if (!mounted) return null;

  return <>{children}</>;
}