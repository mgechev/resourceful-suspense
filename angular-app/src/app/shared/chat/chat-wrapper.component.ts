import { Component } from "@angular/core";
import { ChatComponent } from "./chat.component";
import { httpResource } from "@angular/common/http";
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'ec-chat-wrapper',
  standalone: true,
  imports: [ChatComponent, LoadingComponent],
  template: `
    @if (!userResource.isLoading()) {
      <ec-chat [name]="userResource.value()!.name" />
    } @else {
      <ec-loading message="Loading user profile..." />
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
