import { TypeOfProperty } from "../enums/TypeOfProperty";
import { Page } from "../pages/Page";
import { Project } from "../Project";
import { Property } from "./Property";

export class Permited extends Property {
  maximum: number;

  constructor(
    id: number,name: string,visible: boolean,obligatory: boolean,type: TypeOfProperty,pages: Array<Page>,project: Project,maximum: number
  ) {
    super(id, name, visible, obligatory, type, pages, project);
    this.maximum = maximum;
  }
}
