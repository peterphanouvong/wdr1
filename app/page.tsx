import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";
import { Leaderboard } from "./leaderboard/leaderboard";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { Timer } from "./timer";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between pb-6">
          <h1 className="text-lg font-semibold tracking-tight">
            Kinde Web Directions 2024
          </h1>
          {user ? <LogoutButton /> : <LoginButton />}
        </div>
        <Timer />
        <Suspense fallback={<div>Loading leaderboard...</div>}>
          <Leaderboard />
        </Suspense>
      </div>
    </div>
  );
}
