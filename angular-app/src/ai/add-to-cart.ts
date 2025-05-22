import { z } from 'zod';

const addToCartTool = {
  name: 'add-to-cart',
  description: 'Allow the user to add an item to their cart',
  inputSchema: z.object({
    id: z.string().describe('The id of the item added to the cart'),
    quantity: z
      .number()
      .describe('The quantity of the item to add to the cart'),
    productName: z
      .string()
      .describe('The name of the product to add to the cart'),
    productList: z
      .array(z.string())
      .describe('The list of products to choose from'),
  }),
  outputSchema: z.object({
    message: z.string().describe('The message to display to the user'),
    action: z.object({
      type: z.string().describe('The type of action to perform'),
      params: z.object({
        id: z.string().describe('The id of the item added to the cart'),
        quantity: z.number().describe('The quantity of the item added to the cart'),
      })
    })
  }),
};

const addToCartToolFn = async (
  input: z.infer<typeof addToCartTool.inputSchema>
) => {
  return {
    message: `Adding ${input.quantity} of ${input.productName} to the cart.`,
    action: {
      type: 'addToCart',
      params: {
        id: input.id,
        quantity: input.quantity,
      }
    }
  }
};

export { addToCartTool, addToCartToolFn };
