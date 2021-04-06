import { Component, OnInit } from '@angular/core';
import { ModalPopupService } from 'src/app/shared/modal-popup/modal-popup.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Coworker } from 'src/app/core/models/catalog/coworker.model';
import { CoworkerService } from 'src/app/core/services/coworker.service';

@Component({
  selector: 'app-coworker',
  templateUrl: './coworker.component.html',
  styleUrls: ['./coworker.component.sass']
})
export class CoworkerComponent implements OnInit {
  listCoworker: Coworker[] = [];
  coworkerForm: FormGroup;
  photo = '';
  coworkerRecord: Coworker;
  indexSelected = 0;
  submitted: boolean;

  constructor(private modal: ModalPopupService, private formBuilder: FormBuilder, private service: CoworkerService) {
    this.coworkerRecord = {};
  }

  ngOnInit() {
    this.coworkerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', Validators.required],
      photo: [' ', Validators.required]
    });
    this.submitted = false;
    this.service.getall().subscribe((data) => { this.listCoworker = data as Coworker[]; });

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader: FileReader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.coworkerRecord.profilePicture = event.target.result;
        this.coworkerForm.setValue({ photo: this.coworkerRecord.profilePicture });
      };
    }
  }

  public OpenModal(index: number) {

    if (index === -1) {
      this.coworkerRecord.id = 0;
      this.modal.open('ContainerCoworkerForm');
    } else {
      this.indexSelected = index;
      this.service.getById(this.listCoworker[index].id).subscribe((data: Coworker) => {
        this.coworkerForm.setValue({
          fullName: data.fullName,
          position: data.position,
          email: data.email,
          photo: data.profilePicture
        });
        this.photo = data.profilePicture;
        this.coworkerRecord.profilePicture = data.profilePicture;
        this.coworkerRecord.id = data.id;
        this.modal.open('ContainerCoworkerForm');
      });
    }
  }

  public CloseModal() {
    this.modal.close('ContainerCoworkerForm');
    this.coworkerForm.reset();
    this.coworkerRecord.id = 0;
    this.indexSelected = 0;
    this.photo = '';
    this.coworkerRecord.profilePicture = '';
  }

  public SaveRecord() {
    if (this.coworkerForm.valid) {
      this.coworkerRecord.fullName = this.coworkerForm.controls.fullName.value;
      this.coworkerRecord.position = this.coworkerForm.controls.position.value;
      this.coworkerRecord.email = this.coworkerForm.controls.email.value;
      this.service.saveChange(this.coworkerRecord).subscribe((data: Coworker) => {
        if (this.coworkerRecord.id > 0) {
          this.listCoworker.map((item, i) => {
            if (item.id === data.id) {
              this.listCoworker[i] = data;
            }
          });
        } else {
          this.listCoworker.push(data);
        }
        this.CloseModal();
      });
    }
  }

}
