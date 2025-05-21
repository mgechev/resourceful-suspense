import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, signal, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

interface ChatMessage {
  text: string;
  sent: boolean;
  html?: SafeHtml;
}

@Component({
  selector: 'ec-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-container">
      <div class="messages" #messagesContainer>
        @for (message of messages(); track message) {
          <div class="message" [class.sent]="message.sent">
            <div class="message-content" [innerHTML]="message.html || message.text"></div>
          </div>
        }
      </div>
      <div class="input-area">
        <input
          type="text"
          [(ngModel)]="newMessage"
          (keyup.enter)="sendMessage()"
          placeholder="Type a message..."
        />
        <button (click)="sendMessage()">Send</button>
      </div>
    </div>
  `,
  styles: [`
    .chat-container {
      height: 500px;
      display: flex;
      flex-direction: column;
      background: #1a1a1a;
    }

    .messages {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      scroll-behavior: smooth;
    }

    .message {
      margin-bottom: 10px;
      max-width: 80%;
    }

    .message-content {
      padding: 8px 12px;
      background: #2d2d2d;
      border-radius: 12px;
      display: inline-block;
      color: #ffffff;
    }

    .message-content :global(p) {
      margin: 0;
    }

    .message-content :global(pre) {
      background: #1a1a1a;
      padding: 8px;
      border-radius: 4px;
      overflow-x: auto;
    }

    .message-content :global(code) {
      font-family: monospace;
    }

    .message-content :global(ul), .message-content :global(ol) {
      margin: 0;
      padding-left: 20px;
    }

    .message.sent {
      margin-left: auto;
    }

    .message.sent .message-content {
      background: #007bff;
      color: #ffffff;
    }

    .input-area {
      padding: 10px;
      border-top: 1px solid #2d2d2d;
      display: flex;
      gap: 8px;
      background: #1a1a1a;
    }

    input {
      flex: 1;
      padding: 8px;
      border: 1px solid #2d2d2d;
      border-radius: 4px;
      outline: none;
      background: #2d2d2d;
      color: #ffffff;
    }

    input::placeholder {
      color: #888888;
    }

    button {
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    button:hover {
      background: #0056b3;
    }

    /* Custom scrollbar for dark theme */
    .messages::-webkit-scrollbar {
      width: 6px;
    }

    .messages::-webkit-scrollbar-track {
      background: #1a1a1a;
    }

    .messages::-webkit-scrollbar-thumb {
      background: #2d2d2d;
      border-radius: 3px;
    }

    .messages::-webkit-scrollbar-thumb:hover {
      background: #3d3d3d;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  messages = signal<ChatMessage[]>([]);
  newMessage = '';

  constructor(private sanitizer: DomSanitizer) {
    afterNextRender(() => {
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    const container = this.messagesContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.addMessage(this.newMessage, true);

      fetch(`/api/prompt?prompt=${this.newMessage}`)
      .then(response => response.json())
      .then(data => {
        this.addMessage(data.answer, false);
      });
      
      this.newMessage = '';
    }
  }

  private addMessage(message: string, sent: boolean) {
    const html = this.sanitizer.bypassSecurityTrustHtml(marked.parse(message) as string);
    this.messages.update(messages => [
      ...messages,
      { text: message, sent, html }
    ]);
    
    // Use requestAnimationFrame to ensure the DOM has updated
    requestAnimationFrame(() => {
      this.scrollToBottom();
    });
  }
} 