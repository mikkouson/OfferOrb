"use server";

import { JobSchema, JobSchemaType } from "./type";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function analyzeJobs(formData: JobSchemaType) {
  const result = JobSchema.safeParse(formData);

  if (!result.success) {
    throw new Error("Invalid form data");
  }

  const prompt = `
    You are a concise Career Strategist.
    
    First, perform a content validation check on the inputs.
    Ensure that BOTH inputs describe a job offer, role, or career opportunity.
    If either input appears to be unrelated text (e.g. gibberish, a news article about sports, a recipe, or just random words), you must mark the result as invalid by:
    1. Setting "isValid" to false.
    2. Writing a clear summary stating that one or both inputs do not appear to be valid job descriptions.
    3. Setting the winner to "Tie" and scores to 0.
    4. Returning empty arrays for pros/cons and comparison points.
    5. Returning a placeholder string for salaryInsight.

    If inputs are valid:
    1. Set "isValid" to true.
    2. Proceed to analyze the two job descriptions.
    
    JOB OFFER A:
    ${formData.JobA}

    JOB OFFER B:
    ${formData.JobA}

    Compare them based on: Salary, Role, Growth, Culture, and Work-Life Balance.
    
    CRITICAL INSTRUCTIONS FOR BREVITY:
    - Keep "summary" to 2 sentences maximum. Direct and punchy.
    - Keep "jobAAnalysis" and "jobBAnalysis" in comparisonPoints to MAX 10-15 words. extremely concise.
    - "salaryInsight" should be 1 sentence.
    - Pros/Cons should be short phrases (e.g., "High base salary", "Remote work"), not sentences.
    
    Assign a score from 0-100. Determine a winner.
  `;

  const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: process.env.NEXT_PUBLIC_HF_TOKEN,
  });

  const response = await client.chat.completions.create({
    model: "zai-org/GLM-4.7:novita",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return {
    content: response.choices[0]?.message?.content ?? "",
    usage: response.usage
      ? {
          prompt_tokens: response.usage.prompt_tokens,
          completion_tokens: response.usage.completion_tokens,
          total_tokens: response.usage.total_tokens,
        }
      : null,
  };
}
