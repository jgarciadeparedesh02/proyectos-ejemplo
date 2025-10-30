import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductThumbnailComponent {
  @Input() product: Product | undefined;
  @Output() productSelected = new EventEmitter<Product>();

  selectProduct() {
    if (this.product) {
      this.productSelected.emit(this.product);
    }
  }
}
