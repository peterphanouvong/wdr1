"use server";

import { getLeaderboardData } from "@/actions";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { calculateDuration, formatTime, ordinalSuffixOf } from "@/lib/utils";
import { LeftOrnamentIcon, RightOrnamentIcon } from "./ornament-icon";

export async function Leaderboard() {
  const leaderboardData = await getLeaderboardData();

  return (
    <div>
      <Command>
        <div className="border rounded-lg overflow-hidden max-w-md w-full mx-auto mb-12">
          <CommandInput
            className="border-none"
            placeholder="Search by competitor"
          ></CommandInput>
        </div>
        <CommandList className="max-w-[700px] w-full py-4 mx-auto">
          {leaderboardData
            .sort((a, b) => {
              return (
                calculateDuration(a.start_time, a.end_time) -
                calculateDuration(b.start_time, b.end_time)
              );
            })
            .map((session, index) => {
              const duration = calculateDuration(
                session.start_time,
                session.end_time
              );
              return (
                <CommandItem key={session.id} className="w-full">
                  <div className="justify-between flex items-center py-4 gap-2 w-full font-medium">
                    <div className="flex gap-16 items-center">
                      <div className="flex items-center justify-center text-center w-20 text-sm">
                        {index === 0 && <LeftOrnamentIcon />}
                        <span className="pb-1">
                          {ordinalSuffixOf(index + 1)}
                        </span>
                        {index === 0 && <RightOrnamentIcon />}
                      </div>
                      <div className="flex-shrink text-xl">
                        {session.name || "Anonymous"}
                      </div>
                    </div>
                    <div className="text-xl">{formatTime(duration)}</div>
                  </div>
                </CommandItem>
              );
            })}
        </CommandList>
      </Command>
    </div>
  );
}
