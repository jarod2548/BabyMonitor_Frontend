import { useEffect, useRef, useState } from "react";
import type { CtgPoint } from "../contracts/ctgpoint";
import { ctgService } from "../Services/CTGGeneratorService";
import CtgChart from "./CtgChart/CtgChart";
import type { ctgData } from "../contracts/ctgData";

type Props = {
  ctgData: ctgData;
  multiplier?: number;
};

export default function ContinuousCTGPlayer({
  ctgData,
  multiplier = 1,
}: Props) {
  const TIME_STEP = 250;

  const visiblePoints = 240;

  const [points, setPoints] = useState<CtgPoint[]>(() => {
    return Array.from({ length: visiblePoints }, (_, i) => ({
      x: i,
      timestamp: i * TIME_STEP,
      fhrBpm: ctgData.hartbasis,
      toco: 20,
    }));
  });

  const timeRef = useRef(visiblePoints * TIME_STEP);

  useEffect(() => {
    const intervalDelay = TIME_STEP / multiplier;

    const interval = setInterval(() => {
      setPoints((prev) => {

       const nextPoint = ctgService.generateNextPoint(
        ctgData,
        timeRef.current
      );

        timeRef.current += TIME_STEP;

        const shifted = prev
          .slice(1)
          .map((p) => ({
            ...p,
            x: p.x - 1,
          }));

        shifted.push({
          ...nextPoint,
          x: visiblePoints - 1,
        });

        return shifted;
      });
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [multiplier, ctgData]);

  return <CtgChart data={points} />;
}