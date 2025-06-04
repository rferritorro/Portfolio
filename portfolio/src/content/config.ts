import { defineCollection, z } from "astro:content";

// z - Zod is a TypeScript-first schema declaration and validation library

const i18n = defineCollection({
  type: "data",
  schema: z.record(z.string())
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().url().or(z.string()),
    tools: z.array(z.string()),
    url: z.string().url().optional(),
  }),
});

const experiences = defineCollection({
  type: "content", 
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { i18n, projects, experiences };