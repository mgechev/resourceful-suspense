import { googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';

require('dotenv').config();

// configure a Genkit instance
const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.0-flash'), // set default model
});

export async function promptModel(prompt: string) {
  // make a generation request
  const { text } = await ai.generate(prompt);
  return text;
}
