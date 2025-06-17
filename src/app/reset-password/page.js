import { Suspense } from "react";
import ResetPasswordClient from "@/components/resetPassword/ResetPassword";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Caricamento...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
