import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { DropDown } from 'src/app/core/models/dropwdonw.model';
import { Activity, ActivityBackLog } from 'src/app/core/models/project/activity.mdel';
import { ProjectInfo } from 'src/app/core/models/project/projectIinfo.model';
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { ActivitiesService } from 'src/app/core/services/project/activities.service';
import { ModalPopupService } from 'src/app/shared/modal-popup/modal-popup.service';
import { CatalogStatusService } from 'src/app/core/services/catalog-status.service';
import { AuthService } from 'src/app/core/services/authentication/auth.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.sass']
})
export class ActivityComponent implements OnInit {

  projectInfo: ProjectInfo;
  showData = false;
  listTeamProject: DropDown[] = [];
  listCategory: DropDown[] = [];
  activityForm: FormGroup;
  activityRecord: Activity;
  idUserLogin = 0;

  constructor(private modal: ModalPopupService, private activatedRoute: ActivatedRoute, private service: ActivitiesService,
              private dropdownService: DropdownService, private formBuilder: FormBuilder, private router: Router,
              private location: Location, private servicioCatalog: CatalogStatusService , private authService: AuthService ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.LoadDropdowns(+params.get('id'));
      this.LoadInfoProject(+params.get('id'));
      this.activityRecord = {};
      this.activityRecord.idProject = +params.get('id');
      this.projectInfo = {
        activities: []
      };

      this.authService.user$.subscribe((data) => { this.idUserLogin = data.id; });
    });

    this.activityForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      start: ['', Validators.required],
      finish: ['', Validators.required],
      assignTo: ['', Validators.required],
      priority: ['', Validators.required]
    }, { validators: this.must_greatDate });
  }

  must_greatDate(fromgroup: FormGroup) {
    try {
      const invalid = fromgroup.get('start').value > fromgroup.get('finish').value;
      if (invalid) {
        fromgroup.get('finish').setErrors({ mustGreatest: true });
      } else {
        fromgroup.get('finish').setErrors(null);
      }
    } catch (error) {
      console.log(error);
    }

  }

  private LoadDropdowns(idProject: number) {
    this.dropdownService.getTeamProject(idProject).subscribe((data: DropDown[]) => {
      this.listTeamProject = data;
    });
    this.dropdownService.getCategoryActivities().subscribe((data: DropDown[]) => {
      this.listCategory = data;
    });
  }

  private LoadInfoProject(idProject: number) {
    this.service.getProjectInfo(idProject).subscribe((data: ProjectInfo) => {
      this.projectInfo = data;
      this.showData = true;
    });
  }

  FilterActivitiesByStatus(status: string){
    return this.projectInfo.activities.filter( x => x.status === status);
  }

  BackLocation() {
    this.location.back();
  }

  AddActivity() {
    this.modal.open('ContainerActivityModal');
  }

  CloseModal() {
    this.modal.close('ContainerActivityModal');
  }

  SaveActivity() {
    if (this.activityForm.valid) {
      this.activityRecord.idPriority = this.activityForm.controls.priority.value;
      this.activityRecord.summary = this.activityForm.controls.description.value;
      this.activityRecord.title = this.activityForm.controls.title.value;
      this.activityRecord.start = this.activityForm.controls.start.value;
      this.activityRecord.finish = this.activityForm.controls.finish.value;
      this.activityRecord.assignedTo = this.activityForm.controls.assignTo.value;
      this.activityRecord.createdBy = this.idUserLogin;


      this.service.saveChanges(this.activityRecord).subscribe((data: ActivityBackLog) => {
        this.CloseModal();
        if (this.activityRecord.id > 0) {
         const index =  this.projectInfo.activities.findIndex(x => x.idActivity === data.idActivity);
         this.projectInfo.activities[index] = data;
        } else {
          this.projectInfo.activities.push(data);
        }
      });
    }
  }

  AddTasks(id: number) {
    this.router.navigate(['Task', id], {relativeTo: this.activatedRoute});
  }

  AutorizeTasks(id: number) {
    this.router.navigate(['AutorizeTask', id], {relativeTo: this.activatedRoute});
  }

  Delete(id: number) {
    this.router.navigate(['Task', id], {relativeTo: this.activatedRoute});
  }

  Edit(id: number) {
    this.router.navigate(['Task', id], {relativeTo: this.activatedRoute});
  }

  getColorTag(name: string){
    return this.servicioCatalog.getColorByName(name);
   }

  SeeTasks(id: number) {
    this.router.navigate(['SeeTask', id], {relativeTo: this.activatedRoute});
  }
}
