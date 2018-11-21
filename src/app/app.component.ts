import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { TdMediaService } from '@covalent/core';
import { User } from './user';
import { NewChatDialogComponent } from './new-chat-dialog/new-chat-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Chat App';

  user: User = null;

  channel: Object = null;

  routes: Object[] = [
    {
      title: 'Inbox',
      route: '/',
      icon: 'email',
    }, {
      title: 'Snoozed',
      route: '/',
      icon: 'access_time',
    }, {
      title: 'Drafts',
      route: '/',
      icon: 'drafts',
    }, {
      title: 'Sent',
      route: '/',
      icon: 'send',
    }, {
      title: 'Trash',
      route: '/',
      icon: 'delete',
    },
  ];

  constructor(public media: TdMediaService,
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    public dialog: MatDialog) {

    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/teradata-ux.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent-mark.svg'));

  }

  onChatChannelClicked(){
    this.user = {
      id: 1,
      name: "Ala Rai AbdiAllah",
      avatar: "https://api.adorable.io/avatars/285/1@adorable.io.png"
    }
    this.channel = {
      id: 1,
      name: "Aselole"
    }
  }

  newChat(){
    const dialogRef = this.dialog.open(NewChatDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
