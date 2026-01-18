"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { analyzeJobs } from "./action";
import {
  LoaderCircle,
  ArrowRight,
  Stars,
  ArrowLeftRight,
  Sparkles,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const FormSchema = z.object({
  JobA: z.string().min(2, {
    message: "JobA must be at least 2 characters.",
  }),
  JobB: z.string().min(2, {
    message: "JobA must be at least 2 characters.",
  }),
});

export default function InputForm() {
  const [result, setResult] = useState<any>(null);

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
      setResult(analysisResult);
      toast("Job Analysis Complete", {
        description: "Results displayed below the form",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to analyze jobs. Please try again.",
      });
      setResult(null);
    }
  }

  const isSubmitting = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col items-center py-12 px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Career Decision Tool
            </span>
            <div className="w-2 h-2 rounded-full bg-primary"></div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-balance tracking-tight mb-4">
            Find Your Perfect Role
          </h1>
          <p className="text-lg text-muted-foreground text-center max-w-2xl leading-relaxed">
            Compare job offers side by side. Our AI analyzes salary, benefits,
            growth opportunities, and work-life balance to help you choose the
            best path forward.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-6 px-4 sm:px-6 py-8">
          {/* Job A Card */}
          <Card className="border-2 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Position A</CardTitle>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  A
                </div>
              </div>
              <CardDescription className="text-sm">
                Enter the details for your first opportunity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="JobA"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Job Details
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste job description, salary, benefits, location, and any other relevant details..."
                        {...field}
                        className="resize-none border-2 focus:border-primary transition-colors h-48 p-4"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Include salary, benefits, role, location, and company info
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Job B Card */}
          <Card className="border-2 hover:border-accent/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent/10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Position B</CardTitle>
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-semibold">
                  B
                </div>
              </div>
              <CardDescription className="text-sm">
                Enter the details for your second opportunity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="JobB"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Job Details
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste job description, salary, benefits, location, and any other relevant details..."
                        {...field}
                        className="resize-none border-2 focus:border-accent transition-colors h-48 p-4"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Include salary, benefits, role, location, and company info
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <div className="w-full flex justify-center py-8 px-4 sm:px-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="group px-8 py-6 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/30 disabled:shadow-none"
          >
            {isSubmitting ? (
              <div className="flex gap-3 items-center">
                <span>Analyzing Offers</span>
                <LoaderCircle
                  className="animate-spin"
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <Sparkles size={20} strokeWidth={2} aria-hidden="true" />
                <span>Compare with AI</span>
                <ArrowLeftRight
                  className="opacity-60 transition-transform group-hover:scale-110"
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
