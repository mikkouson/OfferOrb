"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import {
  Activity,
  AlertCircle,
  ArrowDown,
  Check,
  DollarSign,
  MoveRight,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useDataStore } from "../store";

const ScoreOverview = ({
  name,
  score,
  isWinner,
  isTie,
}: {
  name: string;
  score: number;
  isWinner: boolean;
  isTie: boolean;
}) => (
  <div
    className={clsx(
      "relative p-8 border-2 transition-all duration-300",
      isTie
        ? "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
        : isWinner
          ? "bg-zinc-950 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-950 border-zinc-950 dark:border-zinc-100"
          : "bg-background border-zinc-200 dark:border-zinc-800 opacity-60",
    )}
  >
    <div className="flex justify-between items-start mb-6">
      <div className="space-y-1">
        <p
          className={clsx(
            "text-[10px] font-black uppercase tracking-[0.2em]",
            isWinner
              ? "text-zinc-400 dark:text-zinc-500"
              : "text-zinc-400 dark:text-zinc-600",
          )}
        >
          Match Rating
        </p>
        <h3 className="text-base md:text-lg font-black uppercase tracking-tighter leading-tight max-w-[220px]">
          {name}
        </h3>
      </div>
      <span className="text-4xl md:text-5xl font-black tabular-nums tracking-tighter italic">
        {score}%
      </span>
    </div>
    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5">
      <div
        className={clsx(
          "h-full transition-all duration-700",
          isWinner
            ? "bg-zinc-50 dark:bg-zinc-950"
            : "bg-zinc-950 dark:bg-zinc-50",
        )}
        style={{ width: `${score}%` }}
      />
    </div>
  </div>
);

const ResultsPage = () => {
  const { data } = useDataStore();
  const analysis = Array.isArray(data) ? data[0] : data;

  if (!analysis) return null;

  // --- INVALID STATE UI ---
  if (analysis.isValid === false) {
    return (
      <main className="h-[calc(100vh-64px)] w-full bg-background flex items-center justify-center p-6 font-sans">
        <div className="max-w-2xl w-full border-[10px] border-zinc-950 dark:border-zinc-100 p-8 md:p-16 relative">
          <Badge
            variant="outline"
            className="rounded-none border-zinc-950 dark:border-zinc-100 font-black uppercase text-[10px] tracking-[0.3em] px-3 mb-8"
          >
            Analysis Failed
          </Badge>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase italic mb-6">
            Incoherent <br /> Input Data
          </h1>

          <p className="text-lg md:text-xl font-bold italic text-zinc-500 mb-10 leading-tight">
            "{analysis.summary}"
          </p>

          <Link
            className="flex  items-center h-16  text-center justify-center rounded-none border-2 border-zinc-950 dark:border-zinc-100 px-12 font-black uppercase tracking-[0.3em] hover:bg-zinc-950 hover:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-950 transition-all group text-xs"
            href={"/"}
          >
            Reset & Try Again
            <RefreshCcw className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </main>
    );
  }

  const isTie = analysis.winner === "Tie";
  const isJobAWinner =
    isTie || analysis.winner === "Job A" || analysis.winner === analysis.JobA;
  const isJobBWinner =
    isTie || analysis.winner === "Job B" || analysis.winner === analysis.JobB;

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-foreground selection:text-background font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <Badge
              variant="outline"
              className="rounded-none border-zinc-950 dark:border-zinc-100 font-black uppercase text-[10px] tracking-[0.3em] px-3"
            >
              Analysis Results
            </Badge>
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            <Activity className="w-4 h-4 opacity-30" />
          </div>

          <h1 className="text-7xl md:text-[110px] lg:text-[140px] font-black tracking-tighter leading-[0.8] uppercase italic mb-12 break-words">
            {isTie ? "Split Decision" : analysis.winner}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 border-l-[10px] border-zinc-950 dark:border-zinc-100 pl-8">
              <p className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-zinc-600 dark:text-zinc-400 italic">
                {analysis.summary}
              </p>
            </div>
            <div className="lg:col-span-5">
              {analysis.salaryInsight && (
                <div className="p-8 border-2 border-zinc-950 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900/50 relative overflow-hidden">
                  <DollarSign className="absolute -right-6 -bottom-6 w-24 h-24 opacity-5 text-zinc-950 dark:text-zinc-100" />
                  <div className="relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-zinc-950 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-950 px-2 py-0.5 mb-4 inline-block">
                      Market Valuation
                    </span>
                    <p className="text-sm md:text-base font-black uppercase leading-snug italic break-words">
                      {analysis.salaryInsight}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-200 dark:bg-zinc-800 mb-20 shadow-sm">
          <ScoreOverview
            name={analysis.JobA}
            score={analysis.scores.A}
            isWinner={isJobAWinner}
            isTie={isTie}
          />
          <ScoreOverview
            name={analysis.JobB}
            score={analysis.scores.B}
            isWinner={isJobBWinner}
            isTie={isTie}
          />
        </section>

        <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Job A Details */}
          <div className="space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic border-b-2 border-zinc-950 dark:border-zinc-100 pb-2">
              {analysis.JobA}
            </h2>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Strengths
              </p>
              <ul className="space-y-2">
                {analysis.prosA.map((pro: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-bold uppercase italic"
                  >
                    <Check className="w-4 h-4 shrink-0" /> {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Considerations
              </p>
              <ul className="space-y-2">
                {analysis.consA.map((con: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium uppercase italic text-zinc-500"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 opacity-50" />{" "}
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Job B Details */}
          <div className="space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic border-b-2 border-zinc-950 dark:border-zinc-100 pb-2">
              {analysis.JobB}
            </h2>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Strengths
              </p>
              <ul className="space-y-2">
                {analysis.prosB.map((pro: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-bold uppercase italic"
                  >
                    <Check className="w-4 h-4 shrink-0" /> {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Considerations
              </p>
              <ul className="space-y-2">
                {analysis.consB.map((con: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium uppercase italic text-zinc-500"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 opacity-50" />{" "}
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic shrink-0">
              Comparison Matrix
            </h2>
            <div className="h-[3px] flex-1 bg-zinc-950 dark:bg-zinc-100" />
            <ArrowDown className="w-5 h-5 opacity-50" />
          </div>

          <div className="border-2 border-zinc-950 dark:border-zinc-100 bg-background overflow-hidden">
            <Table className="w-full table-fixed border-collapse">
              <TableHeader className="bg-zinc-950 dark:bg-zinc-100">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="w-[20%] py-6 px-6 text-zinc-100 dark:text-zinc-950 font-black uppercase text-[10px] tracking-widest border-r border-zinc-800 dark:border-zinc-200">
                    Metric
                  </TableHead>
                  <TableHead className="w-[40%] py-6 px-6 text-zinc-100 dark:text-zinc-950 font-black uppercase tracking-tighter text-xs md:text-sm border-r border-zinc-800 dark:border-zinc-200">
                    {analysis.JobA}
                  </TableHead>
                  <TableHead className="w-[40%] py-6 px-6 text-zinc-100 dark:text-zinc-950 font-black uppercase tracking-tighter text-xs md:text-sm">
                    {analysis.JobB}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analysis.comparisonPoints.map((item: any, idx: number) => (
                  <TableRow
                    key={idx}
                    className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-none"
                  >
                    <TableCell className="py-8 px-6 font-black uppercase text-[10px] tracking-widest text-zinc-400 border-r border-zinc-200 dark:border-zinc-800 align-top">
                      {item.criterion}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        "py-8 px-6 text-xs md:text-sm font-bold uppercase tracking-tight italic leading-relaxed border-r border-zinc-200 dark:border-zinc-800 align-top whitespace-normal break-words",
                        (item.winner === "Job A" ||
                          item.winner === analysis.JobA) &&
                          !isTie
                          ? "bg-zinc-100/50 dark:bg-zinc-800/50 text-foreground"
                          : "text-zinc-500",
                      )}
                    >
                      {item.jobAAnalysis}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        "py-8 px-6 text-xs md:text-sm font-bold uppercase tracking-tight italic leading-relaxed align-top whitespace-normal break-words",
                        (item.winner === "Job B" ||
                          item.winner === analysis.JobB) &&
                          !isTie
                          ? "bg-zinc-100/50 dark:bg-zinc-800/50 text-foreground"
                          : "text-zinc-500",
                      )}
                    >
                      {item.jobBAnalysis}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <footer className="flex flex-col md:flex-row items-center justify-between gap-8 pt-16 border-t-4 border-zinc-950 dark:border-zinc-100">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400 italic">
            Decision.Orb.v1.0
          </p>
          <Link
            className="flex  items-center h-16 rounded-none border-2 border-zinc-950 dark:border-zinc-100 px-12 font-black uppercase tracking-[0.3em] hover:bg-zinc-950 hover:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-950 transition-all group text-xs"
            href={"/"}
          >
            Start New Comparison{" "}
            <MoveRight className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </footer>
      </div>
    </main>
  );
};

export default ResultsPage;
