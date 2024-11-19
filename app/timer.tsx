"use client";

import { getTimer, startTimer } from "@/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";

export const Timer = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

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

  const handleStart = async () => {
    const newSession = await startTimer();
    setSessionId(newSession.id);
  };

  function formatTime(milliseconds: number) {
    const mins = Math.floor(milliseconds / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    const millis = milliseconds % 1000;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}.${millis.toString().padStart(2, "0")}`;
  }

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <Card className="w-96">
        <CardHeader></CardHeader>
        <CardContent>
          <div className="text-6xl font-mono text-center mb-8">
            {formatTime(elapsed)}
          </div>

          {!sessionId && (
            <Button className="w-full" onClick={handleStart}>
              Start challenge
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
