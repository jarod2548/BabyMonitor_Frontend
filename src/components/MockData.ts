import type { CtgPoint } from "../contracts/ctgpoint";

  const DEFAULT_POINT_COUNT = 72;

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  export function generateMockCtgData(
    pointCount = DEFAULT_POINT_COUNT,
  ): CtgPoint[] {

    return Array.from({ length: pointCount }, (_, index) => {
      const wave = index / 6;
      const contractionWave = Math.max(0, Math.sin(index / 8)) * 45;
      const baselineToco = 12 + Math.sin(wave / 2) * 4;
      const toco = clamp(
        Math.round(baselineToco + contractionWave + Math.sin(index / 3) * 3),
        0,
        100,
      );

      const baselineHeartRate = 140 + Math.sin(wave) * 6;
      const variability = Math.sin(index / 2) * 4 + Math.cos(index / 5) * 3;
      const deceleration = contractionWave > 30 ? -8 : 0;
      const fhrBpm = clamp(
        Math.round(baselineHeartRate + variability + deceleration),
        90,
        190,
      );

      return {
        timestamp: 1,
        fhrBpm,
        toco,
      };
    });
  }

  export const mockCtgData = generateMockCtgData();