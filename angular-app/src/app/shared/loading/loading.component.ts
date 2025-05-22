import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';

@Component({
  selector: 'ec-loading',
  standalone: true,
  template: `
    <div class="loading-container">
      <div class="spinner"></div>
      @if (message()) {
        <div class="message">{{ message() }}</div>
      }
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      gap: 1rem;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .message {
      color: #666;
      font-size: 0.9rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  message = input.required<string>();
} 