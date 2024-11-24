"use client";

import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";

export const RefreshButton = () => {
  return (
    <Button
      onClick={() => {
        window.location.reload();
      }}
      variant={"outline"}
    >
      <RefreshCwIcon /> Refresh
    </Button>
  );
};
