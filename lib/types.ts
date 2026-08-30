export type FireCoverage = {
  title: string;
  recommendation: "GREENLIGHT" | "DEVELOP" | "PASS";
  fireScore: number;
  soulScore: number;
  logline: string;
  executiveTake: string;
  louder: string;
  faster: string;
  funnier: string;
  deeper: string;
  trailerMoment: string;
  movieStarMoment: string;
  producerBet: string;
  brutalNote: string;
  strengths: string[];
  risks: string[];
};
