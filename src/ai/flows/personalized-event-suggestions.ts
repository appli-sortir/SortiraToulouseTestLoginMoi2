'use server';

/**
 * @fileOverview Personalized event suggestions flow.
 *
 * This file defines a Genkit flow that provides personalized event suggestions to users
 * based on their preferences and past activity.
 *
 * @exports {
 *   personalizedEventSuggestions,
 *   PersonalizedEventSuggestionsInput,
 *   PersonalizedEventSuggestionsOutput
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedEventSuggestionsInputSchema = z.object({
  userPreferences: z.string().describe('The user preferences as a string, including event categories of interest.'),
  pastActivity: z.string().describe('The user past activity as a string, including previously attended events.'),
});

export type PersonalizedEventSuggestionsInput = z.infer<typeof PersonalizedEventSuggestionsInputSchema>;

const PersonalizedEventSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of personalized event suggestions.'),
});

export type PersonalizedEventSuggestionsOutput = z.infer<typeof PersonalizedEventSuggestionsOutputSchema>;

export async function personalizedEventSuggestions(input: PersonalizedEventSuggestionsInput): Promise<PersonalizedEventSuggestionsOutput> {
  return personalizedEventSuggestionsFlow(input);
}

const personalizedEventSuggestionsPrompt = ai.definePrompt({
  name: 'personalizedEventSuggestionsPrompt',
  input: {schema: PersonalizedEventSuggestionsInputSchema},
  output: {schema: PersonalizedEventSuggestionsOutputSchema},
  prompt: `You are an AI assistant that suggests events to users based on their preferences and past activity in Toulouse.

  User Preferences: {{{userPreferences}}}
  Past Activity: {{{pastActivity}}}

  Suggest events that the user might be interested in. Return the suggestions as a list of event names.
  Do not suggest events that the user has already attended.
  Focus on events happening in Toulouse.
  Return ONLY the event names, separated by commas.
  `,
});

const personalizedEventSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedEventSuggestionsFlow',
    inputSchema: PersonalizedEventSuggestionsInputSchema,
    outputSchema: PersonalizedEventSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await personalizedEventSuggestionsPrompt(input);
    return output!;
  }
);
