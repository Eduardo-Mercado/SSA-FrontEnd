import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MustMatch } from 'src/app/core/helpers/must-match';
import { DropDown } from 'src/app/core/models/dropwdonw.model';
import { User, UserItem } from 'src/app/core/models/security/user.model';
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { UserServiceService } from 'src/app/core/services/user-service.service';
import { ModalPopupService } from 'src/app/shared/modal-popup/modal-popup.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  isready: boolean;
  submitted: boolean;
  nVista: number;
  Columns: string[] = ['userName', 'rol', 'nameCoworker', 'id'];
  source = new MatTableDataSource<UserItem>();
  userForm: FormGroup;
  userRecord: User;
  action = 'Add';
  listaUser: UserItem[] = [];
  listAgents: DropDown[] = [];
  listRols: DropDown[] = [];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private service: UserServiceService, private dropdownServ: DropdownService,
              private formBuilder: FormBuilder , private modalService: ModalPopupService) { }

  ngOnInit() {
    this.isready = false;
    this.nVista = 0;
    this.userRecord = new User();
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      passwd: ['',  [Validators.required, Validators.minLength(6)]],
      confirmPasswd: ['', Validators.required],
      idRol: ['', Validators.required],
      idAgent: ['', Validators.required]
    }, {
      validator: MustMatch('passwd', 'confirmPasswd')
  });

    this.loadSource();
  }

  private loadSource() {
    this.service.getUsers().subscribe((data: UserItem[]) => {
      this.listaUser = data as UserItem[];
      this.source.data = this.listaUser;
      this.source.sort = this.sort;
      setTimeout(() =>  this.source.paginator = this.paginator);
      this.isready = true;
    });

    this.dropdownServ.getCoworker().subscribe((data: DropDown[]) => {
      this.listAgents = data as DropDown[];
    });

    this.dropdownServ.getRolApp().subscribe((data: DropDown[]) => {
      this.listRols = data as DropDown[];
    });
  }

  public doFilter = (value: string) => {
    this.source.filter = value.trim().toLocaleLowerCase();
  }

  public onSubmit() {
    this.submitted = true;
    this.userRecord.userName = this.userForm.controls.username.value;
    this.userRecord.password = this.userForm.controls.passwd.value;
    this.userRecord.idRol = this.userForm.controls.idRol.value;
    this.userRecord.idCoworker = this.userForm.controls.idAgent.value;

    if ( this.userRecord.id === 0) {

      this.service.create(this.userRecord).subscribe((data: UserItem) => {
        this.listaUser.push(data);
        this.source.data = this.listaUser;
        this.onReset('userForm');
      });
    } else {
      this.service.update(this.userRecord).subscribe((data: UserItem) => {
        this.listaUser.map((item, i) => {
          if (item.id === data.id) {
            this.listaUser[i] = data;
          }
        });
        this.source.data = this.listaUser;
        this.onReset('userForm');
      });
    }
  }

  public add(id: string) {
    this.action = 'Add User';
    this.modalService.open(id);
    this.userRecord.id = 0;
  }

  public delete(id: number,  i: number) {
    this.service.delete(id).subscribe(
      (data: boolean) => {
        if (data) {
          this.listaUser.splice(i, 1);
          this.source.data = this.listaUser;
        }
        }
    );
  }

  public edit(form: string, id: number) {
    this.service.getUserById(id).subscribe((data: User) => {
      console.log(data);
      this.userRecord.id = data.id;
      this.userForm.setValue({
        username : data.userName,
        passwd: data.password,
        confirmPasswd: data.password,
        idRol: data.idRol,
        idAgent: data.idCoworker
      });
      this.action = 'Update User';
      this.modalService.open(form);
    });
   }

  public  onReset(id: string) {
    this.action = '';
    this.modalService.close(id);
    this.userForm.reset();
    this.userRecord = new User();
  }


}
