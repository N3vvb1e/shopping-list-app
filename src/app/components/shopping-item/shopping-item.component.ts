import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingItem } from '../../models/shopping-item.model';

@Component({
  selector: 'app-shopping-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="item-container" [class.purchased]="item.purchased">
      @if (!isEditing) {
      <div class="item-content">
        <div class="checkbox-container">
          <input
            type="checkbox"
            [checked]="item.purchased"
            (change)="toggleItem()"
            [id]="'item-' + item.id"
          />
          <label [for]="'item-' + item.id"></label>
        </div>

        <div class="item-details">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-quantity">{{ item.quantity }} {{ item.unit }}</span>
          @if (item.price) {
          <span class="item-price">{{ item.price | currency }}</span>
          }
        </div>

        <div class="item-actions">
          <button class="edit-button" (click)="startEditing()">Edit</button>
          <button class="delete-button" (click)="deleteItem()">Delete</button>
        </div>
      </div>
      } @else {
      <div class="item-edit-form">
        <input
          type="text"
          [(ngModel)]="editedItem.name"
          placeholder="Item name"
          required
        />
        <input
          type="number"
          [(ngModel)]="editedItem.quantity"
          placeholder="Quantity"
          min="1"
        />
        <input type="text" [(ngModel)]="editedItem.unit" placeholder="Unit" />
        <input
          type="number"
          [(ngModel)]="editedItem.price"
          placeholder="Price (optional)"
          step="0.01"
          min="0"
        />
        <div class="edit-actions">
          <button class="save-button" (click)="saveEdit()">Save</button>
          <button class="cancel-button" (click)="cancelEdit()">Cancel</button>
        </div>
      </div>
      }
    </div>
  `,
  styles: `
    .item-container {
      display: flex;
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 5px;
      background-color: #f9f9f9;
      border: 1px solid #eee;
      transition: all 0.3s ease;
    }
    
    .item-container.purchased {
      opacity: 0.6;
      background-color: #f0f0f0;
    }
    
    .item-content {
      display: flex;
      width: 100%;
      align-items: center;
    }
    
    .checkbox-container {
      margin-right: 15px;
    }
    
    .item-details {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    
    .item-name {
      font-weight: bold;
      font-size: 1.1em;
    }
    
    .item-quantity {
      color: #666;
      font-size: 0.9em;
    }
    
    .item-price {
      color: #0066cc;
      font-size: 0.9em;
    }
    
    .item-actions {
      display: flex;
      gap: 5px;
    }
    
    button {
      padding: 5px 10px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-size: 0.9em;
    }
    
    .edit-button {
      background-color: #f0ad4e;
      color: white;
    }
    
    .delete-button {
      background-color: #d9534f;
      color: white;
    }
    
    .save-button {
      background-color: #5cb85c;
      color: white;
    }
    
    .cancel-button {
      background-color: #6c757d;
      color: white;
    }
    
    .item-edit-form {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      width: 100%;
    }
    
    .item-edit-form input {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .item-edit-form input[type="text"] {
      flex: 2;
    }
    
    .item-edit-form input[type="number"] {
      flex: 1;
      min-width: 80px;
    }
    
    .edit-actions {
      display: flex;
      gap: 5px;
      margin-left: auto;
    }
    
    .purchased .item-name {
      text-decoration: line-through;
    }
  `,
})
export class ShoppingItemComponent {
  @Input() item!: ShoppingItem;
  @Output() itemToggled = new EventEmitter<number>();
  @Output() itemDeleted = new EventEmitter<number>();
  @Output() itemEdited = new EventEmitter<ShoppingItem>();

  isEditing = false;
  editedItem: ShoppingItem = {} as ShoppingItem;

  // Actions
  toggleItem() {
    this.itemToggled.emit(this.item.id);
  }

  deleteItem() {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemDeleted.emit(this.item.id);
    }
  }

  startEditing() {
    this.editedItem = { ...this.item };
    this.isEditing = true;
  }

  saveEdit() {
    if (this.editedItem.name && this.editedItem.quantity > 0) {
      this.itemEdited.emit(this.editedItem);
      this.isEditing = false;
    }
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
