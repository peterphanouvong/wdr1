import { createClient } from "@/utils/supabase/server";

export default async function Test() {
  const supabase = await createClient();
  const { data: timerSessions } = await supabase
    .from("timer-sessions")
    .select("*");

  return (
    <div>
      Test<pre>{JSON.stringify(timerSessions, null, 2)}</pre>
    </div>
  );
}
