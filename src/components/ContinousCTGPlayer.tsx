import { useEffect, useState } from "react";
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

  const [points, setPoints] = useState<CtgPoint[]>(() => {
    return Array.from({ length: windowSize }).map((_, i) => ({
      timestamp: i,
      fhrBpm: ctgData.hartBasis,
      toco: 20,
    }));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prevData) => {
        const lastToco = prevData[prevData.length - 1]?.toco || 20;

        const nextPoint = ctgService.generateNextPoint(
          ctgData,
          lastToco,
          prevData[prevData.length - 1]?.timestamp ?? 0
        );

        return [...prevData.slice(1), nextPoint];
      });
    }, speed);

    return () => clearInterval(interval);
  }, [speed, ctgData]);

  return <CtgChart data={points} isAnimationActive={false} />;
}