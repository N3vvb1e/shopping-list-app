# ShoppingListApp

A web-based shopping list application built with Angular that helps users manage their shopping items efficiently.

## Features

- Create and manage shopping items with names, quantities, and categories
- Organize items into categories
- Mark items as purchased
- Edit existing items
- Remove items from the list
- Responsive design for both desktop and mobile use

## Project Structure

The application follows a standard Angular project structure:

```
src/
├── app/
│   ├── components/
│   │   ├── shopping-form/      # Form for adding/editing items
│   │   ├── shopping-item/      # Individual item display
│   │   └── shopping-list/      # Main list view
│   ├── models/
│   │   └── shopping-item.model.ts
│   ├── services/
│   │   └── shopping-list.service.ts
│   └── app.component.*         # Root component files
```

## Development Setup

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- Angular CLI (`npm install -g @angular/cli`)

### Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200/`

The application will automatically reload whenever you modify any of the source files.

## Development Tools

### Code Scaffolding

Generate new components, services, pipes, and more using Angular CLI:

```bash
ng generate component new-component
ng generate service new-service
ng generate pipe new-pipe
```

For a complete list of available generation options:
```bash
ng generate --help
```

### Building for Production

To create a production build:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment.

### Testing

#### Unit Tests

Run unit tests via [Karma](https://karma-runner.github.io):

```bash
ng test
```

#### End-to-End Tests

Run end-to-end tests (requires separate installation of testing framework):

```bash
ng e2e
```

## VS Code Integration

The project includes VS Code configuration files for enhanced development experience. Recommended extensions are specified in `.vscode/extensions.json`.

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Overview and Reference](https://angular.dev/tools/cli)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
