import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import data from "./data.json";
import { Progress } from "@/components/ui/progress";
import clsx from "clsx";
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
    </main>
  );
};

export default Page;
