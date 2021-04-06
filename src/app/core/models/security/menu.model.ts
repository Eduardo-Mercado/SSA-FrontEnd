export class SubOption {
  idOption: number;
  name: string;
  path: string;
  nameCssClass: string;
  icon: string;
}

export interface OptionApp {
  name: string;
  icon: string;
  id: number;
  nodes: SubOption[];
}
