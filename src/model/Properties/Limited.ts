import { TypeOfProperty } from "../enums/TypeOfProperty";
import { Page } from "../pages/Page";
import { Project } from "../Project";
import { Property } from "./Property";

export class Permited extends Property {
  maximum: Number;

  constructor(
    id: Number,name: String,visible: Boolean,obligatory: Boolean,type: TypeOfProperty,page: Page,project: Project,maximum: Number
  ) {
    super(id, name, visible, obligatory, type, page, project);
    this.maximum = maximum;
  }
}
