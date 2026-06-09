import type { ctgData } from "../contracts/ctgData";
import type { CtgPoint } from "../contracts/ctgpoint";

class CtgGeneratorService {
  private static instance: CtgGeneratorService;

  private currentFhr = 140;
  private currentToco = 15;

  private contractionPhase = 0;
  private contractionActive = false;

  private constructor() {}

  public static getInstance(): CtgGeneratorService {
    if (!CtgGeneratorService.instance) {
      CtgGeneratorService.instance = new CtgGeneratorService();
    }

    return CtgGeneratorService.instance;
  }

  // OPTIONAL: preload generation
  public generatePoints(data: ctgData): CtgPoint[] {
    const points: CtgPoint[] = [];

    for (let i = 0; i < 240; i++) {
      points.push(
        this.generateNextPoint(
          data,
          i * 250
        )
      );
    }

    return points;
  }

  public generateNextPoint(
    data: ctgData,
    timestamp: number
  ): CtgPoint {


    // baseline drift
    const targetBaseline =
      data.hartbasis +
      Math.sin(timestamp / 15000) * 5;

    // smooth movement toward target
    this.currentFhr +=
      (targetBaseline - this.currentFhr) * 0.03;

    // short-term variability
    this.currentFhr +=
      (Math.random() - 0.5) *
      data.variabiliteit *
      0.8;

    // occasional accelerations
    if (Math.random() < 0.003) {
      this.currentFhr += 15;
    }

    // occasional decelerations
    if (Math.random() < 0.002) {
      this.currentFhr -= 12;
    }

    // physiological clamp
    this.currentFhr = Math.max(
      60,
      Math.min(210, this.currentFhr)
    );

    /*
      =========================
      TOCO GENERATION
      =========================
    */

    // start contraction occasionally
    if (!this.contractionActive && Math.random() < 0.004) {
      this.contractionActive = true;
      this.contractionPhase = 0;
    }

    if (this.contractionActive) {
      this.contractionPhase += 0.03;

      // smooth bell-shaped contraction
      const wave =
        Math.sin(this.contractionPhase) * 60;

      this.currentToco = 20 + Math.max(0, wave);

      // end contraction
      if (this.contractionPhase >= Math.PI) {
        this.contractionActive = false;
      }
    } else {
      // resting baseline
      this.currentToco +=
        (15 - this.currentToco) * 0.05;

      // tiny resting noise
      this.currentToco +=
        (Math.random() - 0.5) * 1.5;
    }

    this.currentToco = Math.max(
      0,
      Math.min(100, this.currentToco)
    );

    return {
      x: 0,
      timestamp,
      fhrBpm: Math.round(this.currentFhr),
      toco: Math.round(this.currentToco),
    };
  }
}

export const ctgService =
  CtgGeneratorService.getInstance();