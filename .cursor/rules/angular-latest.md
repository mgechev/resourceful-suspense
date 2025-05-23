## Angular Component Generation

- Always generate standalone components (`standalone: true`).
- Default to `ChangeDetectionStrategy.OnPush`.
- Use the `inject` function for dependencies. Example: `const myService = inject(MyService);`
- Component templates should use the new built-in control flow syntax (`@if`, `@for`).
- Use `NgOptimizedImage` for all static images.
- Selector prefix should be `app-`.

## Angular Service Generation

- Services should be tree-shakable (`providedIn: 'root'`).
- Use the `inject` function for internal dependencies.

## State Management

- Prefer Angular Signals for reactive state within components.
- For complex global state, consider [Your Preferred State Management Library, e.g., NgRx with SignalStore adaptations].