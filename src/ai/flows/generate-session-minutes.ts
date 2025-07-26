'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating session minutes.
 *
 * - generateSessionMinutes - A function that generates session minutes based on session data.
 * - GenerateSessionMinutesInput - The input type for the generateSessionMinutes function.
 * - GenerateSessionMinutesOutput - The return type for the generateSessionMinutes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSessionMinutesInputSchema = z.object({
  sessionTitle: z.string().describe('The title of the session.'),
  sessionDate: z.string().describe('The date of the session (YYYY-MM-DD).'),
  attendees: z.array(z.string()).describe('List of attendees at the session.'),
  topicsDiscussed: z.array(z.object({
    topic: z.string().describe('The topic discussed.'),
    presenter: z.string().describe('The person who presented the topic.'),
    outcome: z.string().describe('The outcome of the discussion (approved, rejected, etc.).'),
    voteLink: z.string().optional().describe('A link to the voting record for the topic, if applicable.'),
  })).describe('List of topics discussed during the session.'),
});
export type GenerateSessionMinutesInput = z.infer<typeof GenerateSessionMinutesInputSchema>;

const GenerateSessionMinutesOutputSchema = z.object({
  title: z.string().describe('A short, catchy title for the session summary.'),
  keyTakeaways: z.array(z.string()).describe('A list of 3 to 5 key takeaways from the session.'),
  minutes: z.string().describe('The full generated session minutes in markdown format.'),
});
export type GenerateSessionMinutesOutput = z.infer<typeof GenerateSessionMinutesOutputSchema>;

export async function generateSessionMinutes(input: GenerateSessionMinutesInput): Promise<GenerateSessionMinutesOutput> {
  return generateSessionMinutesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSessionMinutesPrompt',
  input: {schema: GenerateSessionMinutesInputSchema},
  output: {schema: GenerateSessionMinutesOutputSchema},
  prompt: `You are a highly skilled summarizer, expert at creating concise and informative minutes from meeting sessions.

  Your task is to generate a comprehensive summary of the meeting session.

  Based on all the provided information, generate the following:
  1. A short, engaging title for the session summary.
  2. A list of 3-5 key takeaways that highlight the most important decisions and outcomes.
  3. A detailed minutes document in markdown format that includes the list of attendees and the topics discussed with their respective presenters, outcomes, and vote links if available.

  Session Details:
  - Title: "{{sessionTitle}}"
  - Date: {{sessionDate}}

  Attendees:
  {{#each attendees}}
  - {{this}}
  {{/each}}

  Topics Discussed:
  {{#each topicsDiscussed}}
  - Topic: {{topic}}
    Presenter: {{presenter}}
    Outcome: {{outcome}}
    {{#if voteLink}}
    Vote Link: {{voteLink}}
    {{/if}}
  {{/each}}
  `,
});

const generateSessionMinutesFlow = ai.defineFlow(
  {
    name: 'generateSessionMinutesFlow',
    inputSchema: GenerateSessionMinutesInputSchema,
    outputSchema: GenerateSessionMinutesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
