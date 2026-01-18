"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  Hash,
  LoaderCircle,
  MoveRight,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { analyzeJobs } from "./action";
import { useDataStore } from "./store";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";

const FormSchema = z.object({
  JobA: z.string().min(2, {
    message: "Description for A is too short.",
  }),
  JobB: z.string().min(2, {
    message: "Description for B is too short.",
  }),
});

export default function InputForm() {
  const { addData, reset } = useDataStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      JobA: "",
      JobB: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const analysisResult = await analyzeJobs(data);
      reset();
      addData(analysisResult);
      toast("ANALYSIS COMPLETE", {
        description: "Redirecting to decision matrix.",
      });
      router.push("/result");
    } catch (error) {
      toast("SYSTEM ERROR", {
        description: "Failed to process descriptions.",
      });
      reset();
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <main className="h-[calc(100vh-84px)] w-full bg-background text-foreground md:overflow-hidden font-sans">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col"
        >
          <header className="pt-6 md:pt-8 pb-6 flex-none">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <Badge
                variant="outline"
                className="rounded-none border-zinc-950 dark:border-zinc-100 font-black uppercase text-[9px] md:text-[10px] tracking-[0.3em] px-2 md:px-3"
              >
                Sequence Initializer
              </Badge>
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
              <Activity className="w-4 h-4 opacity-30" />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-6">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] md:leading-[0.8] uppercase italic">
                Compare <br />
                <span className="bg-zinc-950 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-950 px-2">
                  Opportunities
                </span>
              </h1>
              <div className="max-w-md border-l-4 border-zinc-950 dark:border-zinc-100 pl-4">
                <p className="text-xs md:text-sm font-bold leading-tight tracking-tight text-zinc-600 dark:text-zinc-400 italic">
                  Input dual career trajectories. Our engine deciphers the
                  underlying metrics to determine your optimal path.
                </p>
              </div>
            </div>
          </header>

          {/* --- INPUT GRID --- */}
          <section className="flex-1 flex flex-col md:grid md:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-800 shadow-sm mb-6 min-h-0">
            {/* Position A */}
            <div className="bg-background p-4 md:p-6 flex flex-col min-h-[300px] md:min-h-0">
              <div className="flex justify-between items-center mb-3 md:mb-4 flex-none">
                <div className="space-y-0.5">
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                    Data Stream 01
                  </p>
                  <h3 className="text-base md:text-lg font-black uppercase tracking-tighter italic">
                    JOB A
                  </h3>
                </div>
                <Hash className="w-4 h-4 md:w-5 md:h-5 opacity-20" />
              </div>

              <FormField
                control={form.control}
                name="JobA"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col min-h-0 space-y-0">
                    <FormControl className="flex-1 flex flex-col">
                      <Textarea
                        placeholder="PASTE JOB DETAILS, SALARY, AND CULTURE NOTES..."
                        {...field}
                        className="flex-1 w-full resize-none rounded-none border-2 border-zinc-200 dark:border-zinc-800 focus:border-zinc-950 dark:focus:border-zinc-100 focus-visible:ring-0 transition-all p-3 md:p-4 text-[10px] md:text-xs font-bold uppercase tracking-tight leading-relaxed placeholder:text-zinc-300 dark:placeholder:text-zinc-700 bg-zinc-50/30 dark:bg-zinc-900/30 overflow-y-auto"
                      />
                    </FormControl>
                    <FormMessage className="text-[9px] md:text-[10px] font-black uppercase text-red-600 italic mt-1 flex-none" />
                  </FormItem>
                )}
              />
            </div>

            {/* Position B */}
            <div className="bg-background p-4 md:p-6 flex flex-col min-h-[300px] md:min-h-0 border-t md:border-t-0">
              <div className="flex justify-between items-center mb-3 md:mb-4 flex-none">
                <div className="space-y-0.5">
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                    Data Stream 02
                  </p>
                  <h3 className="text-base md:text-lg font-black uppercase tracking-tighter italic">
                    JOB B
                  </h3>
                </div>
                <Hash className="w-4 h-4 md:w-5 md:h-5 opacity-20" />
              </div>

              <FormField
                control={form.control}
                name="JobB"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col min-h-0 space-y-0">
                    <FormControl className="flex-1 flex flex-col">
                      <Textarea
                        placeholder="PASTE JOB DETAILS, SALARY, AND CULTURE NOTES..."
                        {...field}
                        className="flex-1 w-full resize-none rounded-none border-2 border-zinc-200 dark:border-zinc-800 focus:border-zinc-950 dark:focus:border-zinc-100 focus-visible:ring-0 transition-all p-3 md:p-4 text-[10px] md:text-xs font-bold uppercase tracking-tight leading-relaxed placeholder:text-zinc-300 dark:placeholder:text-zinc-700 bg-zinc-50/30 dark:bg-zinc-900/30 overflow-y-auto"
                      />
                    </FormControl>
                    <FormMessage className="text-[9px] md:text-[10px] font-black uppercase text-red-600 italic mt-1 flex-none" />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <footer className="pb-6 md:pb-8 pt-4 border-t-4 border-zinc-950 dark:border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-6 flex-none">
            <div className="hidden md:block">
              <p className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400 italic leading-none">
                Decision.Orb.v1.0
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={clsx(
                "h-14 md:h-16 w-full md:w-auto px-8 md:px-12 rounded-none border-2 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all group text-[10px] md:text-xs",
                isSubmitting
                  ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-400 border-zinc-200 dark:border-zinc-800"
                  : "bg-zinc-950 text-zinc-50 border-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100 hover:opacity-90",
              )}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-4">
                  <LoaderCircle className="animate-spin w-4 h-4" />
                  <span>Calculating</span>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Execute Analysis</span>
                  <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              )}
            </Button>

            {/* Version visible only on mobile for balance */}
            <p className="md:hidden text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 italic">
              Decision.Orb.v1.0
            </p>
          </footer>
        </form>
      </Form>
    </main>
  );
}
