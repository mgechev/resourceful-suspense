import { Injectable } from "@angular/core";
import { CartService } from "../../data-access/cart.service";
import { ProductsApi } from "../../api/products-api.service";

export interface Action {
  type: 'addToCart';
  params: {
    id: string;
    quantity: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ActionExecutor {
  constructor(private cartService: CartService, private productsApi: ProductsApi) {}

  async executeAction(action: Action) {
    switch (action.type) {
      case 'addToCart':
        const product = await this.productsApi.getProduct(action.params.id);
        this.cartService.addToCart(product, action.params.quantity);
        break;
    }
  }
}