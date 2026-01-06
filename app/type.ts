import { z } from "zod";
export interface ComparisonPoint {
  feature: string;
  jobAAnalysis: string;
  jobBAnalysis: string;
  advantage: "A" | "B" | "Tie";
}

export interface ComparisonResult {
  isValid: boolean;
  winner: "Job A" | "Job B" | "Tie";
  summary: string;
  scoreA: number;
  scoreB: number;
  comparisonPoints: ComparisonPoint[];
  prosA: string[];
  consA: string[];
  prosB: string[];
  consB: string[];
  salaryInsight: string;
}

export interface JobData {
  title: string;
  description: string;
}

export const JobSchema = z.object({
  JobA: z.string().min(1, { message: "Job A is required" }),
  JobB: z.string().min(1, { message: "Job A is required" }),
});

export type JobSchemaType = z.infer<typeof JobSchema>;
