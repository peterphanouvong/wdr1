// TODO: Use the LoginLink instead of an <a>
// https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/#sign-up-and-sign-in

import { Button } from "@/components/ui/button";

export const LoginButton = () => {
  return (
    <Button asChild>
      <a href="#">Login</a>
    </Button>
  );
};
