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
import { LoaderCircle, ArrowRight, Stars, ArrowLeftRight } from "lucide-react";
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
        <div className="flex flex-col items-center py-6">
          <h2 className="text-fuchsia-600 scroll-m-20 text-3xl font-bold tracking-tight first:mt-0">
            Reviewing multiple offers?
          </h2>

          <p className="leading-7 not-first:mt-4 text-center">
            Paste the job descriptions, salary details, and benefits for two
            positions below.
            <br /> Our AI will help you decide which one is the best fit for
            your future.
          </p>
        </div>
        <div className="w-full py-4 flex flex-col sm:flex-row gap-4 justify-between">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Job A</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="JobA"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here."
                        {...field}
                        className="h-64 resize-none"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the first job offer details.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Job B</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="JobB"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here."
                        {...field}
                        className="h-64 resize-none"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the first job offer details.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
        <div className="w-full flex justify-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="group rounded-2xl "
          >
            {isSubmitting ? (
              <>
                Comparing
                <LoaderCircle
                  className="animate-spin ms-2"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </>
            ) : (
              <div className="flex gap-4 items-center">
                <Stars />
                <span className="text-md">Compare</span>
                <ArrowLeftRight
                  className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>
            )}
          </Button>
        </div>

        {result && (
          <div className="max-w-full mx-auto">
            <h3 className="text-lg font-semibold mb-4">Analysis Result:</h3>
            <pre className="whitespace-pre-wrap wrap-break-word overflow-x-auto bg-gray-50 p-4 rounded-md text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </form>
    </Form>
  );
}
