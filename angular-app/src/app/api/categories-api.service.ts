import { Injectable, inject } from '@angular/core';
import { FETCH_API } from '@ngx-templates/shared/fetch';

import { Category } from '../../models';
import { environment } from '../../environments/environment';
import { mapCategories } from './utils/mappers';

// NOTE: An error handling mechanism is not implemented.
@Injectable({ providedIn: 'root' })
export class CategoriesApi {
  private _fetch = inject(FETCH_API);

  /**
   * Fetches categories
   *
   * @returns All categories that the ecommerce web app has
   */
  async getCategories(): Promise<Category[]> {
    const response = await this._fetch(`${environment.apiUrl}/categories?tech=angular`);
    const json = await response.json();

    return mapCategories(json);
  }
}
