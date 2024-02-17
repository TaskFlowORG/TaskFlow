import { AllArgsConstructor } from "@/utils";
import { User } from "./User";
import { Page } from "./pages/Page";
import { Archive } from "./Archive";
import { Property } from "./properties/Property";

@AllArgsConstructor
export class Project {
    id!: number;
    name?: string;
    description?: string;
    picture?: Archive;
    deadline?: Date;
    visualizedAt!: Date;
    owner!: User;
    pages!: Page[];
    properties!: Property[];

    constructor(id: number, name: string, description: string, picture: Archive, deadline: Date, visualizedAt: Date, owner: User, pages: [], properties: []) {}

    equals = (obj: any) => {
        return obj instanceof Project && obj.id === this.id;
    }
}