import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Progress } from "@/components/ui/progress";
import clsx from "clsx";
import { Check, X } from "lucide-react";
import data from "./data.json";
const Page = () => {
  return (
    <main className="w-full ">
      <Card className="w-full mt-10">
        <CardHeader>
          <CardTitle className="text-5xl md:text-6xl  leading-[1.1] flex gap-2">
            {" "}
            Choose
            <span className="text-indigo-600">{data.winner}</span>
          </CardTitle>
          <CardDescription className="text-lg text-slate-500 leading-relaxed font-medium max-w-2xl">
            {data.summary}
          </CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="p-8 bg-accent-foreground/5 rounded-4xl">
            <div className="flex justify-between items-center mb-2">
              <span>{data.JobA}</span>
              <span
                className={clsx(
                  "text-2xl ",
                  data.winner === data.JobA
                    ? "text-indigo-600"
                    : "text-slate-900"
                )}
              >
                {" "}
                {data.scores.A}%
              </span>
            </div>
            <Progress
              value={data.scores.A}
              className={clsx(
                "h-2",
                data.winner === data.JobA
                  ? "[&>div]:bg-indigo-600"
                  : "[&>div]:bg-slate-900"
              )}
            />
          </div>
          <div className="p-8 bg-accent-foreground/5 rounded-4xl">
            <div className="flex justify-between items-center mb-2">
              <span>{data.JobB}</span>
              <span
                className={clsx(
                  "text-2xl ",
                  data.winner === data.JobB
                    ? "text-indigo-600"
                    : "text-slate-900"
                )}
              >
                {" "}
                {data.scores.B}%
              </span>
            </div>
            <Progress
              value={data.scores.B}
              className={clsx(
                "h-2",
                data.winner === data.JobB
                  ? "[&>div]:bg-indigo-600"
                  : "[&>div]:bg-slate-900"
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* comparison */}
      {/* JOB A */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="w-full mt-10">
          <CardHeader>
            <CardTitle className="text-2xl md:text-4xl  leading-[1.1] flex gap-2">
              <span className="text-indigo-600">{data.JobA}</span>
            </CardTitle>
            {/* <CardDescription className="text-lg text-slate-500 leading-relaxed font-medium max-w-2xl">
              {data.summary}
            </CardDescription> */}
            <CardAction>
              {" "}
              {data.winner === data.JobA ? (
                <Badge className="bg-indigo-600">Winner</Badge>
              ) : (
                <Badge className="">Alternative</Badge>
              )}{" "}
            </CardAction>
          </CardHeader>

          <CardContent className="gap-4">
            {/* pros */}
            <div className="space-y-2">
              <Badge className="bg-emerald-600">Key Advantages</Badge>

              {data.prosA.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl
                 bg-emerald-400/10 backdrop-blur-md
                 border border-emerald-400/30
                 shadow-sm shadow-emerald-500/10 "
                >
                  <Check className="w-4 h-4 text-emerald-500" />
                  <p className="text-sm font-medium t">{item}</p>
                </div>
              ))}
            </div>

            {/* cons */}

            <div className="space-y-2 mt-4">
              <Badge className="bg-red-600">Considerations</Badge>
              {data.consA.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl
                 bg-red-400/10 backdrop-blur-md
                 border border-red-400/30
                 shadow-sm shadow-red-500/10 "
                >
                  <X className="w-4 h-4 text-red-500" />
                  <p className="text-sm font-medium t">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* JOB B */}
        <Card className="w-full mt-10">
          <CardHeader>
            <CardTitle className="text-2xl md:text-4xl  leading-[1.1] flex gap-2">
              <span className="">{data.JobB}</span>
            </CardTitle>
            {/* <CardDescription className="text-lg text-slate-500 leading-relaxed font-medium max-w-2xl">
              {data.summary}
            </CardDescription> */}
            <CardAction>
              {data.winner === data.JobB ? (
                <Badge className="bg-indigo-600">Winner</Badge>
              ) : (
                <Badge className="">Alternative</Badge>
              )}{" "}
            </CardAction>
          </CardHeader>

          <CardContent className="gap-4">
            {/* pros */}
            <div className="space-y-2">
              <Badge className="bg-emerald-600">Key Advantages</Badge>

              {data.prosB.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl
                 bg-emerald-400/10 backdrop-blur-md
                 border border-emerald-400/30
                 shadow-sm shadow-emerald-500/10 "
                >
                  <Check className="w-4 h-4 text-emerald-500" />
                  <p className="text-sm font-medium t">{item}</p>
                </div>
              ))}
            </div>

            {/* cons */}

            <div className="space-y-2 mt-4">
              <Badge className="bg-red-600">Considerations</Badge>
              {data.consB.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl
                 bg-red-400/10 backdrop-blur-md
                 border border-red-400/30
                 shadow-sm shadow-red-500/10 "
                >
                  <X className="w-4 h-4 text-red-500" />
                  <p className="text-sm font-medium t">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* comparison point */}
      </div>
      <Card className="w-full mt-10">
        <CardHeader>
          <CardTitle className="text-5xl md:text-6xl  leading-[1.1] flex gap-2">
            <span className="text-indigo-600">Comparison Points</span>
          </CardTitle>
          <CardDescription className="text-lg text-slate-500 leading-relaxed font-medium max-w-2xl">
            {/* {data.summary} */}
          </CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">Criterion</TableHead>
                <TableHead
                  className={clsx(
                    "",
                    data.winner === data.JobA ? "text-indigo-500" : ""
                  )}
                >
                  {data.JobA}
                </TableHead>
                <TableHead
                  className={clsx(
                    "",
                    data.winner === data.JobB ? "text-indigo-500" : ""
                  )}
                >
                  {data.JobB}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.comparisonPoints.map((item) => (
                <TableRow key={item.criterion}>
                  <TableCell className="font-medium">
                    {item.criterion}
                  </TableCell>
                  <TableCell
                    className={clsx(
                      "font-medium",
                      item.winner === data.JobA ? "bg-indigo-50" : "bg-white"
                    )}
                  >
                    {item.jobAAnalysis}
                  </TableCell>
                  <TableCell
                    className={clsx(
                      "font-medium",
                      item.winner === data.JobB ? "bg-indigo-50" : "bg-white"
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
    </main>
  );
};

export default Page;
