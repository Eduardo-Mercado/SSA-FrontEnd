import { Task } from './task.model';

export interface Activity {
  id?: number;
  idProject?: number;
  title?: string;
  summary?: string;
  createdBy?: number;
  assignedTo?: number;
  start?: Date;
  finish?: Date;
  idPriority?: number;
}

export interface ActivityBackLog {
  idActivity: number;
  activity: string;
  assignedTo: string;
  priority: string;
  status: string;
}

export interface ActivityInfoSummary {
  activity?: string;
  descriptionActivity?: string;
  startActivity?: Date;
  endActivity?: Date;
  createdBy?: string;
  assignedTo?: string;
  timeInvested: string;
  tasks?: Task[];
}
