// This service handles all CRUD operations for shopping list items
import { Injectable, signal } from '@angular/core';
import { ShoppingItem } from '../models/shopping-item.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  // Using signals for state management (Angular 19 feature)
  private shoppingItems = signal<ShoppingItem[]>([
    { id: 1, name: 'Milk', quantity: 1, unit: 'liter', purchased: false },
    { id: 2, name: 'Bread', quantity: 2, unit: 'loaf', purchased: false },
    { id: 3, name: 'Eggs', quantity: 12, unit: 'pieces', purchased: false },
  ]);

  // Get all items
  getItems() {
    return this.shoppingItems;
  }

  // Add a new item
  addItem(item: Omit<ShoppingItem, 'id'>) {
    const currentItems = this.shoppingItems();
    const newId =
      currentItems.length > 0
        ? Math.max(...currentItems.map((item) => item.id)) + 1
        : 1;

    this.shoppingItems.update((items) => [...items, { ...item, id: newId }]);

    return newId;
  }

  // Get a single item by ID
  getItemById(id: number) {
    return this.shoppingItems().find((item) => item.id === id);
  }

  // Update an existing item
  updateItem(updatedItem: ShoppingItem) {
    this.shoppingItems.update((items) =>
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  }

  // Delete an item
  deleteItem(id: number) {
    this.shoppingItems.update((items) =>
      items.filter((item) => item.id !== id)
    );
  }

  // Toggle purchase status
  togglePurchased(id: number) {
    this.shoppingItems.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  }
}
