import { Component } from '@angular/core';
import { Product } from './product';
import { ProductThumbnailComponent } from './components/product-thumbnail/product-thumbnail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [CommonModule, ProductThumbnailComponent]
})
export class App {
  products: Product[] = [
    { name: 'Producto 1', price: 10, imageUrl: 'https://placehold.co/150' },
    { name: 'Producto 2', price: 20, imageUrl: 'https://placehold.co/150' },
    { name: 'Producto 3', price: 30, imageUrl: 'https://placehold.co/150' }
  ];

  selectedProduct: Product | undefined;

  onProductSelected(product: Product) {
    this.selectedProduct = product;
  }
}
