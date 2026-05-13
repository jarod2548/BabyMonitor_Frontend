import { useEffect, useRef, useState } from "react";
import type { CtgPoint } from "../contracts/ctgpoint";
import { ctgService } from "../Services/CTGGeneratorService";
import CtgChart from "./CtgChart/CtgChart";
import type { ctgData } from "../contracts/ctgData";

type Props = {
  ctgData: ctgData;
  speed?: number;
};

export default function ContinuousCTGPlayer({
  ctgData,
  speed = 500,
}: Props) {
  const windowSize = 50;
  const indexRef = useRef(windowSize);
  

  // holds real start time (set inside useEffect)

  const [points, setPoints] = useState<CtgPoint[]>(() =>
  Array.from({ length: windowSize }).map((_, i) => ({
    timestamp: i,
    fhrBpm: ctgData.hartBasis,
    toco: 20,
  }))
);

useEffect(() => {

  const interval = setInterval(() => {
    setPoints((prev) => {
      const lastToco = prev[prev.length - 1]?.toco ?? 20;

      const nextPoint = ctgService.generateNextPoint(
        ctgData,
        lastToco,
        indexRef.current++
      );

      return [...prev.slice(1), nextPoint];
    });
  }, speed);

  return () => clearInterval(interval);
}, [speed, ctgData]);

  return <CtgChart data={points} isAnimationActive={false} />;
}