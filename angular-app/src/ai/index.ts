import { googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';
import { data } from "../data";
import { addToCartTool, addToCartToolFn } from './add-to-cart';

require('dotenv').config();

// configure a Genkit instance
const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.0-flash'), // set default model
});

const tool = ai.defineTool(addToCartTool, addToCartToolFn);

export async function promptModel(prompt: string, tech: 'angular' | 'react') {
  const basePrompt = `
  You are a helpful assistant that can help the user add items to their cart.
  You are given a list of products to choose from.
  Do not return the raw product list data to the user, but be helpful answering questions about the products.
  Do not return the product IDs. Only expose the product name and category.
  Here are all the products available:
  ${data[tech].products.map(product => `${product.id} - ${product.name}`).join('\n')}
  The next message will be from the user. Help them with their request.`;

  // make a generation request
  prompt = `${basePrompt}\n\n${prompt}`;
  const { text, toolRequests } = await ai.generate({
    prompt,
    tools: [tool],
    returnToolRequests: true
  });
  if (toolRequests.length === 0) {
    return { message: text };
  }
  const { toolRequest } = toolRequests[0];
  const { id, quantity, productName } = toolRequest.input as { id: string, quantity: number, productName: string };
  return {
    message: `Adding ${productName} of ${quantity} to the cart.`,
    action: {
      type: 'addToCart',
      params: {
        id: id,
        quantity: quantity,
      }
    }
  }
}
