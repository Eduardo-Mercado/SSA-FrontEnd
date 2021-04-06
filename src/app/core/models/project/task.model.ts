
export interface Task {
  id?: number;
  title?: string;
  description?: string;
  end?: Date;
  start?: Date;
  timeInvested?: Date;
  category?: string;
  ProgressPercent?: number;
  status: string;
  isAutorize?: boolean;
  comentAutorize: string;
}

export interface TaskRecord {
  id?: number;
  start?: Date;
  title?: string;
  description?: string;
  end?: Date;
  timeInvested?: number;
  idCategory?: number;
  idActivity?: number;
  progressPercent?: number;
}
