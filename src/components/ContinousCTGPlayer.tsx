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
  const TIME_STEP = 250;

  const secondsToDisplay = 60;
  const pointsInWindow = (secondsToDisplay * 1000) / TIME_STEP;
  const indexRef = useRef((pointsInWindow - 1) * TIME_STEP);
  // holds real start time (set inside useEffect)

  const [points, setPoints] = useState<CtgPoint[]>(() =>
  Array.from({ length: pointsInWindow}).map((_, i) => ({
    timestamp: i * TIME_STEP,
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
        indexRef.current
      );

      indexRef.current += TIME_STEP;

      const newArray = [...prev, nextPoint];

      return newArray.slice(-pointsInWindow); 
    });
  }, speed);

  return () => clearInterval(interval);
}, [speed, ctgData, pointsInWindow]);

  return <CtgChart data={points} isAnimationActive={false}/>;
}