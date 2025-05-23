import { Category, Product } from '../../../models';
import { ApiCategory, ApiProduct } from './api-types';

// Mappers add an aditional layer between the API call and the state update.
// They convert the external API response types to the internal immutable models.

export const mapCategory = (c: ApiCategory): Category => ({
  id: c.id,
  name: c.name,
  order: c.order,
});

export const mapCategories = (categories: ApiCategory[]) =>
  categories.map((c) => mapCategory(c));

export const mapProduct = (p: ApiProduct): Product =>
  ({
    id: p.id,
    name: p.name,
    description: p.description,
    categoryIds: p.category_ids,
    images: p.images,
    price: p.price,
    discountPrice: p.discount_price,
    availability: p.availability,
    parameters: 
      (p.parameters || []).map(
        (pm) =>
          ({
            name: pm.name,
            value: pm.value,
          }),
    ),
  });

export const mapProducts = (products: ApiProduct[]): Product[] =>
  products.map((p) => mapProduct(p));
