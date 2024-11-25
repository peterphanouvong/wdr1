"use client";

import { getOrCreateTimer } from "@/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const StartChallengeButton = () => {
  const router = useRouter();
  const handleStart = async () => {
    await getOrCreateTimer();
    router.push("/api/auth/logout?post_logout_redirect_url=/challenge");
  };

  return <Button onClick={handleStart}>Start challenge</Button>;
};
