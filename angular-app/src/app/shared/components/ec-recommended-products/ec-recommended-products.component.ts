import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../../models/product';
import { createProductUrl } from '../../utils/create-product-url';

@Component({
  selector: 'ec-recommended-products',
  templateUrl: './ec-recommended-products.component.html',
  styleUrls: ['./ec-recommended-products.component.scss'],
  standalone: true,
  imports: [CurrencyPipe]
})
export class EcRecommendedProductsComponent {
  protected error: string | null = null;
  protected recommendationsResource = httpResource<Product[]>(() => `/api/recommended-products?tech=angular`);

  private router = inject(Router);

  onProductClick(product: Product): void {
    this.router.navigate(createProductUrl(product));
  }
} 