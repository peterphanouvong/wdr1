import { Button } from "@/components/ui/button";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Timer } from "./timer";
import { Leaderboard } from "../leaderboard/leaderboard";
import { calculateDuration, ordinalSuffixOf } from "@/lib/utils";
import { getLeaderboardData, getMostRecentSession } from "@/actions";
import { ChevronLeft } from "lucide-react";

export default async function ChallengePage(props: {
  searchParams: {
    login?: string;
  };
}) {
  const mostRecentSession = await getMostRecentSession();
  const allSessions = await getLeaderboardData();
  const rank = ordinalSuffixOf(
    allSessions
      .sort((a, b) => {
        return (
          calculateDuration(a.start_time, a.end_time) -
          calculateDuration(b.start_time, b.end_time)
        );
      })
      .findIndex((session) => session.id === mostRecentSession.id) + 1
  );

  return (
    <div className="pb-32">
      {props.searchParams.login === "true" && (
        <Button
          asChild
          size="sm"
          variant={"ghost"}
          className="absolute left-4 top-4"
        >
          <LogoutLink postLogoutRedirectURL="/">
            <ChevronLeft className="mr-2" /> Home
          </LogoutLink>
        </Button>
      )}

      <div className="text-center">
        <h2 className="font-medium text-6xl tracking-tighter mt-24">
          Kinde
          <br />
          Speedrun
        </h2>

        <Timer />

        <div className="mt-24">
          {props.searchParams.login === "true" ? (
            <p className="leading-[82px] text-7xl font-medium tracking-tight mb-12 text-center">
              Congrats!
              <br />
              You ranked {rank}
            </p>
          ) : (
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
          )}
        </div>
      </div>

      <hr className="mt-32" />

      <h3 className="mt-24 leading-[82px] text-7xl font-medium tracking-tight mb-12 text-center">
        Leaderboard
      </h3>
      <Leaderboard />
    </div>
  );
}
