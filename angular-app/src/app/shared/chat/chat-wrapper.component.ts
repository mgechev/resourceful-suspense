import { Component } from "@angular/core";
import { ChatComponent } from "./chat.component";
import { httpResource } from "@angular/common/http";

@Component({
  selector: 'ec-chat-wrapper',
  standalone: true,
  imports: [ChatComponent],
  template: `
    @if (!userResource.isLoading()) {
      <ec-chat [name]="userResource.value()!.name" />
    } @else {
      <span>Loading user profile...</span>
    }
`,
  styles: `
    :host {
      height: 500px;
      width: 100%;
      display: block;
    }

    span {
      padding: 15px;
      padding-top: 50px;
    }
  `
})
export class ChatWrapperComponent {
  userResource = httpResource<{ name: string }>(() => '/api/user');
}
