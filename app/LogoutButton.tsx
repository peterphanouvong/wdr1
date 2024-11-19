// TODO: Use the LogoutLink instead of an <a>
// https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/#logout

import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  return (
    <Button variant={"outline"} asChild>
      <a href="#">Logout</a>
    </Button>
  );
};
