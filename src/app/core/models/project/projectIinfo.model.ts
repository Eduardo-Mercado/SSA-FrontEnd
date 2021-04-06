import { ActivityBackLog } from './activity.mdel';

export interface ProjectInfo {
  idProject?: number;
  project?: string;
  startProject?: Date;
  finishProject?: Date;
  activities?: ActivityBackLog[];
}
