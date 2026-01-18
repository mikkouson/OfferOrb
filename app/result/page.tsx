"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import clsx from "clsx";
import { Check, X, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import data from "./data.json";

const ScoreOverview = ({
  name,
  score,
  isWinner,
}: {
  name: string;
  score: number;
  isWinner: boolean;
}) => (
  <div
    className={clsx(
      "p-8 rounded-2xl border-2 transition-all duration-300",
      isWinner
        ? "bg-primary/10 border-primary shadow-lg"
        : "bg-secondary/30 border-border hover:border-muted-foreground",
    )}
  >
    <div className="flex justify-between items-end mb-4">
      <span className="font-semibold text-muted-foreground uppercase tracking-widest text-xs">
        {name}
      </span>
      <span
        className={clsx(
          "text-4xl font-black",
          isWinner ? "text-primary" : "text-foreground/60",
        )}
      >
        {score}%
      </span>
    </div>
    <Progress
      value={score}
      className={clsx(
        "h-3 rounded-full",
        isWinner ? "[&>div]:bg-primary" : "[&>div]:bg-muted-foreground/40",
      )}
    />
  </div>
);

const JobDetailCard = ({
  name,
  isWinner,
  pros,
  cons,
}: {
  name: string;
  isWinner: boolean;
  pros: string[];
  cons: string[];
}) => (
  <Card
    className={clsx(
      "w-full transition-all duration-300 overflow-hidden",
      isWinner
        ? "ring-2 ring-primary shadow-xl border-primary"
        : "hover:shadow-lg border-border",
    )}
  >
    {isWinner && (
      <div className="h-1 bg-gradient-to-r from-primary to-accent"></div>
    )}

    <CardHeader className="pb-6">
      <div className="flex items-center justify-between gap-4">
        <CardTitle className="text-3xl font-black tracking-tight">
          {name}
        </CardTitle>
        <Badge
          className={clsx(
            "px-3 py-1 font-semibold",
            isWinner
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {isWinner ? "★ Recommended" : "Alternative"}
        </Badge>
      </div>
    </CardHeader>

    <CardContent className="space-y-6">
      {/* Pros Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase text-emerald-600 flex items-center gap-2 tracking-wider">
          <Check className="w-4 h-4" /> Key Advantages
        </h4>
        <div className="grid gap-2.5">
          {pros.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 px-4 py-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 hover:shadow-sm transition-all"
            >
              <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-emerald-900 dark:text-emerald-100 leading-relaxed font-medium">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Cons Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase text-orange-600 flex items-center gap-2 tracking-wider">
          <X className="w-4 h-4" /> Considerations
        </h4>
        <div className="grid gap-2.5">
          {cons.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 px-4 py-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 hover:shadow-sm transition-all"
            >
              <X className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-orange-900 dark:text-orange-100 leading-relaxed font-medium">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const ResultsPage = () => {
  const isJobAWinner = data.winner === data.JobA;
  const isJobBWinner = data.winner === data.JobB;

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-background via-background to-background/95">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-12 md:py-16">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="flex items-start gap-3 mb-6">
            <Trophy className="text-primary w-8 h-8 flex-shrink-0 mt-1" />
            <Badge className="bg-primary/15 text-primary border border-primary/30 font-semibold">
              AI Analysis Complete
            </Badge>
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-4">
            Choose{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {data.winner}
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8 font-medium">
            {data.summary}
          </p>

          {/* Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScoreOverview
              name={data.JobA}
              score={data.scores.A}
              isWinner={isJobAWinner}
            />
            <ScoreOverview
              name={data.JobB}
              score={data.scores.B}
              isWinner={isJobBWinner}
            />
          </div>
        </section>

        {/* Detail Comparison Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-8 tracking-tight">
            Detailed Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <JobDetailCard
              name={data.JobA}
              isWinner={isJobAWinner}
              pros={data.prosA}
              cons={data.consA}
            />
            <JobDetailCard
              name={data.JobB}
              isWinner={isJobBWinner}
              pros={data.prosB}
              cons={data.consB}
            />
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-8 tracking-tight">
            Complete Comparison
          </h2>
          <Card className="border-border overflow-hidden">
            <CardHeader className="bg-muted/40 pb-4">
              <CardTitle>Side-by-Side Analysis</CardTitle>
              <CardDescription>
                Detailed metrics for each opportunity
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 hover:bg-muted/20 border-b-2 border-border">
                    <TableHead className="w-[220px] font-black py-4 px-6">
                      Criterion
                    </TableHead>
                    <TableHead
                      className={clsx(
                        "py-4 font-black",
                        isJobAWinner && "text-primary",
                      )}
                    >
                      {data.JobA}
                      {isJobAWinner && " ★"}
                    </TableHead>
                    <TableHead
                      className={clsx(
                        "py-4 font-black",
                        isJobBWinner && "text-primary",
                      )}
                    >
                      {data.JobB}
                      {isJobBWinner && " ★"}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.comparisonPoints.map((item) => (
                    <TableRow
                      key={item.criterion}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-semibold py-4 px-6 bg-muted/5">
                        {item.criterion}
                      </TableCell>
                      <TableCell
                        className={clsx(
                          "py-4 px-6 transition-colors",
                          item.winner === data.JobA
                            ? "bg-primary/10 font-semibold text-primary"
                            : "text-muted-foreground",
                        )}
                      >
                        {item.jobAAnalysis}
                      </TableCell>
                      <TableCell
                        className={clsx(
                          "py-4 px-6 transition-colors",
                          item.winner === data.JobB
                            ? "bg-primary/10 font-semibold text-primary"
                            : "text-muted-foreground",
                        )}
                      >
                        {item.jobBAnalysis}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Button
            onClick={() => (window.location.href = "/")}
            className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl"
          >
            Start New Comparison
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </section>
      </div>
    </main>
  );
};

export default ResultsPage;
