"use client";

import { getOrCreateTimer } from "@/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const StartChallengeButton = (props: { isLoggedIn: boolean }) => {
  const router = useRouter();
  const handleStart = async () => {
    await getOrCreateTimer();
    if (props.isLoggedIn) {
      router.push("/api/auth/logout?post_logout_redirect_url=/challenge");
    } else {
      router.push("/challenge");
    }
  };

  return <Button onClick={handleStart}>Start challenge</Button>;
};
