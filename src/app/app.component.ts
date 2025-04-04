import { Component } from '@angular/core';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ShoppingListComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>{{ title }}</h1>
      </header>
      <main>
        <app-shopping-list></app-shopping-list>
      </main>
      <footer>
        <p>&copy; 2025 Shopping List App</p>
      </footer>
    </div>
  `,
  styles: `
    .app-container {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 2px solid #5cb85c;
      padding-bottom: 10px;
    }
    
    header h1 {
      color: #5cb85c;
    }
    
    main {
      min-height: calc(100vh - 180px);
    }
    
    footer {
      margin-top: 30px;
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #eee;
      color: #666;
    }
  `,
})
export class AppComponent {
  title = 'Shopping List App';
}
