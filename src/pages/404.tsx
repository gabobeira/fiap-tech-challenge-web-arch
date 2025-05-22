"use client";
import { NotFound } from "@/components";
import { light } from "@/components/theme";
import ThemeProviderWrapper from "@/theme/ThemeProviderWrapper";
import { useRouter } from "next/navigation";

export default function NotFoundView() {
  const router = useRouter();

  const redirectToHome = () => {
    router.push("/");
  };

  return (
    <ThemeProviderWrapper mode={light}>
      <NotFound onBack={redirectToHome} />
    </ThemeProviderWrapper>
  );
}
