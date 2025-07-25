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
  minutes: z.string().describe('The generated session minutes.'),
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

  Please generate session minutes for the session titled "{{sessionTitle}}" held on {{sessionDate}}. Include the list of attendees, topics discussed with the presenter and outcome, and links to voting records where available.

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
