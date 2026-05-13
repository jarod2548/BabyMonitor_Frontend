import type { ctgData } from "../contracts/ctgData";
import type { CtgPoint } from "../contracts/ctgpoint";

class CtgGeneratorService {
  private static instance: CtgGeneratorService;

  private constructor() {}

  public static getInstance(): CtgGeneratorService {
    if (!CtgGeneratorService.instance) {
      CtgGeneratorService.instance = new CtgGeneratorService();
    }
    return CtgGeneratorService.instance;
  }

  // voor het inladen van alle punten in een keer
  public generatePoints(data : ctgData): CtgPoint[] {
    const points: CtgPoint[] = [];
    
    const totalPoints = data.minuten * 4;

    for (let i = 0; i < totalPoints; i++) {
      
      const randomOffset = (Math.random() - 0.5) * 2 * data.variabiliteit;
      const fhrBpm = Math.round(data.hartBasis + randomOffset);
      
      const toco = Math.round(20 + Math.sin(i / 10) * 15);

      points.push({
        timestamp: 1,
        fhrBpm: fhrBpm,
        toco: toco
      });
    }

    return points;
  }

  //voor een flow van punten die over tijd worden ingeladen
  public generateNextPoint(
  data: ctgData,
  lastToco: number,
  index: number
): CtgPoint {
  const randomOffset = (Math.random() - 0.5) * 2 * data.variabiliteit;

  return {
    timestamp: index, // now it's just index
    fhrBpm: Math.round(data.hartBasis + randomOffset),
    toco: Math.max(10, Math.min(100, lastToco + (Math.random() - 0.5) * 5))
  };
}
}

export const ctgService = CtgGeneratorService.getInstance();