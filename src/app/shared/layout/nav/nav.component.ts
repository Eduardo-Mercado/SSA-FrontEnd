import { Component, OnInit } from '@angular/core';
import { OptionApp, SubOption } from 'src/app/core/models/security/menu.model';
import { AuthService } from 'src/app/core/services/authentication/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  userName = '';
  menu: OptionApp[] = [];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe(data => {
      this.userName = data.username;
    });

    this.LoadOption();
  }

  LoadOption() {
    this.authService.getOptionSystem().subscribe((data: any[]) => {
      this.menu = data.filter((x) => x.idParent === 0)
        .map(item => {
          const node = { name: '', icon: '', nodes: [] , id: 0};
          node.name = item.name;
          node.icon = item.icon;
          node.nodes = [];
          node.id = item.idOption;
          node.nodes =
           data.filter((x) => x.idParent === node.id)
                .map(info => {
                    const subnode = { name: '', icon: '', nameCssClass: '' ,  path: '', idOption: 0};
                    subnode.icon = info.icon;
                    subnode.idOption = info.idOption;
                    subnode.name = info.name;
                    subnode.path = info.url;
                    return subnode;
                });

          return node;
        });


    });
  }

  Logout() {
    this.authService.logout();
  }
}
