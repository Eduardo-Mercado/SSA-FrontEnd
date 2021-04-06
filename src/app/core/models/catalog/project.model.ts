export interface Project {
  id?: number;
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  teamProject: TeamProject[];
}

export interface TeamProject {
  idCoworker?: number;
  idRolCoworkerProject?: number;
}

export interface ProjectIndex {
  id?: number;
  title?: string;
  description?: string;
  team: TeamProjectIndex[];
}

export interface TeamProjectIndex {
  name?: number;
  avatar?: number;
  rolProject?: number;
}
