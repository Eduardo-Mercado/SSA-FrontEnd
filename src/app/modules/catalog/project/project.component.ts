import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project, ProjectIndex } from 'src/app/core/models/catalog/project.model';
import { DropDown } from 'src/app/core/models/dropwdonw.model';
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { ModalPopupService } from 'src/app/shared/modal-popup/modal-popup.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {

  coworkerList: DropDown[] = [];
  dynamicError = '';
  projects: ProjectIndex[] = [];
  projectForm: FormGroup;
  projectRecord: Project;
  rolCoworkerProjectList: DropDown[] = [];
  selectValue: number;
  showForm: boolean;
  source: ElementTable[] = [];

  constructor(private modal: ModalPopupService, private dropdownServ: DropdownService, private formBuilder: FormBuilder,
              private projectServ: ProjectService, private router: Router) {
    this.projectRecord = { teamProject: [] };
  }

  ngOnInit() {
    this.showForm = false;
    this.projectServ.getAll().subscribe(data => {
      this.projects = data as ProjectIndex[];
    });

    this.dropdownServ.getCoworker().subscribe((data) => {
      this.coworkerList = data as DropDown[];
      this.selectValue = 0;
    });

    this.dropdownServ.getRolCoworkerProject().subscribe(data => {
      this.rolCoworkerProjectList = data as DropDown[];
    });

    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      teamMember: ['', Validators.required]
    }, { validators: this.must_greatDate });
  }

  must_greatDate(fromgroup: FormGroup) {
    try {
      const invalid = fromgroup.get('startDate').value > fromgroup.get('endDate').value;
      if (invalid) {
        fromgroup.get('endDate').setErrors({ mustGreatest: true });
      } else {
        fromgroup.get('endDate').setErrors(null);
      }
    } catch (error) {
      console.log(error);
    }

  }

  trackByIdx(index: number, obj: any): number {
    return index;
  }

  compareFn(op1: number, op2: number) {
    return op1 === op2;
  }

  ShowForm() {
    this.showForm = true;
  }

  ReturnIndex() {
    this.showForm = false;
  }

  openModalCoworker() {
    this.modal.open('ContainerSelectCoworker');
  }

  closeModalSelectCoworker() {
    this.modal.close('ContainerSelectCoworker');
  }

  SelectedCoworker(value: number) {
    if (value > 0) {
      this.modal.close('ContainerSelectCoworker');
      const coworkerSelected = this.coworkerList.filter(x => x.id === value)[0];
      this.source.push({ coworker: coworkerSelected.value, coworkerId: coworkerSelected.id, rol: 0 });
      this.coworkerList = this.coworkerList.filter(x => x.id !== coworkerSelected.id);
    }
  }

  SelectedRolCoworker() {
    this.projectForm.get('teamMember').clearValidators();
    this.projectForm.get('teamMember').updateValueAndValidity();
  }

  removeTeamMember(id: number) {
    const coworkerSelected = this.source.filter(x => x.coworkerId === id)[0];
    this.source = this.source.filter(x => x.coworkerId !== id);
    this.selectValue = 0;
    this.coworkerList.push({ id: coworkerSelected.coworkerId, value: coworkerSelected.coworker });
    if (this.source.length === 0) {
      this.projectForm.get('teamMember').setValidators([Validators.required]);
      this.projectForm.get('teamMember').updateValueAndValidity();
    }
  }

  WatchProject(id: number) {
    this.router.navigate(['Project', id]);
  }

  SaveRecord() {
    if (this.projectForm.valid) {
      this.projectRecord.description = this.projectForm.controls.description.value;
      this.projectRecord.title = this.projectForm.controls.title.value;
      this.projectRecord.startDate = this.projectForm.controls.startDate.value;
      this.projectRecord.endDate = this.projectForm.controls.endDate.value;
      this.projectRecord.teamProject = this.source.map(x => {
        const obj = {
          idCoworker: x.coworkerId,
          idRolCoworkerProject: x.rol
        };
        return obj;
      });
      this.projectServ.saveChanges(this.projectRecord).subscribe((data: ProjectIndex) => {
        if (this.projectRecord.id > 0) {
          // update list.
        } else {
          // add to list.
          this.projects.push(data);
        }
      });
    }
  }
}

export interface ElementTable {
  coworker: string;
  coworkerId: number;
  rol: number;
}
