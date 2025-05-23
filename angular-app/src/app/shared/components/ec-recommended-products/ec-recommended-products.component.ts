import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../../../../models/product';

@Component({
  selector: 'ec-recommended-products',
  templateUrl: './ec-recommended-products.component.html',
  styleUrls: ['./ec-recommended-products.component.scss'],
  standalone: true,
  imports: [CurrencyPipe]
})
export class EcRecommendedProductsComponent {
  error: string | null = null;

  recommendationsResource = httpResource<Product[]>(() => `/api/recommended-products?tech=angular`);

  constructor(
    private router: Router
  ) {}

  onProductClick(productId: string): void {
    this.router.navigate(['/products', productId]);
  }
} 