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
import { LoaderCircle, ArrowRight } from "lucide-react";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="JobA"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job A</FormLabel>
              <FormControl>
                <Input placeholder="Enter job description A" {...field} />
              </FormControl>
              <FormDescription>
                Enter the first job offer details.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="JobB"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job B</FormLabel>
              <FormControl>
                <Input placeholder="Enter job description B" {...field} />
              </FormControl>
              <FormDescription>
                Enter the second job offer details.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="group">
          {isSubmitting ? (
            <>
              Submitting
              <LoaderCircle
                className="animate-spin ms-2"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </>
          ) : (
            <>
              Submit
              <ArrowRight
                className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </>
          )}
        </Button>
      </form>

      {result && (
        <div className="max-w-full mx-auto mx-au">
          <h3 className="text-lg font-semibold mb-4">Analysis Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}
