import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListService } from '../../services/shopping-list.service';
import { ShoppingItemComponent } from '../../components/shopping-item/shopping-item.component';
import { ShoppingFormComponent } from '../../components/shopping-form/shopping-form.component';
import { ShoppingItem } from '../../models/shopping-item.model';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, ShoppingItemComponent, ShoppingFormComponent],
  template: `
    <div class="shopping-list-container">
      <h1>My Shopping List</h1>

      <app-shopping-form (itemAdded)="onItemAdded($event)"></app-shopping-form>

      <div class="shopping-items">
        <h2>Items to Buy ({{ unpurchasedCount }})</h2>
        @if (getUnpurchasedItems().length > 0) { @for (item of
        getUnpurchasedItems(); track item.id) {
        <app-shopping-item
          [item]="item"
          (itemToggled)="onItemToggled($event)"
          (itemDeleted)="onItemDeleted($event)"
          (itemEdited)="onItemEdited($event)"
        >
        </app-shopping-item>
        } } @else {
        <p>No items to buy. Add some items to your list!</p>
        } @if (getPurchasedItems().length > 0) {
        <h2>Purchased Items ({{ purchasedCount }})</h2>
        @for (item of getPurchasedItems(); track item.id) {
        <app-shopping-item
          [item]="item"
          (itemToggled)="onItemToggled($event)"
          (itemDeleted)="onItemDeleted($event)"
          (itemEdited)="onItemEdited($event)"
        >
        </app-shopping-item>
        } }
      </div>
    </div>
  `,
  styles: `
    .shopping-list-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .shopping-items {
      margin-top: 20px;
    }
    
    h1 {
      color: #333;
      margin-bottom: 20px;
    }
    
    h2 {
      color: #666;
      margin: 15px 0;
      padding-bottom: 5px;
      border-bottom: 1px solid #eee;
    }
  `,
})
export class ShoppingListComponent {
  private shoppingListService = inject(ShoppingListService);

  // Get items from service, using the service method directly
  getItems() {
    return this.shoppingListService.getItems()();
  }

  // Methods to filter items
  getUnpurchasedItems(): ShoppingItem[] {
    return this.getItems().filter((item) => !item.purchased);
  }

  getPurchasedItems(): ShoppingItem[] {
    return this.getItems().filter((item) => item.purchased);
  }

  // Counts for display
  get unpurchasedCount(): number {
    return this.getUnpurchasedItems().length;
  }

  get purchasedCount(): number {
    return this.getPurchasedItems().length;
  }

  // Event handlers
  onItemToggled(id: number) {
    this.shoppingListService.togglePurchased(id);
  }

  onItemDeleted(id: number) {
    this.shoppingListService.deleteItem(id);
  }

  onItemEdited(item: ShoppingItem) {
    this.shoppingListService.updateItem(item);
  }

  onItemAdded(item: Omit<ShoppingItem, 'id'>) {
    this.shoppingListService.addItem(item);
  }
}
