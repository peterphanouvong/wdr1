import { Leaderboard } from "./leaderboard/leaderboard";
import { StartChallengeButton } from "./start-challenge-button";

const Hero = () => {
  return (
    <div className="text-center pb-32">
      <h2 className="text-[180px] leading-[175px] tracking-tight font-medium">
        Kinde
        <br />
        Speedrun
      </h2>
      <p className="text-2xl text-black mt-16">
        Beat the fastest time and you could win an Exway Ripple electric
        skateboard
      </p>

      <p className="mt-24 leading-[82px] text-7xl font-medium tracking-tight">
        Ready for round 1?
      </p>
      <div className="mt-12">
        <StartChallengeButton />
      </div>

      <hr className="mt-32" />

      <h3 className="mt-24 leading-[82px] text-7xl font-medium tracking-tight mb-12">
        Leaderboard
      </h3>
      <Leaderboard />
    </div>
  );
};

export default async function Page() {
  return (
    <div className="min-h-screen pt-32">
      <Hero />
    </div>
  );
}
