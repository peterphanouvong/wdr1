"use server";

import { createClient } from "@/utils/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshButton } from "./refresh-button";

const supabase = await createClient();

async function getLeaderboardData() {
  const { data, error } = await supabase
    .from("timer-sessions")
    .select("*")
    .not("end_time", "is", null)
    .order("end_time", { ascending: true })
    .limit(10);

  if (error) throw error;
  return data;
}

function calculateDuration(start: string, end: string) {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  return endTime - startTime; // Duration in ms
}

function formatTime(milliseconds: number) {
  const mins = Math.floor(milliseconds / 60000);
  const secs = Math.floor((milliseconds % 60000) / 1000);
  const millis = milliseconds % 1000;

  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}.${millis.toString().padStart(3, "0")}`;
}

export async function Leaderboard() {
  const leaderboardData = await getLeaderboardData();

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <RefreshButton />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
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
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{session.name || "Anonymous"}</TableCell>
                      <TableCell className="font-mono">
                        {session.email || "-"}
                      </TableCell>
                      <TableCell className="font-mono">
                        {formatTime(duration)}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
