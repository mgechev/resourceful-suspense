import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, signal, afterNextRender, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { ActionExecutor } from './action-executor';

interface ChatMessage {
  text: string;
  by: 'user' | 'bot';
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
          <div class="message" [class.user]="message.by === 'user'">
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
  styleUrl: './chat.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  name = input.required<string>();
  messages = signal<ChatMessage[]>([]);
  newMessage = '';

  constructor(private sanitizer: DomSanitizer, private actionExecutor: ActionExecutor) {
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
      this.addMessage(this.newMessage, 'user');

      fetch(`/api/prompt?prompt=${this.newMessage}&tech=angular&name=${this.name()}`)
      .then(response => response.json())
      .then(data => {
        this.addMessage(data.message, 'bot');
        if (data.action) {
          this.actionExecutor.executeAction(data.action);
        }
      });
      
      this.newMessage = '';
    }
  }

  private addMessage(message: string, by: 'user' | 'bot') {
    const html = this.sanitizer.bypassSecurityTrustHtml(marked.parse(message) as string);
    this.messages.update(messages => [
      ...messages,
      { text: message, by, html }
    ]);
    
    // Use requestAnimationFrame to ensure the DOM has updated
    requestAnimationFrame(() => {
      this.scrollToBottom();
    });
  }
} 