"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./utils/supabase/server";
import { Users, init } from "@kinde/management-api-js";

type TimerSession = {
  id: string;
  start_time: string;
  stop_time: string | null;
};

export async function getTimer() {
  const supabase = await createClient();
  const { data: timerSession, error } = await supabase
    .from("timer-sessions")
    .select("*")
    .is("end_time", null)
    .order("start_time", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No active session
      console.log("No active session");
      return null;
    }
    throw error;
  }
  return timerSession as TimerSession;
}

export async function getOrCreateTimer() {
  const supabase = await createClient();
  // First, try to get the most recent active session (where stop_time is null)
  const { data: existingSession, error: fetchError } = await supabase
    .from("timer-sessions")
    .select("*")
    .is("end_time", null)
    .order("start_time", { ascending: false })
    .limit(1)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116 is the "no rows returned" error
    throw fetchError;
  }

  if (existingSession) {
    return existingSession as TimerSession;
  }
  const startTime = new Date().toISOString();
  const { data: newSession, error: insertError } = await supabase
    .from("timer-sessions")
    .insert([{ start_time: startTime }])
    .select("*")
    .single();

  if (insertError) throw insertError;
  return newSession as TimerSession;
}

export async function startTimer() {
  const supabase = await createClient();
  const startTime = new Date().toISOString();

  const { data: newSession, error } = await supabase
    .from("timer-sessions")
    .insert([{ start_time: startTime }])
    .select("*")
    .single();

  if (error) throw error;
  return newSession as TimerSession;
}

export async function stopTimer({
  sessionId,
  userId,
}: {
  sessionId?: string;
  userId: string;
}) {
  const supabase = await createClient();
  const stopTime = new Date().toISOString();

  init();
  const { first_name, last_name, preferred_email } = await Users.getUserData({
    id: userId,
  });

  if (!sessionId) {
    // If no sessionId is provided, stop the most recent active session
    const { data: mostRecentSession, error } = await supabase
      .from("timer-sessions")
      .select("id")
      .is("end_time", null)
      .order("start_time", { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    if (!mostRecentSession) return;
    sessionId = mostRecentSession.id;
  }

  const { error } = await supabase
    .from("timer-sessions")
    .update({
      end_time: stopTime,
      name: `${first_name} ${last_name}`,
      email: preferred_email,
    })
    .eq("id", sessionId);

  if (error) throw error;

  revalidatePath("/", "layout");
  return stopTime;
}
