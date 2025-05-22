import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  afterNextRender,
  input,
  viewChild,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { Action, ActionExecutor } from './action-executor';
import { httpResource } from '@angular/common/http';

interface ChatMessage {
  text: string;
  by: 'user' | 'bot';
  html?: SafeHtml;
}

interface Response {
  message: string;
  action?: Action;
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
          <div
            class="message-content"
            [innerHTML]="message.html || message.text"
          ></div>
        </div>
        } @if (nextBotMessage.isLoading()) { Typing... }
      </div>
      <div class="input-area">
        <input
          type="text"
          [(ngModel)]="userMessage"
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
  name = input.required<string>();

  protected messagesContainer = viewChild.required<ElementRef>('messagesContainer');
  protected messages = signal<ChatMessage[]>([]);
  protected userMessage = '';
  protected lastMessage = signal('');
  protected isLoading = signal(false).asReadonly();

  protected nextBotMessage = httpResource<Response>(() =>
    this.lastMessage()
      ? `/api/prompt?prompt=${this.lastMessage()}&tech=angular&name=${this.name()}`
      : undefined
  );

  constructor(
    private sanitizer: DomSanitizer,
    private actionExecutor: ActionExecutor
  ) {
    afterNextRender(() => {
      this.scrollToBottom();
    });

    effect(() => {
      const response = this.nextBotMessage.value();
      if (!response) return;
  
      this.addMessage(response.message, 'bot');
      if (response.action) {
        this.actionExecutor.executeAction(response.action);
      }
    });
  }

  private scrollToBottom(): void {
    const container = this.messagesContainer().nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  sendMessage() {
    this.lastMessage.set(this.userMessage.trim());
    this.addMessage(this.lastMessage(), 'user');
    this.userMessage = '';
  }

  private addMessage(message: string, by: 'user' | 'bot') {
    const html = this.sanitizer.bypassSecurityTrustHtml(
      marked.parse(message) as string
    );
    this.messages.update((messages) => [
      ...messages,
      { text: message, by, html },
    ]);

    // Use requestAnimationFrame to ensure the DOM has updated
    requestAnimationFrame(() => {
      this.scrollToBottom();
    });
  }
}
