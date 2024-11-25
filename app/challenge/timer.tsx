"use client";
import { getMostRecentSession, getTimer } from "@/actions";
import { calculateDuration } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Timer = () => {
  const searchParams = useSearchParams();

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(!searchParams.has("login"));
  const [isLoading, setIsLoading] = useState(true);
  const [finalTime, setFinalTime] = useState<string | null>(null);

  useEffect(() => {
    const initFinalTime = async () => {
      const mostRecentSession = await getMostRecentSession();
      if (!mostRecentSession) {
        return;
      }
      setFinalTime(
        formatTime(
          calculateDuration(
            mostRecentSession.start_time,
            mostRecentSession.end_time!
          )
        )
      );
    };

    initFinalTime();
  }, []);

  useEffect(() => {
    const initTimer = async () => {
      const session = await getTimer();

      if (!session) {
        return;
      } else {
        if (session.id !== sessionId) {
          setSessionId(session.id);
          return;
        }
      }

      // Calculate initial elapsed time from start_time
      const startTime = new Date(session.start_time).getTime();
      const initialElapsed = Math.floor(Date.now() - startTime);
      setElapsed(initialElapsed);
      setIsRunning(true);
    };

    initTimer();
    setIsLoading(false);
  }, [sessionId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsed((prev) => prev + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  function formatTime(milliseconds: number) {
    const mins = Math.floor(milliseconds / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    const millis = milliseconds % 1000;

    return `${mins.toString().padStart(2, "0")}.${secs
      .toString()
      .padStart(2, "0")}.${millis.toString().padStart(2, "0")}`;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p className="text-lg tracking-tight mt-24">
        {isRunning ? "The clock is running" : "Your time was"}
      </p>
      <p className="text-[180px] leading-[175px] tracking-tighter mt-4 font-mono ">
        {isRunning ? formatTime(elapsed) : finalTime}
      </p>
    </div>
  );
};
