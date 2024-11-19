import { Suspense } from "react";
import { Leaderboard } from "./leaderboard";

export default function Page() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Suspense fallback={<div>Loading leaderboard...</div>}>
          <Leaderboard />
        </Suspense>
      </div>
    </div>
  );
}
