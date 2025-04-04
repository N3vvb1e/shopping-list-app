import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShoppingItem } from '../../models/shopping-item.model';

@Component({
  selector: 'app-shopping-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <h2>Add New Item</h2>
      <form [formGroup]="itemForm" (ngSubmit)="onSubmit()">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Item Name*</label>
            <input
              type="text"
              id="name"
              formControlName="name"
              placeholder="e.g., Apples"
            />
            @if (itemFormControls['name'].invalid &&
            (itemFormControls['name'].dirty ||
            itemFormControls['name'].touched)) {
            <div class="error">Item name is required</div>
            }
          </div>

          <div class="form-group">
            <label for="quantity">Quantity*</label>
            <input
              type="number"
              id="quantity"
              formControlName="quantity"
              min="1"
              placeholder="e.g., 5"
            />
            @if (itemFormControls['quantity'].invalid &&
            (itemFormControls['quantity'].dirty ||
            itemFormControls['quantity'].touched)) {
            <div class="error">Quantity must be at least 1</div>
            }
          </div>

          <div class="form-group">
            <label for="unit">Unit*</label>
            <input
              type="text"
              id="unit"
              formControlName="unit"
              placeholder="e.g., kg, pcs"
            />
            @if (itemFormControls['unit'].invalid &&
            (itemFormControls['unit'].dirty ||
            itemFormControls['unit'].touched)) {
            <div class="error">Unit is required</div>
            }
          </div>

          <div class="form-group">
            <label for="price">Price (optional)</label>
            <input
              type="number"
              id="price"
              formControlName="price"
              min="0"
              step="0.01"
              placeholder="e.g., 2.99"
            />
          </div>
        </div>

        <button type="submit" class="add-button" [disabled]="itemForm.invalid">
          Add to List
        </button>
      </form>
    </div>
  `,
  styles: `
    .form-container {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 20px;
      border: 1px solid #ddd;
    }
    
    h2 {
      margin-top: 0;
      margin-bottom: 15px;
      color: #333;
    }
    
    .form-row {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-bottom: 15px;
    }
    
    .form-group {
      flex: 1;
      min-width: 150px;
      display: flex;
      flex-direction: column;
    }
    
    label {
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 0.9em;
    }
    
    input {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1em;
    }
    
    .error {
      color: #d9534f;
      font-size: 0.8em;
      margin-top: 5px;
    }
    
    .add-button {
      background-color: #5cb85c;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1em;
      transition: background-color 0.3s;
    }
    
    .add-button:hover {
      background-color: #4cae4c;
    }
    
    .add-button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `,
})
export class ShoppingFormComponent {
  @Output() itemAdded = new EventEmitter<Omit<ShoppingItem, 'id'>>();

  itemForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unit: ['', [Validators.required]],
      price: [null],
      purchased: [false],
    });
  }

  get itemFormControls() {
    return this.itemForm.controls;
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.itemAdded.emit(this.itemForm.value);
      this.itemForm.reset({
        name: '',
        quantity: 1,
        unit: '',
        price: null,
        purchased: false,
      });
    }
  }
}
