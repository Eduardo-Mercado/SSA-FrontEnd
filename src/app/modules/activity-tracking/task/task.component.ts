import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DropDown } from 'src/app/core/models/dropwdonw.model';
import { ActivityInfoSummary } from 'src/app/core/models/project/activity.mdel';
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { TasksService } from 'src/app/core/services/project/tasks.service';
import { ModalPopupService } from 'src/app/shared/modal-popup/modal-popup.service';
import { TaskRecord } from 'src/app/core/models/project/task.model';
import { CatalogStatusService } from 'src/app/core/services/catalog-status.service';
import { TimeSpan } from 'src/app/core/helpers/timespan';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit, OnDestroy {
  idActivity: number;
  info: ActivityInfoSummary;
  showData = false;
  taskForm: FormGroup;
  listCategory: DropDown[] = [];
  taskRecord: TaskRecord;
  undeReview = false;
  justSee = false;
  constructor(private activateRoute: ActivatedRoute, private dropdownService: DropdownService, private service: TasksService,
              private formBuilder: FormBuilder, private modal: ModalPopupService, private location: Location,
              private servicioCatalog: CatalogStatusService) { }

  ngOnInit(): void {
    this.taskRecord = {};
    this.activateRoute.url.subscribe(data => {
      this.undeReview = data[0].path === 'AutorizeTask' ? true : false;
      this.justSee = data[0].path === 'SeeTask' ? true : false;
    });

    this.activateRoute.paramMap.subscribe(params => {
      this.taskRecord.idActivity = +params.get('id');
      this.LoadInfoActivity(+params.get('id'));
    });

    this.dropdownService.getCategoryTasks().subscribe((data: DropDown[]) => {
      this.listCategory = data;
    });

    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      idCategory: [0, Validators.required],
      start: ['', Validators.required],
      finish: ['', Validators.required],
      timeInvested: ['', Validators.required],
      progressPercent: [0, Validators.required]
    });

  }

  private LoadInfoActivity(id: number) {
    this.idActivity = id;
    this.service.getSummaryTasks(id).subscribe(data => {
      this.info = data;
      this.showData = true;
    });

  }

  public BackLocation() {
    this.location.back();
  }

  public OpenModal() {
    this.modal.open('ContainerTaskModal');
  }

  public SaveTask() {
    if (this.taskForm.valid) {
      const timeSpanTempHours = new TimeSpan();
      timeSpanTempHours.hours =  this.taskForm.controls.timeInvested.value.slice(0, 2);
      timeSpanTempHours.minutes = this.taskForm.controls.timeInvested.value.slice(2, 4);
      this.taskRecord.title = this.taskForm.controls.title.value;
      this.taskRecord.description = this.taskForm.controls.description.value;
      this.taskRecord.idCategory = this.taskForm.controls.idCategory.value;
      this.taskRecord.end = this.taskForm.controls.finish.value;
      this.taskRecord.start = this.taskForm.controls.start.value;
      this.taskRecord.timeInvested = timeSpanTempHours.milliseconds;
      this.taskRecord.progressPercent = this.taskForm.controls.progressPercent.value;
      this.service.saveChanges(this.taskRecord).subscribe(() => {
        this.CloseModal();
        this.service.getSummaryTasks(this.idActivity).subscribe(data => {
          this.info = data;
        });
      });
    }
  }

  public CloseModal() {
    this.modal.close('ContainerTaskModal');
  }

  public edit(id: number) {
    this.service.getTaskById(this.idActivity, id).subscribe(data => {
      const timeSpanTemp = new TimeSpan(data.timeInvested);
      this.taskRecord.id = data.id;
      this.taskRecord.idActivity = this.idActivity;
      this.taskForm.setValue({
        title: data.title,
        description: data.description,
        idCategory: data.idCategory,
        start: data.start,
        finish: data.end,
        timeInvested: timeSpanTemp.hours + ':' + timeSpanTemp.minutes,
        progressPercent: data.progressPercent
      });
      this.modal.open('ContainerTaskModal');
    });
  }

  ngOnDestroy(): void {

  }

  getColorTag(name: string) {
    return this.servicioCatalog.getColorByName(name);
  }

  getChangeAutorized(event, index: number) {
    this.info.tasks[index].isAutorize = (event.value === 1) ? true : false;
  }

  SaveAuthorizeChanges(){
    const listTasks = this.info.tasks.map((data) =>  ({
      isAutorize: true,
      comentAutorize: '',
      id: data.id
    }));

    console.log(listTasks);
    this.service.authorizeTaks(this.info.tasks, this.idActivity).subscribe(() => {
     this.BackLocation();
    });
  }
}
